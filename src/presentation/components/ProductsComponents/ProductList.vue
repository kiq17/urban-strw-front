<script lang="ts" setup>
import { ProductModel } from "@/domain/models";
import { LoadProducts, LoadProductsWithFilter, Order } from "@/domain/usecases";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { filterStore } from "@/main/store/filter";
import { queryStore } from "@/main/store/query";
import Paginate from "@/presentation/components/Paginate.vue";
import Card from "@/presentation/components/shared/Card.vue";
import CardSkeleton from "@/presentation/components/shared/skeletons/CardSkeleton.vue";
import { FunnelIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

interface Props {
  nomeP: string;
  storage: LocalStorageAdapter;
  loadProducts: LoadProducts;
  loadingP: boolean;
  productsP: ProductModel[];
  findedP: number;
  countP: number;
  searchProducts: LoadProductsWithFilter;
  pageP: number;
}

let {
  searchProducts,
  loadingP,
  nomeP,
  productsP,
  countP,
  pageP,
  storage,
} = defineProps<Props>();
const ITENS_PER_PAGE = 9;

const emit = defineEmits<{
  (e: "menuChange", state: string);
  (
    e: "pageChange",
    products: ProductModel[],
    finded: number,
    loading: boolean,
    count: number,
    page: number
  );
  (
    e: "orderChange",
    products: ProductModel[],
    finded: number,
    loading: boolean,
    count: number,
    page: number
  );
}>();

const loading = ref<boolean>(false);
const error = ref<string>("");
const isOpen = ref<boolean>(false);
const orderSelected = ref<string>("Mais relevantes");
const pageR = ref<number>(1);
const orderR = ref<Order>("relevante");

async function handlePage(page: number) {
  loading.value = true;
  // check if the filter is setted

  // number of page plus itens per page minus total itens ( count)
  // numeber of ocunt bigger than itens per page means that have more than one page
  //
  pageR.value = page;
  try {
    emit("pageChange", [], 0, true, 1, 1);
    const { products, finded, count } = await searchProducts.collect({
      page,
      per_page: ITENS_PER_PAGE,
      order: orderR.value,
    });

    let value;

    if (!storage.get("finded")) {
      storage.set("finded", { finded: ITENS_PER_PAGE * 2 });
      value = storage.get("finded");
    } else {
      value = storage.get("finded");
      const plus = +value.finded + ITENS_PER_PAGE;
      const check = Math.floor(count / plus);
      console.log(check, "ch");
      if (check > 0) {
        console.log(value.finded, "enrtr");
        const sobra = check % ITENS_PER_PAGE;
        value.finded =
          sobra > ITENS_PER_PAGE
            ? +value.finded + ITENS_PER_PAGE
            : +value.finded + sobra;
      }
      console.log(value.finded);
      storage.set("finded", { finded: value.finded });
      value = storage.get("finded");
    }
    console.log(value.finded);
    emit("pageChange", products, value.finded, false, count, page);
  } catch (error) {
    console.log("e", error);
  }
}

function handleMenu() {
  emit("menuChange", "open");
}

async function handleOrder(option: Order) {
  // chamar order
  orderR.value = option;
  const { query } = queryStore();
  console.log("QUERY", query);
  emit("orderChange", [], 0, true, 0, 1);
  try {
    const { products, finded, count } = await searchProducts.collect({
      order: option,
      category: query?.category,
      per_page: ITENS_PER_PAGE,
      page: 1,
      price: query?.price
    });
    emit("orderChange", products, finded, false, count, 1);
  } catch (error) {
    console.log(error);
    emit("orderChange", [], 0, false, 0, 1);
  }

  switch (option) {
    case "relevante":
      orderSelected.value = "Mais relevantes";
      break;
    case "maior":
      orderSelected.value = "Maior Preço";
      break;
    case "menor":
      orderSelected.value = "Menor Preço";
      break;
    case "recente":
      orderSelected.value = "Mais recentes";
      break;
    default:
      break;
  }
  const { saveOrder } = filterStore();
  saveOrder(orderR.value);
  isOpen.value = false;
}

function handleOpenMenu() {
  isOpen.value = !isOpen.value;
  orderSelected.value = "Selecionar ordem";
}
</script>

<template>
  <div class="flex flex-col flex-wrap">
    <div>
      <div
        v-if="loadingP"
        class="w-1/2 h-9 rounded-md animate-pulse bg-zinc-300"
      ></div>
      <h3 v-else class="text-3xl font-bold uppercase max-lg:text-left">
        {{ nomeP?.length > 0 ? `Busca por ${nomeP}` : "Produtos exclusivos" }}
      </h3>
      <button
        class="max-lg:flex justify-center gap-5 px-5 py-3 items-center border-2 border-yellow-300 w-full mt-10 uppercase font-semibold hidden"
        @click="handleMenu"
      >
        Filtros <FunnelIcon class="w-5 h-5" />
      </button>
      <div
        v-if="loadingP"
        class="mt-5 w-full h-10 rounded-md animate-pulse bg-zinc-300 mb-5"
      ></div>
      <div
        v-else
        class="flex justify-between items-center mt-5 max-lg:mt-1 flex-wrap"
      >
        <p
          v-if="productsP.length == 0"
          class="text-sm text-zinc-400 max-lg:order-2 max-lg:mt-2"
        >
          Sem exibição
        </p>
        <p v-else class="text-sm text-zinc-400 max-lg:order-2 max-lg:mt-2">
          Exibindo: {{ findedP }} de {{ countP }} resultados
        </p>
        <div class="flex gap-2 items-center">
          <p class="text-sm text-zinc-400">Ordenado por</p>
          <div class="flex items-center relative">
            <span
              class="flex gap-2 items-center cursor-pointer hover:text-yellow-500 transition-colors duration-300 relative p-2 group-data-[state='open']:pointer-events-none"
              @click="handleOpenMenu"
            >
              {{ orderSelected
              }}<i
                class="fa-solid fa-chevron-down transition-transform duration-300"
                :class="isOpen ? 'rotate-180' : 'rotate-0'"
              ></i>
            </span>
            <ul
              class="absolute border-2 bg-white border-zinc-300 w-full rounded-md"
              :style="{ top: 'calc(100% + .50em)' }"
              :class="isOpen ? 'visible' : 'invisible'"
            >
              <li
                class="cursor-pointer text-center p-2 hover:bg-zinc-100 transition-colors duration-300"
                @click="handleOrder('relevante')"
              >
                Mais relevantes
              </li>
              <li
                class="cursor-pointer text-center p-2 hover:bg-zinc-100 transition-colors duration-300"
                @click="handleOrder('recente')"
              >
                Mais recentes
              </li>
              <li
                class="cursor-pointer text-center p-2 hover:bg-zinc-100 transition-colors duration-300"
                @click="handleOrder('maior')"
              >
                Maior preço
              </li>
              <li
                class="cursor-pointer text-center p-2 hover:bg-zinc-100 transition-colors duration-300"
                @click="handleOrder('menor')"
              >
                Menor preço
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-10 flex-wrap">
      <CardSkeleton v-if="loadingP" v-for="i in ITENS_PER_PAGE" />
      <Card
        v-else
        v-for="product in productsP"
        :key="product.id"
        :storage="storage"
        :img="product.coverImg"
        :title="
          product.nome.length > 12
            ? `${product.nome.slice(0, 12)}...`
            : product.nome
        "
        :price="product.preco"
        :alt="'Imagem teste'"
        :id="product.id.toString()"
        :slug="product.slug!"
      />
      <div
        class="text-3xl text-center font-bold min-h-screen m-auto mt-16"
        v-if="countP == 0"
      >
        Oops... Nenhum resultado econtrado
        <p class="text-base font-normal text-zinc-400">
          Não se preocupe, tente novamente mais tarde <br />
          Ou pesquise por um item diferente
        </p>
      </div>
    </div>
    <div
      :data-state="loadingP"
      v-if="productsP.length > 0"
      class="mt-24 max-sm:mt-8 self-end flex gap-5 items-center group max-lg:m-auto"
    >
      <Paginate
        :total-itens="countP"
        :itens-per-page="ITENS_PER_PAGE"
        @page-change="handlePage"
        :pageNumber="pageP"
      />
    </div>
  </div>
</template>
