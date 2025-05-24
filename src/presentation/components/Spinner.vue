<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
interface Props  {
  st: string
}

defineProps<Props>();
</script>

<template>
  <div class="loader">
    <div :class="twMerge('relative m-auto w-20 h-6', st)">
      <svg class="loading-spinner__circle-svg" viewBox="25 25 50 50">
        <circle
          class="loading-spinner__circle-stroke"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>
