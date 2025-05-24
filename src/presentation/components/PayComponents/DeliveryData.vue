<script setup lang="ts">
import Input from "@/shared/Input.vue";
import { onMounted, ref, watch } from "vue";
import cepPromise from "cep-promise";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { useMotions } from "@vueuse/motion";
import {
  FormsValidation,
  FiledsValidation,
} from "@/data/protocols/validation/";
import { orderStore } from "@/main/store/order";

interface Props {
  validationField: FiledsValidation;
  validationForm: FormsValidation;
}

const motions = useMotions();
const { saveData, order } = orderStore();

const props = defineProps<Props>();

const emit = defineEmits<{ (e: "nextStep", currentStep: number) }>();

const street = ref<string>("");
const city = ref<string>("");
const state = ref<string>("");
const neighborhood = ref<string>("");
const houseNumber = ref<string>("");
const houseType = ref<string>("");
const cep = ref<string>("");
const errors = ref<Record<string, string>>({});

onMounted(() => {
  const {
    cep: cepSaved,
    cidade: citySaved,
    numero: houseNumberSaved,
    complemento: houseTypeSaved,
    bairro: neighborhoodSaved,
    estado: stateSaved,
    endereco: streetSaved,
  } = order;

  if (
    cepSaved &&
    citySaved &&
    houseNumberSaved &&
    houseTypeSaved &&
    neighborhoodSaved &&
    stateSaved &&
    streetSaved
  ) {
    (cep.value = cepSaved),
      (city.value = citySaved),
      (houseNumber.value = houseNumberSaved.toString()),
      (houseType.value = houseTypeSaved),
      (neighborhood.value = neighborhoodSaved),
      (state.value = stateSaved),
      (street.value = streetSaved);
  }
});

const validateNextStep = (): boolean => {
  const checkNextStep = props.validationForm.deliveryData({
    cep: cep.value,
    city: city.value,
    houseNumber: +houseNumber.value,
    houseType: houseType.value,
    neighborhood: neighborhood.value,
    state: state.value,
    street: street.value,
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

  saveData({
    ...order,
    cep: cep.value,
    cidade: city.value,
    numero: +houseNumber.value,
    complemento: houseType.value,
    bairro: neighborhood.value,
    estado: state.value,
    endereco: street.value,
  });

  emit("nextStep", 2);
};

function prevStep() {
  emit("nextStep", 0);
}

const findDeliveryInfo = async () => {
  try {
    const result = await cepPromise(cep.value.replace("-", ""));
    errors.value = { ...errors.value, cep: "" };
    cep.value = result.cep;
    city.value = result.city;
    neighborhood.value = result.neighborhood;
    state.value = result.state;
    street.value = result.street;
  } catch (error) {
    errors.value = { ...errors.value, cep: "Cep não encontrado" };
  }
};

watch(cep, () => {
  if (cep.value.length == 9) {
    findDeliveryInfo();
  }
});
</script>

<template>
  <form
    @submit.prevent=""
    class="p-5 gap-5 flex flex-wrap items-center col-span-2"
  >
    <fieldset class="w-full">
      <Input
        :value="street"
        :label="'Endereço'"
        :handleChange="
          (value) => {
            street = value;
            const checkStreet = validationField.street(street);
            if (checkStreet) {
              errors = { ...errors, street: checkStreet };
            } else {
              errors = { ...errors, street: '' };
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
          v-if="errors.street"
        >
          {{ errors.street }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="cep"
        :label="'CEP'"
        :mask="'cep'"
        :handleChange="
          (value) => {
            cep = value;
            const checkCep = validationField.cep(cep);
            if (checkCep) {
              errors = { ...errors, cep: checkCep };
            } else {
              errors = { ...errors, cep: '' };
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
          v-if="errors.cep"
        >
          {{ errors.cep }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="city"
        :label="'Cidade'"
        :handleChange="
          (value) => {
            city = value;
            const checkCity = validationField.city(city);
            if (checkCity) {
              errors = { ...errors, city: checkCity };
            } else {
              errors = { ...errors, city: '' };
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
          v-if="errors.city"
        >
          {{ errors.city }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="neighborhood"
        :label="'Bairro'"
        :handleChange="
          (value) => {
            neighborhood = value;
            const checkNeighborhood =
              validationField.neighborhood(neighborhood);
            if (checkNeighborhood) {
              errors = { ...errors, neighborhood: checkNeighborhood };
            } else {
              errors = { ...errors, neighborhood: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p4.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p4'"
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
          v-if="errors.neighborhood"
        >
          {{ errors.neighborhood }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="state"
        :label="'Estado'"
        :handleChange="
          (value) => {
            state = value;
            const checkState = validationField.state(state);
            if (checkState) {
              errors = { ...errors, state: checkState };
            } else {
              errors = { ...errors, state: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p5.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p5'"
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
          v-if="errors.state"
        >
          {{ errors.state }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="houseNumber"
        :label="'Numero'"
        :handleChange="
          (value) => {
            houseNumber = value;
            const checkhouseNumber = validationField.houseNumber(+houseNumber);
            if (checkhouseNumber) {
              errors = { ...errors, houseNumber: checkhouseNumber };
            } else {
              errors = { ...errors, houseNumber: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p6.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p6'"
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
          v-if="errors.houseNumber"
        >
          {{ errors.houseNumber }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="w-[31.5%]">
      <Input
        :value="houseType"
        :label="'Complemento'"
        :handleChange="
          (value) => {
            houseType = value;
            const checkHouseType = validationField.houseType(houseType);
            if (checkHouseType) {
              errors = { ...errors, houseType: checkHouseType };
            } else {
              errors = { ...errors, houseType: '' };
            }
          }
        "
      />
      <Transition :css="false" @leave="(_, done) => motions.p7.leave(done)">
        <p
          class="mt-1 ml-2 text-sm text-red-400"
          v-motion="'p7'"
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
          v-if="errors.houseType"
        >
          {{ errors.houseType }}
        </p>
      </Transition>
    </fieldset>
    <fieldset class="flex justify-between w-full items-center flex-row-reverse">
      <button
        class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
        @click="checkStep"
      >
        Próximo
        <span>
          <ChevronRightIcon class="w-6 h-6" />
        </span>
      </button>
      <button
        class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
        @click="prevStep"
      >
        <span>
          <ChevronLeftIcon class="w-6 h-6" />
        </span>
        Anterior
      </button>
    </fieldset>
  </form>
</template>
