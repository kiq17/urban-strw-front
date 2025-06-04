<script lang="ts" setup>
import {
ChevronDoubleLeftIcon,
ChevronDoubleRightIcon,
ChevronLeftIcon,
ChevronRightIcon,
} from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";

interface Props {
  itensPerPage: number;
  totalItens: number;
  pageNumber: number;
}

const { itensPerPage, totalItens, pageNumber } = defineProps<Props>();
const page = ref<number>(1);
const numbers = ref<number[]>([]);

const emit = defineEmits<{ (e: "pageChange", page: number) }>();

function goTo(e: Event) {
  const element = e.target as HTMLButtonElement;
  if (!element) return;

  page.value = +element.textContent!;
  emit("pageChange", page.value);
}

function goToPrev() {
  const check = page.value == 1;

  if (check) return;

  page.value--;
  emit("pageChange", page.value);
}

function gotToNext() {
  let total = Math.ceil(totalItens / itensPerPage);
  const check = page.value == total;

  if (check) return;

  page.value++;
  emit("pageChange", page.value);
}

function goToFirst() {
  if (page.value == 1) return;
  page.value = 1;
  emit("pageChange", page.value);
}

function goToLast() {
  let total = Math.ceil(totalItens / itensPerPage);
  if (page.value == total) return;
  page.value = total;
  emit("pageChange", page.value);
}

watch(
  page,
  () => {
    let total = Math.ceil(totalItens / itensPerPage);

    if (total < 6) {
      let arr: number[] = [];
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
      numbers.value = arr;
      return;
    }

    let maxLeft = page.value - Math.floor(5 / 2);
    let maxRight = page.value + Math.floor(5 / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = 5;
    }
    if (maxRight > total) {
      maxLeft = total - (5 - 1);
      maxRight = total;
    }

    let arr: number[] = [];
    for (let i = maxLeft; i <= maxRight; i++) {
      arr.push(i);
    }

    numbers.value = arr;
  },
  { immediate: true }
);
</script>

<template>
  <ChevronDoubleLeftIcon
    @click="goToFirst"
    class="group-data-[state='true']:cursor-not-allowed w-6 h-6 max-sm:w-4 max-sm:h-4"
    :class="pageNumber == 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
  />
  <ChevronLeftIcon
    @click="goToPrev"
    class="group-data-[state='true']:cursor-not-allowed w-6 h-6 max-sm:w-4 max-sm:h-4"
    :class="pageNumber == 1 ? 'cursor-not-allowed' : 'cursor-pointer'"
  />
  <div class="flex gap-4 group-data-[state='true']:cursor-not-allowed">
    <button
      @click="goTo($event)"
      type="button"
      v-for="i in numbers"
      :class="
        pageNumber == i
          ? 'text-lg px-3 py-1 text-black font-bold'
          : 'text-lg px-3 py-1 text-zinc-400'
      "
    >
      {{ i }}
    </button>
  </div>
  <ChevronRightIcon
    @click="gotToNext"
    class="group-data-[state='true']:cursor-not-allowed w-6 h-6 max-sm:w-4 max-sm:h-4"
    :class="
      pageNumber == Math.ceil(totalItens / itensPerPage)
        ? 'cursor-not-allowed'
        : 'cursor-pointer'
    "
  />
  <ChevronDoubleRightIcon
    @click="goToLast"
    class="group-data-[state='true']:cursor-not-allowed w-6 h-6 max-sm:w-4 max-sm:h-4"
    :class="
      pageNumber == Math.ceil(totalItens / itensPerPage)
        ? 'cursor-not-allowed'
        : 'cursor-pointer'
    "
  />
</template>
