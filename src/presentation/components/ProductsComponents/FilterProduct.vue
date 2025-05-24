<script lang="ts" setup>
import { ProductModel } from "@/domain/models";
import { LoadProductsWithFilter } from "@/domain/usecases";
import { filterStore } from "@/main/store/filter";
import { orderStore } from "@/main/store/order";
import { queryStore } from "@/main/store/query";
import FilterBrand from "@/presentation/components/ProductsComponents/FilterBrand.vue";
import Input from "@/presentation/components/shared/Input.vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { log } from "console";
import { onMounted, ref, watch } from "vue";

interface Props {
  searchProducts: LoadProductsWithFilter;
}

interface Filter {
  value: string;
  active?: boolean;
  type?: "category" | "brand" | "order" | "name" | "price";
}

const { searchProducts } = defineProps<Props>();

type ArrayItens = Array<{ interesse: string; active: boolean }>;
type ArrayPrices = Array<{ price: string; active: boolean }>;

const itens = ref<ArrayItens>([
  {
    interesse: "Camisa",
    active: false,
  },
  {
    interesse: "Boné",
    active: false,
  },
  {
    interesse: "Tênis",
    active: false,
  },
  {
    interesse: "Mochila",
    active: false,
  },
  {
    interesse: "Calça",
    active: false,
  },
  {
    interesse: "Jaqueta",
    active: false,
  },
]);

const prices = ref<ArrayPrices>([
  {
    price: "Até R$500",
    active: false,
  },
  {
    price: "R$500 - R$1500",
    active: false,
  },
  {
    price: "R$1500 - R$2000",
    active: false,
  },
  {
    price: "R$2000 - R$3000",
    active: false,
  },
  {
    price: "Acima de R$ 3000",
    active: false,
  },
]);

const emit = defineEmits<{
  (e: "menuChange", state: string): void;
  (e: "fitlerChange", nome: string): void;
  (
    e: "productsChange",
    products: ProductModel[],
    finded: number,
    loading: boolean,
    count: number
  );
}>();

const menu = ref<string>("close");
const filters = ref<Filter[]>([]);
const nome = ref<string>("");
const debounce = ref<any>();
const queryR = ref<string[]>([""]);

async function handleAllClear() {
  itens.value = itens.value.map((item) => ({
    interesse: item.interesse,
    active: false,
  }));

  prices.value = prices.value.map((item) => ({
    price: item.price,
    active: false,
  }));
  filters.value = [];

  try {
      emit("productsChange", [], 0, true, 0);
      const { products, finded, count } = await searchProducts.collect({
        page: 1,
        per_page: 9,
        order: "relevante",
      });
      emit("productsChange", products, finded, false, count);
    } catch (error) {
      emit("productsChange", [], 0, false, 0);
    }
}

function search(value: string) {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    nome.value = value.replace(/ /g, "");
  }, 1000);
}

watch(nome, async () => {
  try {
    emit("productsChange", [], 0, true, 0);
    const { products, finded, count } = await searchProducts.collect({
      name: nome.value,
    });
    emit("productsChange", products, finded, false, count);
  } catch (error) {
    emit("productsChange", [], 0, false, 0);
  }

  if (nome.value.length == 0) {
    try {
      emit("productsChange", [], 0, true, 0);
      const { products, finded, count } = await searchProducts.collect({
        page: 1,
        per_page: 9,
        order: "relevante",
      });
      emit("productsChange", products, finded, false, count);
    } catch (error) {
      emit("productsChange", [], 0, false, 0);
    }
  }
});

async function refreshFilter() {
  let category: string[] = [];
  let price: string[] = [];

  for (let i of filters.value) {
    delete i.active;
    delete i.type;
    for (let [key, value] of Object.entries(i)) {
      if (value.toString().includes("R$")) {
        const semMoeda = value.toString().replace(/R\$\s*/g, "");

        if (value.toString().includes("A")) {
          const semMoeda = value
            .toString()
            .replace(/R\$\s*/g, "")
            .replace(/[^0-9]/g, "");
          price.push(semMoeda);
        } else {
          const partes = semMoeda.split(" - ");

          price = partes.map((parte) => parte.replace(/\./g, ""));
        }
      } else {
        category.push(value as string);
      }
    }
  }

  const { filter } = filterStore();

  try {
    emit("productsChange", [], 0, true, 0);
    const { products, finded, count } = await searchProducts.collect({
      category: category.join(),
      name: nome.value || undefined,
      order: filter.order || undefined,
      price: price.join(),
    });
    emit("productsChange", products, finded, false, count);
  } catch (error) {
    emit("productsChange", [], 0, false, 0);
  }
  const { saveQuery } = queryStore();
  saveQuery({
    category: category.join() || undefined,
    name: nome.value || undefined,
    order: filter.order || undefined,
    price: price.join() || undefined
  });
}

async function handleFilter(value: string) {
  filters.value = [...filters.value.filter((it) => it.value != value)];
  const finded = itens.value.find((it) => it.interesse === value);
  if (finded) {
    finded.active ? (finded.active = false) : (finded.active = true);
  }
  let query: string[] = [];
  for (let i of filters.value) {
    delete i.active;
    delete i.type;
    for (let [key, value] of Object.entries(i)) {
      query.push(value as string);
    }
  }

  const { saveQuery } = queryStore();
  saveQuery({
    
  });

  if (query.length == 0) {
    try {
      emit("productsChange", [], 0, true, 0);
      const { products, finded, count } = await searchProducts.collect({
        page: 1,
        per_page: 9,
        order: "relevante",
      });
      emit("productsChange", products, finded, false, count);
    } catch (error) {
      emit("productsChange", [], 0, false, 0);
    }
  } else {
    try {
      emit("productsChange", [], 0, true, 0);
      const { products, finded, count } = await searchProducts.collect({
        category: query.join(),
      });
      emit("productsChange", products, finded, false, count);
    } catch (error) {
      emit("productsChange", [], 0, false, 0);
    }
  }
}

async function handleCategory(item: string) {
  const finded = itens.value.find((it) => it.interesse === item);
  const findedO = filters.value.find((it) => it.value === item);
  if (finded) {
    finded.active ? (finded.active = false) : (finded.active = true);

    if (findedO) {
      filters.value = filters.value.filter((it) => it.value != findedO.value);
      return;
    }

    filters.value = [
      ...filters.value,
      { active: finded.active, type: "category", value: item },
    ];
  }

  await refreshFilter();
  /* let query: string[] = [];
  for (let i of filters.value) {
    delete i.active;
    delete i.type;
    for (let [key, value] of Object.entries(i)) {
      query.push(value as string);
    }
  }

  try {
    emit("productsChange", [], 0, true, 0);
    const { products, finded, count } = await searchProducts.collect({
      category: query.join(),
    });
    emit("productsChange", products, finded, false, count);
  } catch (error) {
    emit("productsChange", [], 0, false, 0);
  } */
}

async function handlePrice(item: string) {
  const finded = prices.value.find((it) => it.price === item);

  if (finded) {
    finded.active = finded.active = true;

    filters.value = filters.value.filter((it) => it.type != "price");

    filters.value.push({
      value: finded.price,
      active: finded.active,
      type: "price",
    });
  }

  await refreshFilter();
}

function handleBrandChange(value: string) {
  const finded = filters.value.find((it) => it.value === value);

  if (finded) return;

  filters.value = [...filters.value, { active: true, type: "brand", value }];
}

function handleMenu() {
  emit("menuChange", "close");
}

// chamando pela primeira vez a lista dos produtos

onMounted(async () => {
  try {
    emit("productsChange", [], 0, true, 0);
    const { products, finded, count } = await searchProducts.collect({
      page: 1,
      per_page: 9,
      order: "relevante",
    });
    emit("productsChange", products, finded, false, count);
  } catch (error) {
    emit("productsChange", [], 0, false, 0);
  }
});
</script>

<template>
  <!-- Responsive filter -->

  <div
    class="h-full fixed max-lg:max-w-[380px] hidden group-data-[state='open']:block top-0 overflow-y-auto z-30"
  >
    <div class="bg-black z-50 p-3 flex-col gap-5">
      <button
        class="mb-10 mt-20 px-5 py-3 cursor-pointer text-white border-red-500 w-full border-2"
        @click="handleMenu"
      >
        Fechar
      </button>
      <div class="flex justify-between text-white" v-if="filters.length > 0">
        <h3 class="text-xl font-bold px-2">Filtros</h3>

        <button class="text-sm text-zinc-500" @click="handleAllClear">
          Limpar filtros
        </button>
      </div>

      <div class="text-white" v-if="filters.length > 0">
        <TransitionGroup v-if="filters.length > 0" name="list" tag="ul">
          <li
            v-for="item in filters"
            :v-if="item.active"
            :key="item.value"
            class="flex justify-between px-2 mb-2"
          >
            {{ item.value }}
            <XMarkIcon
              @click="handleFilter(item.value)"
              class="w-6 h-6 hover:text-zinc-400 hover:cursor-pointer transition-colors"
            />
          </li>
        </TransitionGroup>
      </div>
      <div class="bg-black text-white rounded-md p-5">
        <Input
          :value="nome"
          :label="'Nome do produto'"
          :handleChange="search"
        />
      </div>
      <div class="flex flex-col gap-3 bg-black text-white rounded-md py-5 px-3">
        <h3 class="text-xl font-bold px-2">Categoria</h3>
        <div
          class="flex items-center hover:bg-zinc-100 rounded-md transition-colors hover:text-black"
          v-for="item in itens"
        >
          <label
            class="relative flex items-center p-3 rounded-full cursor-pointer"
            :for="item.interesse"
          >
            <input
              type="checkbox"
              :checked="item.active"
              @click="handleCategory(item.interesse)"
              class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-blue-gray-200 transition-all checked:border-yellow-700 checked:bg-yellow-500 checked:before:bg-yellow-700 border-2 border-zinc-300"
              :id="item.interesse"
            />
            <span
              class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            class="font-normal py-3 w-full h-full cursor-pointer select-none"
            :for="item.interesse"
          >
            {{ item.interesse }}
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-3 bg-black text-white rounded-md py-5 px-3">
        <h3 class="text-xl font-bold px-2">Preço</h3>
        <div
          class="flex items-center hover:bg-zinc-100 rounded-md transition-colors hover:text-black"
          v-for="item in prices"
        >
          <label
            class="relative flex items-center p-3 rounded-full cursor-pointer"
            :for="item.price"
          >
            <input
              type="radio"
              name="price"
              :checked="item.active"
              @click="handlePrice(item.price)"
              class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-blue-gray-200 transition-all checked:border-yellow-700 checked:bg-yellow-500 checked:before:bg-yellow-700 border-2 border-zinc-300"
              :id="item.price"
            />
            <span
              class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            class="font-normal py-3 w-full h-full cursor-pointer select-none"
            :for="item.price"
          >
            {{ item.price }}
          </label>
        </div>
      </div>
      <!-- <FilterBrand @brand-change="handleBrandChange" bg="black" /> -->
    </div>
  </div>

  <!-- Main filter -->

  <div class="bg-zinc-100 p-3 rounded-md flex-col gap-5 max-lg:hidden">
    <div class="flex justify-between my-5" v-if="filters.length > 0">
      <h3 class="text-xl font-bold px-2">Filtros</h3>
      <button class="text-sm text-zinc-500" @click="handleAllClear">
        Limpar filtros
      </button>
    </div>
    <div class="mb-5" v-if="filters.length > 0">
      <TransitionGroup v-if="filters.length > 0" name="list" tag="ul">
        <li
          v-for="item in filters"
          :v-if="item.active"
          :key="item.value"
          class="flex justify-between px-2 mb-4"
        >
          {{ item.value }}
          <XMarkIcon
            @click="handleFilter(item.value)"
            class="w-6 h-6 hover:text-zinc-400 hover:cursor-pointer transition-colors"
          />
        </li>
      </TransitionGroup>
    </div>
    <div class="bg-white rounded-md p-5">
      <Input :value="nome" :label="'Nome do produto'" :handleChange="search" />
    </div>
    <div class="flex flex-col gap-3 bg-white rounded-md py-5 px-3">
      <h3 class="text-xl font-bold px-2">Categoria</h3>
      <div
        class="flex items-center hover:bg-zinc-100 rounded-md transition-colors"
        v-for="item in itens"
      >
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer"
          :for="item.interesse"
        >
          <input
            type="checkbox"
            :checked="item.active"
            @click="handleCategory(item.interesse)"
            class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 border-2 border-zinc-300"
            :id="item.interesse"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          class="font-normal py-3 w-full h-full cursor-pointer select-none"
          :for="item.interesse"
        >
          {{ item.interesse }}
        </label>
      </div>
    </div>
    <div class="flex flex-col gap-3 bg-white rounded-md py-5 px-3">
      <h3 class="text-xl font-bold px-2">Preço</h3>
      <div
        class="flex items-center hover:bg-zinc-100 rounded-md transition-colors"
        v-for="item in prices"
      >
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer"
          :for="item.price"
        >
          <input
            type="radio"
            name="price"
            :checked="item.active"
            class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 border-2 border-zinc-300"
            :id="item.price"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          class="font-normal py-3 w-full h-full cursor-pointer select-none"
          :for="item.price"
        >
          {{ item.price }}
        </label>
      </div>
    </div>
    <!-- <FilterBrand @brand-change="handleBrandChange" bg="white" /> -->
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
