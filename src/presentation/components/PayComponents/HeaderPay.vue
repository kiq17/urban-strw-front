<script setup lang="ts">
import { Istep } from "../../pages/Payment.vue";
import { defineProps } from "vue";

interface propsType {
    data: Istep
}

const props = defineProps<propsType>();

</script>


<template>
    <div class="flex w-full">
        <span class="step flex flex-col items-center flex-grow w-full h-16 relative"
            v-for="(item, index) in props.data.steps" :key="index">
            <div class="w-10 h-10 rounded-full transition duration-300 flex items-center justify-center"
                :class="[(index == props.data.currentStep || index < props.data.currentStep) ? 'bg-yellow-300 text-black' : 'bg-zinc-500 text-white']">
                {{ props.data.currentStep <= index ? index + 1 : '' }}
                <i class="fa-solid fa-check" v-if="props.data.currentStep > index"></i>
            </div>
            <div class="step-line w-full h-1 bg-zinc-500 top-5 left-1/2 -translate-y-1/2 absolute -z-10">
                <div class="h-1 bg-yellow-300 transition-all duration-300"
                    :class="(index <= props.data.currentStep) ? (index == props.data.currentStep) ? 'w-1/2' : 'w-full' : 'w-0'">
                </div>
            </div>
            <p class="font-bold">{{ item }}</p>
        </span>
    </div>
</template>

<style scoped>
.step:last-child .step-line {
    display: none;
}
</style>