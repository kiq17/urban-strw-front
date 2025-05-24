<script setup lang="ts">
import { ref, watch } from "vue";

const imgHtml = ref<HTMLImageElement>();
const loading = ref<boolean>(true);

watch(imgHtml, () => {
  if (imgHtml.value) {
    if (imgHtml.value.complete) {
      loading.value = false;
    } else {
      imgHtml.value.addEventListener("load", () => (loading.value = false));
    }
  }
});
</script>

<template>
  <div
    class="max-w-[1200px] mt-12 max-sm:hidden max-base:max-w-[768px] m-auto bg-[url('../assets/compressed/homeCompress.jpg')] h-[800px] max-base:h-[550px] bg-cover bg-center group transition-all duration-400 max-lg:hidden"
    :class="loading ? 'load' : ''"
  >
    <img
      src="../assets/homePage.jpg"
      class="w-full h-full object-center object-cover group-[.load]:invisible"
      alt="Arte da home page envolvendo diversas fotos recortadas junto com a logo da empresa"
      loading="lazy"
      ref="imgHtml"
    />
  </div>
  <img
    src="../assets/productline.png"
    alt=""
    class="hidden max-lg:flex max-lg:flex-wrap gap-2 mt-32 max-lg:max-w-[360px] m-auto"
  />
  <div
    class="hidden max-lg:flex max-lg:flex-wrap gap-2 mt-10 max-lg:max-w-[360px] m-auto"
  >
    <div class="w-44">
      <div class="img w-full">
        <img
          class="w-full h-full object-cover"
          src="../assets/Pin.png"
          alt="Tênis Nike"
          loading="lazy"
        />
      </div>

      <div class="w-full flex items-center border-b-2 border-b-black gap-3">
        <p class="font-extrabold text-sm">Jacket, The...</p>
        <p class="text-sm">R$ 850</p>
        <button title="Adicionar ao carrinho" class="text-lg ml-auto">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <img
      src="../assets/graffitia.png"
      alt=""
      class="hidden max-lg:flex max-lg:flex-wrap gap-2 -mb-64 ml-32 absolute -z-50 max-lg:max-w-[360px] m-auto"
    />
    <div class="w-44 mt-28 mb-5">
      <div class="img w-full">
        <img
          class="w-full h-full object-cover"
          src="../assets/VintageLacoste.png"
          alt="Lacoste Jacket Vintage"
          loading="lazy"
        />
      </div>

      <div class="w-full flex items-center border-b-2 border-b-black gap-2">
        <p class="font-extrabold text-sm">Jacket, Lac...</p>
        <p class="text-sm">R$ 500</p>
        <button title="Adicionar ao carrinho" class="text-lg ml-auto">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    <div class="w-44 -mt-16 mb-5">
      <div class="img w-full">
        <img
          class="w-full h-full object-cover"
          src="../assets/balaclava.png"
          alt="Balaclava Stussy"
          loading="lazy"
        />
      </div>

      <div class="w-full flex items-center border-b-2 border-b-black gap-3">
        <p class="font-extrabold text-sm">Stüssy Bal...</p>
        <p class="text-sm">R$ 100</p>
        <button title="Adicionar ao carrinho" class="text-lg ml-auto">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>
