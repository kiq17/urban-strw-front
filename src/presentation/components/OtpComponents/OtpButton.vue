<script setup lang="ts">
import { CheckCode, Email } from "@/domain/usecases";
import { onMounted, ref, Teleport, watch } from "vue";
import { useRouter } from "vue-router";
import Toast from "../Toast.vue";

const seconds = ref<number>(300);
const clicks = ref<number>(0);
const error = ref<boolean>(false);
const msg = ref<string>("");

interface Props {
  checkCode: CheckCode;
  value: string;
  emailService: Email;
}

const router = useRouter();

const props = defineProps<Props>();

onMounted(() => {
  let interval = setInterval(() => {
    seconds.value--;
    if (seconds.value === 0) {
      clearInterval(interval);
      seconds.value = 0;
    }
  }, 1000);

  watch(clicks, () => {
    clearInterval(interval);
    interval = setInterval(() => {
      seconds.value--;
      if (seconds.value === 0) {
        clearInterval(interval);
        seconds.value = 0;
      }
    }, 1000);
  });
});

async function handleResend() {
  if (seconds.value > 0) return;

  seconds.value = 0;

  clicks.value++;

  switch (clicks.value) {
    case 1:
      seconds.value = 10 * 60;
      break;
    case 2:
      seconds.value = 30 * 60;
      break;
    default:
      seconds.value = 2 * 60 * 60;
      break;
  }

  // send code again
  // const otp = await props.emailService.send({
  //   id: result.id,
  // });
}

async function sendOtp() {
  try {
    error.value = false;
    const IsValid = await props.checkCode.check(props.value);

    if (IsValid) {
      router.push("/");
    }
  } catch (err) {
    error.value = true;
    msg.value = (err as Error).message;
  }
}
</script>

<template>
  <div class="flex flex-col items-center w-full gap-4">
    <button
      class="bg-yellow-300 font-bold p-3 hover:bg-yellow-400 transition-colors duration-300"
      type="button"
      @click="sendOtp"
    >
      Checar código
    </button>
    <button
      type="button"
      class="disabled:cursor-not-allowed"
      @click="handleResend"
      :class="seconds == 0 ? 'text-blue-600 hover:underline' : ''"
      :disabled="seconds > 0"
    >
      {{
        seconds > 0
          ? `Reenviar código. Espere ${new Date(seconds * 1000)
              .toISOString()
              .slice(14, 19)}`
          : "Reenviar código."
      }}
    </button>
  </div>
  <Teleport to="body">
    <Toast
      v-if="error"
      :title="msg"
      text="Devido esse condição a verificação não concluída."
    />
  </Teleport>
</template>
