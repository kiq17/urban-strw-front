<script setup lang="ts">
import { AxiosError } from "axios";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { getImagesPorduct } from "../../services/api";

interface imgProps {
  img: string;
  active: boolean;
}

const { params } = useRoute();

const array = ref<imgProps[]>();
const error = ref<string>();
const loading = ref<boolean>(true);

const selected = ref<imgProps>();

onBeforeMount(async () => {
  const res = await getImagesPorduct(params.slug.toString());
  if (res instanceof AxiosError) {
    error.value = "Erro ao carregar produtos";
    loading.value = false;
  }
  array.value = res.map((img) => ({ img: img.image_url, active: false }));
  if (!array.value) return;
  selected.value = array.value[0];
  loading.value = false;
});

function handleClick(item: imgProps) {
  if (!array.value) return;

  selected.value = { ...item, active: true };
  array.value = array.value.map((value) => {
    if (value.img == selected.value?.img) {
      return { ...value, active: true };
    } else if (value.active) {
      return { ...value, active: false };
    } else {
      return value;
    }
  });
}
</script>

<template>
  <div
    v-if="loading"
    class="w-[50%] max-base:order-2 max-base:w-full h-[650px] rounded-md bg-zinc-300 animate-pulse"
  ></div>
  <div
    v-else
    class="w-[50%] flex gap-5 max-base:order-2 max-base:w-full max-base:justify-between h-[650px] py-4"
  >
    <div class="">
      <img
        class="h-full object-contain w-full"
        :src="selected ? selected.img : ''"
      />
    </div>
    <div class="w-28 flex flex-col justify-between">
      <img
        :src="item.img"
        class="h-24 cursor-pointer object-cover hover:opacity-100 transition-opacity duration-300"
        v-for="item in array"
        @click="handleClick(item)"
        :class="
          item.active ? 'border-2 border-yellow-300 opacity-100' : 'opacity-70'
        "
      />
    </div>
  </div>
</template>
