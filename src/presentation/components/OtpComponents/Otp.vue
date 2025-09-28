<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";
import OtpInput from "./OtpInput.vue";
import { ref } from "vue";
import OtpButton from "./OtpButton.vue";
import {
  makeRemoteCheckCode,
  makeRemoteEmail,
} from "@/main/factories/usecases";

const otp = ref<string>("");

function onChange(value: string) {
  otp.value = value;
}
</script>

<template>
  <section>
    <div
      class="flex items-center w-full p-4 rounded-lg mt-16 border-2 border-red-500"
    >
      <ExclamationCircleIcon class="w-6 h-6 text-red-500" />
      <p class="ml-2 self-start">
        <span class="text-lg font-bold text-red-500 mr-2"> Atenção </span
        >Verifique seu E-mail. Esta página é temporária caso você saia dela por
        algum motivo realize novamente o seu login que outra página será gerada.
      </p>
    </div>
    <div class="flex justify-center items-center h-80 m-auto gap-4">
      <OtpInput :value="otp" :valueLen="6" @change="onChange" />
    </div>
    <OtpButton
      :checkCode="makeRemoteCheckCode()"
      :email-service="makeRemoteEmail()"
      :value="otp"
    />
  </section>
</template>

<style scoped>
section {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
