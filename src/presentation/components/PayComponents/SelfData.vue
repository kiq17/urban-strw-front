<script setup lang="ts">
import { FiledsValidation } from "@/data/protocols/validation/fieldsValidation";
import { FormsValidation } from "@/data/protocols/validation/formsValidation";
import Input from "@/shared/Input.vue";
import { orderStore } from "@/main/store/order";
import { useMotions } from "@vueuse/motion";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import { Transition, onMounted, ref } from "vue";

const motions = useMotions();

interface Props {
  validationField: FiledsValidation;
  validationForm: FormsValidation;
}

const props = defineProps<Props>();

const emit = defineEmits<{ (e: "nextStep", currentStep: number) }>();

const fullName = ref<string>("");
const email = ref<string>("");
const cpf = ref<string>("");
const errors = ref<Record<string, string>>({});
const { saveData, order } = orderStore();

onMounted(() => {
  const { fullName: fullNameSaved, cpf: cpfSaved, email: emailSaved } = order;

  if (fullNameSaved && cpfSaved && emailSaved) {
    fullName.value = fullNameSaved;
    email.value = emailSaved;
    cpf.value = cpfSaved;
  }
});

const validateNextStep = (): boolean => {
  const checkNextStep = props.validationForm.selfData({
    fullName: fullName.value,
    cpf: cpf.value,
    email: email.value,
  });
  if (checkNextStep) {
    errors.value = checkNextStep;
    return true;
  }

  return false;
};

const checkStep = () => {
  if (validateNextStep()) {
    return;
  }

  saveData({ fullName: fullName.value, email: email.value, cpf: cpf.value });

  emit("nextStep", 1);
};
</script>

<template>
  <form @submit.prevent="" class="p-5 space-y-5">
    <fieldset>
      <Input
        :value="fullName"
        :label="'Nome completo'"
        :mask="'name'"
        :handleChange="
          (value) => {
            fullName = value;
            const checkfullName = validationField.fullName(fullName);
            if (checkfullName) {
              errors = { ...errors, fullName: checkfullName };
            } else {
              errors = { ...errors, fullName: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p1.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p1'"
          :initial="{
            y: 50,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
          }"
          :leave="{
            opacity: 0,
          }"
          v-if="errors.fullName"
        >
          {{ errors.fullName }}
        </p>
      </Transition>
    </fieldset>
    <fieldset>
      <Input
        :value="email"
        :label="'Email'"
        :handleChange="
          (value) => {
            email = value;
            const checkEmail = validationField.email(email);
            if (checkEmail) {
              errors = { ...errors, email: checkEmail };
            } else {
              errors = { ...errors, email: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p2.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p2'"
          :initial="{
            y: 50,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
          }"
          :leave="{
            opacity: 0,
          }"
          v-if="errors?.email"
        >
          {{ errors?.email }}
        </p>
      </Transition>
    </fieldset>
    <fieldset>
      <Input
        :value="cpf"
        :mask="'cpf'"
        :label="'CPF'"
        :handleChange="
          (value) => {
            cpf = value;
            const checkCpf = validationField.cpf(cpf);
            if (checkCpf) {
              errors = { ...errors, cpf: checkCpf };
            } else {
              errors = { ...errors, cpf: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p3.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p3'"
          :initial="{
            y: 50,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
          }"
          :leave="{
            opacity: 0,
          }"
          v-if="errors?.cpf"
        >
          {{ errors?.cpf }}
        </p>
      </Transition>
    </fieldset>
    <button
      class="mt-10 ml-auto flex items-center gap-5 py-3 px-9 uppercase font-bold text-lg border-2 border-yellow-300"
      @click="checkStep"
    >
      Próximo
      <span>
        <ChevronRightIcon class="w-6 h-6" />
      </span>
    </button>
  </form>
</template>
