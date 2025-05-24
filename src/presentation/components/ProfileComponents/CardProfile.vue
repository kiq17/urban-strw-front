<script lang="ts" setup>
import { toggleFavorites } from "@/services/api";
import { Product } from "@/services/interfaces/product/product";

interface Props {
  product: Product;
  action: string;
  date: Date;
}

const { product, action, date } = defineProps<Props>();

async function handleClick() {
  if (action.toLowerCase().includes("favoritado")) {
    await toggleFavorites(product.id);
  }
}
</script>

<template>
  <div class="flex gap-10 my-20">
    <figure class="w-[20rem] h-[20rem]">
      <img
        class="w-full h-full object-cover"
        :src="product.coverImg"
        :alt="`Imagem referente ao prodruto ${product.nome}`"
      />
    </figure>
    <div class="flex flex-col justify-between flex-grow">
      <div class="flex">
        <div>
          <p class="text-2xl font-bold">{{ product.nome }}</p>
          <p class="text-lg">
            {{
              product.preco.toLocaleString("pr-BR", {
                currency: "BRL",
                style: "currency",
              })
            }}
          </p>
        </div>
        <p class="ml-auto text-zinc-400">
          {{ action }}: {{ new Date(date).toLocaleDateString() }}
        </p>
      </div>
      <div class="flex gap-3">
        <RouterLink
          class="bg-yellow-300 font-bold p-3 hover:bg-yellow-400 transition-colors duration-300"
          :to="`produtos/${product.slug}`"
        >
          Ver produto
        </RouterLink>
        <!-- <button
          class="bg-yellow-300 font-bold p-3 hover:bg-yellow-400 transition-colors duration-300"
        >
          Ver produto
        </button> -->
        <button
          @click="handleClick"
          class="border-2 border-red-500 text-black p-3 duration-300"
        >
          Remover
        </button>
      </div>
    </div>
  </div>
</template>
