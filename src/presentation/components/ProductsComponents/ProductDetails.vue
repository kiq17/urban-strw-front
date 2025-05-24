<script lang="ts" setup>
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { useModal } from "@/main/composables/useModal";
import { purchaseStore } from "@/main/store/purchase";
import {
  getDetailsProduct,
  getProductById,
  toggleFavorites,
} from "@/services/api";
import { ProductModel } from "@/domain/models";
import { AxiosError } from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { HeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";

const sizes = ["P", "M", "G", "GG"];
const sizest = ["40", "41", "42", "43"]

interface Details {
  modelo: string;
  composicao: string;
  info: string;
  fabricacao: string;
}

const { params } = useRoute();

interface Props {
  storage: LocalStorageAdapter;
}

const props = defineProps<Props>();
const selected = ref<string>();
const error = ref<string>();
const details = ref<Details>();
const router = useRouter();
const product = ref<ProductModel>();
const loading = ref<boolean>(true);
const clicked = ref<boolean>(false);

function handleClick(size) {
  selected.value = size;
}

function handleModal() {
  const { openModal } = useModal();
  const data = props.storage.get("user");

  if (data) return;

  openModal();

  return true;
}

function handlePurchase() {
  if (handleModal()) return;
  const { savePurchase } = purchaseStore();
  if (product.value && selected.value) {
    savePurchase(product.value, selected.value);
    router.push("/pagamento");
  }
}

function handleCart() {
  if (handleModal()) return;
}

async function handleToggle() {
  try {
    if (handleModal()) return;
    if (product.value) await toggleFavorites(product.value.id);
    clicked.value = !clicked.value;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  const res = await getProductById(params.slug);
  const resd = await getDetailsProduct(res.id);
  if (res instanceof AxiosError) {
    error.value = "Erro ao carregar produto";
  }
  product.value = res;
  details.value = resd;
  loading.value = false;
});
</script>

<template>
  <div class="py-4 flex-1 flex-col gap-10 flex max-base:order-1">
    <div class="flex justify-between">
      <div
        v-if="loading"
        class="w-60 h-20 bg-zinc-300 animate-pulse rounded-md"
      ></div>
      <div v-else class="flex flex-col">
        <h3 class="font-bold text-3xl">{{ product?.nome }}</h3>
        <p>{{ product?.descricao }}</p>
        <p v-if="product?.favorites == 0">
          Seja o <span class="font-bold">primeiro</span> a favoritar este
          produto
        </p>
        <p v-else>Favoritado por <span class="font-bold">350</span> usuários</p>
      </div>
      <div
        v-if="loading"
        class="p-5 bg-zinc-300 animate-pulse rounded-md"
      ></div>
      <HeartIcon
        v-else
        @click="handleToggle"
        class="h-10 w-10 cursor-pointer hover:text-red-500"
        :class="clicked == false ? 'block' : 'hidden'"
      />
      <HeartIconSolid
        @click="handleToggle"
        class="h-10 w-10 cursor-pointer text-red-500"
        :class="clicked == true ? 'block' : 'hidden'"
      />
    </div>
    <div
      v-if="loading"
      class="h-36 w-80 bg-zinc-300 animate-pulse rounded-md"
    ></div>
    <div v-else>
      <p class="font-bold">Detalhes</p>
      <ul class="flex flex-col gap-1 mt-2">
        <li class="flex gap-3">
          <span>
            <i class="fa-solid fa-person text-zinc-400 text-center w-4"></i>
          </span>
          {{ details?.modelo }}
        </li>
        <li class="flex gap-3">
          <span>
            <i
              class="fa-solid fa-shirt text-xs text-center w-4 text-zinc-400"
            ></i>
          </span>
          {{ details?.composicao }}
        </li>
        <li class="flex gap-3">
          <span>
            <i
              class="fa-solid fa-exclamation text-base text-center w-4 text-zinc-400"
            ></i>
          </span>
          {{ details?.info }}
        </li>
        <li class="flex gap-3">
          <span
            ><i
              class="fa-solid fa-gears text-xs text-center w-4 text-zinc-400"
            ></i>
          </span>
          {{ details?.fabricacao }}
        </li>
      </ul>
    </div>
    <div
      v-if="loading"
      class="h-20 w-full bg-zinc-300 animate-pulse rounded-md"
    ></div>
    <div v-else class="flex flex-col gap-4">
      <p class="font-bold">Selecione o tamanho:</p>
      <div class="flex">
        <span
          v-for="size in sizes"
          v-if="product?.categoria !== 'Tênis'"
          class="w-11 h-11 bg-zinc-100 flex items-center justify-center mr-2 cursor-pointer hover:bg-zinc-200 transition-colors duration-300"
          @click="handleClick(size)"
          :class="selected == size ? 'border-2 border-zinc-400' : ''"
          >{{ size }}
        </span>
        <span
          v-for="size in sizest"
          v-else
          class="w-11 h-11 bg-zinc-100 flex items-center justify-center mr-2 cursor-pointer hover:bg-zinc-200 transition-colors duration-300"
          @click="handleClick(size)"
          :class="selected == size ? 'border-2 border-zinc-400' : ''"
          >{{ size }}
        </span>
      </div>
    </div>
    <div
      v-if="loading"
      class="h-9 w-full bg-zinc-300 animate-pulse rounded-md"
    ></div>
    <div v-else>
      <p class="font-bold text-3xl">
        {{
          product?.preco.toLocaleString("pr-BR", {
            currency: "BRL",
            style: "currency",
          })
        }}
      </p>
    </div>
    <div
      v-if="loading"
      class="w-full h-12 rounded-md bg-zinc-300 animate-pulse"
    ></div>
    <div v-else class="flex gap-5">
      <button
        v-if="!product?.a_venda"
        class="bg-red-500 w-full text-white p-3 transition-colors duration-300 cursor-not-allowed"
      >
        Produto indisponível
      </button>
      <template v-else>
        <button
          @click="handlePurchase"
          class="flex-grow bg-yellow-300 font-bold p-3 hover:bg-yellow-400 transition-colors duration-300"
        >
          Comprar
        </button>
        <button
          class="bg-zinc-100 text-black p-3 hover:bg-zinc-200 transition-colors duration-300"
          @click="handleCart"
        >
          Adicionar ao carrinho
        </button>
      </template>
    </div>
  </div>
</template>
