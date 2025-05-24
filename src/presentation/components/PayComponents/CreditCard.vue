<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Input from "@/presentation/components/shared/Input.vue";
import { orderStore } from "@/main/store/order";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { CreditCardValidator } from "@/presentation/validator/creditCard.validator";
import { useMotions } from "@vueuse/motion";

interface Props {
  validator: CreditCardValidator;
}

const props = defineProps<Props>();
const motions = useMotions();

const numero = ref<string>("**** **** ***** ****");
const cvv = ref<string>("");
const mes = ref<string>("");
const ano = ref<string>("");
const nome = ref<string>("");
const flip = ref<boolean>(false);
const errors = ref<Record<string, string>>({});

const { order, saveData } = orderStore();
const emit = defineEmits<{ (e: "nextStep", currentStep: number) }>();

onMounted(() => {
  const {
    cvv: cvvSaved,
    mes: monthSaved,
    nome: nameSaved,
    numeroCard: numberSaved,
    ano: yearSaved,
  } = order;

  if (cvvSaved && monthSaved && nameSaved && numberSaved && yearSaved) {
    cvv.value = cvvSaved;
    mes.value = monthSaved;
    ano.value = yearSaved;
    numero.value = numberSaved;
    nome.value = nameSaved;
  }
});

function validateCardNumber(cardNumber) {
  cardNumber = cardNumber.replace(/[ -]/g, "");

  let match =
    /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(
      cardNumber
    );
  if (match) {
    let types = [
      "Visa",
      "MasterCard",
      "Discover",
      "American Express",
      "Diners Club",
      "JCB",
    ];
    for (let i = 1; i < match.length; i++) {
      if (match[i]) {
        console.log("cartao", types[i - 1]);
        return types[i - 1];
      }
    }
  } else {
    return false;
  }
}

watch(numero, (newValue, oldValue) => {
  if (newValue.length > 19) {
    numero.value = oldValue;
  }
});

watch(mes, (newValue, oldValue) => {
  if (newValue.length > 2) {
    mes.value = oldValue;
  }
});

watch(ano, (newValue, oldValue) => {
  if (newValue.length > 2) {
    ano.value = oldValue;
  }
});

// watch(cvv, (newValue, oldValue) => {
//   flip.value = true
//   if (newValue.length > 3) {
//     cvv.value = oldValue

//   }

//   if (newValue.length == 0 || newValue.length == 3) {
//     setTimeout(()=>{
//       flip.value = false
//     }, 300)
//   }
// })

const validateNextStep = (): boolean => {
  const checkNextStep = props.validator.pruchase({
    cvv: cvv.value,
    month: mes.value,
    name: nome.value,
    number: numero.value,
    year: ano.value,
  });
  if (checkNextStep) {
    errors.value = checkNextStep;
    return true;
  }

  return false;
};

function purchase() {
  console.log(order);
  if (validateNextStep()) return;
  console.log("order");
  saveData({
    ...order,
    cvv: cvv.value,
    mes: mes.value,
    nome: nome.value,
    numeroCard: numero.value,
    ano: ano.value,
  });
  console.log(order);
}

function prevStep() {
  emit("nextStep", 1);
}
</script>

<template>
  <form
    @submit.prevent=""
    class="p-5 gap-5 col-span-2 flex flex-wrap items-center w-full"
  >
    <div class="flex w-2/5 self-start gap-5 flex-wrap">
      <fieldset class="w-full">
        <Input
          :value="nome"
          :label="'Nome no cartão'"
          :handleChange="
            (value) => {
              const checkNome = validator.name(value);
              if (checkNome) {
                errors = { ...errors, nome: checkNome };
              } else {
                nome = value;
                errors = { ...errors, nome: '' };
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
            v-if="errors.nome"
          >
            {{ errors.nome }}
          </p>
        </Transition>
      </fieldset>
      <fieldset class="w-full">
        <Input
          :value="numero"
          :label="'Número'"
          :mask="'cartao'"
          :handleChange="
            (value) => {
              const checkNumero = validator.number(value);
              if (checkNumero) {
                errors = { ...errors, numero: checkNumero };
              } else {
                numero = value;
                errors = { ...errors, numero: '' };
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
            v-if="errors.numero"
          >
            {{ errors.numero }}
          </p>
        </Transition>
      </fieldset>
      <fieldset class="w-full">
        <Input
          :value="cvv"
          :label="'CVC / CVV'"
          :handleChange="
            (value) => {
              const checkCvv = validator.cvv(value);
              if (checkCvv) {
                errors = { ...errors, cvv: checkCvv };
              } else {
                cvv = value;
                errors = { ...errors, cvv: '' };
              }
            }
          "
        /><Transition :css="false" @leave="(_, done) => motions.p3.leave(done)">
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
            v-if="errors.cvv"
          >
            {{ errors.cvv }}
          </p>
        </Transition>
      </fieldset>
      <fieldset class="w-[44%]">
        <Input
          :value="mes"
          :label="'Mês'"
          :handleChange="
            (value) => {
              const checkMes = validator.month(value);
              if (checkMes) {
                errors = { ...errors, mes: checkMes };
              } else {
                mes = value;
                errors = { ...errors, mes: '' };
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
            v-if="errors.mes"
          >
            {{ errors.mes }}
          </p>
        </Transition>
      </fieldset>
      <fieldset class="w-[49%]">
        <Input
          :value="ano"
          :label="'Ano'"
          :handleChange="
            (value) => {
              const checkAno = validator.year(value);
              if (checkAno) {
                errors = { ...errors, ano: checkAno };
              } else {
                ano = value;
                errors = { ...errors, ano: '' };
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
            v-if="errors.ano"
          >
            {{ errors.ano }}
          </p>
        </Transition>
      </fieldset>
    </div>
    <div
      class="w-[400px] h-[250px] self-start rounded-md text-white relative card transition-transform duration-700"
      :style="flip ? { transform: 'rotateY(180deg)' } : 'rotate(0deg)'"
    >
      <div
        :class="
          clsx('w-full h-full rounded-md text-white absolute card-front', {
            'bg-gradient-to-r from-black to-zinc-800':
              validateCardNumber(numero) === false,
            'bg-gradient-to-r from-blue-600 to-blue-300':
              validateCardNumber(numero) === 'Visa',
            'bg-gradient-to-r from-red-600 to-red-300':
              validateCardNumber(numero) === 'MasterCard',
            'bg-gradient-to-r from-gray-500 to-gray-300':
              validateCardNumber(numero) === 'American Express',
          })
        "
      >
        <p class="absolute bottom-20 left-10 text-2xl tracking-widest">
          {{ numero }}
        </p>
        <p class="absolute bottom-10 left-10">
          {{ mes.length > 0 || ano.length > 0 ? mes + "/" + ano : "" }}
        </p>
        <p class="absolute bottom-5 left-10">{{ nome }}</p>
        <figure class="w-20 h-14 top-2 right-10 absolute rounded-md">
          <img
            src="../../assets/mastercard.png"
            alt="Bandeira do cartão"
            v-if="validateCardNumber(numero) === 'MasterCard'"
          />
          <img
            src="../../assets/visa.png"
            alt="Bandeira do cartão"
            v-if="validateCardNumber(numero) === 'Visa'"
          />
          <img
            src="../../assets/visa.png"
            alt="Bandeira do cartão"
            v-if="validateCardNumber(numero) === 'Discover'"
          />
          <img
            src="../../assets/amex.png"
            alt="Bandeira do cartão"
            v-if="validateCardNumber(numero) === 'American Express'"
          />
        </figure>
        <figure class="w-14 h-10 bottom-32 left-10 absolute rounded-md">
          <img src="../../assets/chip.png" alt="Chip cartão" />
        </figure>
      </div>
      <div
        :class="
          clsx(
            'card-back w-full h-full rounded-md text-white absolute flex items-center',
            {
              'bg-gradient-to-r from-zinc-700 to-zinc-500':
                validateCardNumber(numero) === false,
              'bg-gradient-to-r from-blue-700 to-blue-500':
                validateCardNumber(numero) === 'Visa',
              'bg-gradient-to-r from-red-700 to-red-500':
                validateCardNumber(numero) === 'MasterCard',
              'bg-gradient-to-r from-gray-700 to-gray-500':
                validateCardNumber(numero) === 'American Express',
            }
          )
        "
      >
        <span
          class="w-full h-10 bg-black flex items-center px-10 relative before:absolute before:border-2 before:w-14 before:h-14 before:rounded-full before:left-6 before:border-red-600"
        >
          {{ cvv ? cvv : "***" }}
        </span>
      </div>
    </div>
    <fieldset class="flex justify-between w-full items-center flex-row-reverse">
      <button
        class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
        @click="purchase"
      >
        Finalizar
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

<style scoped>
.card-back {
  transform: rotateY(180deg);
}

.card-back,
.card-front {
  backface-visibility: hidden;
}

.card {
  transform-style: preserve-3d;
}
</style>
