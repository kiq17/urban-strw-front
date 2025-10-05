<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/solid";
import { useMotions } from "@vueuse/motion";
import { ref, Transition } from "vue";

interface Props {
  title: string;
  text: string;
}

const props = defineProps<Props>();

const motions = useMotions();

const isOpen = ref<boolean>(true);
</script>

<template>
  <Transition @leave="(_, done) => motions.toast.leave(done)">
    <div
      v-motion="'toast'"
      class="flex justify-between bg-gradient-to-b from-red-300 to-white absolute top-20 right-10 z-50 h-max border-2 border-white rounded-lg p-5"
      :initial="{
        x: 100,
        opacity: 0,
      }"
      :enter="{
        x: 0,
        opacity: 1,
      }"
      :leave="{
        opacity: 0,
      }"
      v-if="isOpen"
    >
      <div class="flex justify-between gap-5">
        <ExclamationTriangleIcon
          class="w-10 h-10 text-red-500 bg-white p-2 rounded-full shadow-md"
        />
        <div class="flex flex-col w-72">
          <h3 class="text-lg font-bold">{{ props.title }}</h3>
          <p class="">{{ props.text }}</p>
        </div>
      </div>
      <XMarkIcon
        class="w-6 h-6 cursor-pointer text-zinc-500 rounded-full"
        @click="() => (isOpen = !isOpen)"
      />
    </div>
  </Transition>
</template>

