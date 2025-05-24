<script setup lang="ts">
import Input from "@/presentation/components/shared/Input.vue";
import { ref, watch } from "vue";

const teste = ref<string>("");
const brands = ref<string[]>([
  "Stussy",
  "Lacoste",
  "Heron Preston",
  "Supreme",
  "Nike",
  "Bape",
  "Chrome Hearts",
  "Off-White",
]);

interface Props {
  bg: "black" | "white";
}

const { bg } = defineProps<Props>();


const filteredArr = ref<string[]>(brands.value);

const emit = defineEmits<{ (e: "brandChange", brand: string) }>();

watch(teste, () => {
  console.log(teste.value);
  filteredArr.value = brands.value.filter(
    (brand) =>
      brand.toLowerCase().includes(teste.value.toLowerCase()) ||
      brand.toLowerCase() === teste?.value
  );
});

function handleClick(brand: string) {
  teste.value = brand;
  emit("brandChange", brand);
}


</script>

<template>
  <div class="flex flex-col gap-3  rounded-md py-5 px-3" :class="bg == 'white' ? 'bg-white text-black' : 'bg-black text-white'">
    <h3 class="text-xl font-bold px-2">Marca</h3>
    <Input
      :value="teste"
      :label="'Nome da marca'"
      :handleChange="(value) => (teste = value)"
    />
  </div>
  <ul
    class="flex flex-col rounded-md -mt-3 px-4 py-2 overflow-y-auto h-40"
    :class="bg == 'white' ? 'bg-white text-black' : 'bg-black text-white'"
  >
    <li
      class="hover:bg-zinc-100 cursor-pointer p-3 rounded-md"
      v-for="(brand, i) in filteredArr"
      :key="i"
      @click="handleClick(brand)"
    >
      {{ brand }}
    </li>
    <li v-if="filteredArr.length == 0">Marca "{{ teste }}" não encontrada</li>
  </ul>
</template>
