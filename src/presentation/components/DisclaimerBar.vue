<script lang="ts" setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref<boolean>(true);

function handleClick() {
  localStorage.setItem("doc", new Date().getDate().toString());
  isOpen.value = false;
}

watch(
  isOpen,
  () => {
    const alreadyClick = localStorage.getItem("doc");

    if (alreadyClick) {
      const passedDays = +alreadyClick - new Date().getDate();
      if (Math.abs(passedDays) > 7) {
        isOpen.value = true;
      } else {
        isOpen.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="isOpen"
    className="flex items-center justify-between w-full gap-4 fixed bottom-0 bg-zinc-300 py-5 px-20 max-sm:flex-col"
  >
    <p class="text-lg max-sm:text-center">
      Para uma melhor experiência durante o acesso ao site consulte a
      documentação
    </p>
    <div className="flex items-center gap-4">
      <RouterLink
        class="font-bold bg-yellow-300 hover:bg-yellow-400 transition-colors duration-300 py-4 px-4"
        to="https://github.com/kiq17/urban-strw-front"
        >Acessar</RouterLink
      >
      <button
        className="py-3 px-4 font-bold border-2 border-zinc-500 bg-transparent"
        type="button"
        @click="handleClick"
      >
        Fechar
      </button>
    </div>
  </div>
</template>
