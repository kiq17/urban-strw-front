<script setup lang="ts">
import Header from "@/presentation/components/Header.vue";
import Footer from "@/presentation/components/Footer.vue";
import HeaderPay from "@/presentation/components/PayComponents/HeaderPay.vue";
import Input from "@/presentation/components/shared/Input.vue";
import CreditCard from "@/presentation/components/PayComponents/CreditCard.vue";
import { onMounted, ref, watch } from "vue";
import cepPromise from "cep-promise";
import { ProductModel } from "@/domain/models/product.model";
import { makeCreditCardValidator } from "@/main/factories/validation/creditCardValidation.factory";
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";

export interface Istep {
  steps: string[];
  currentStep: number;
}

const nome = ref<string>("");
const email = ref<string>("");
const cpf = ref<string>("");
const endereco = ref<string>("");
const cidade = ref<string>("");
const estado = ref<string>("");
const bairro = ref<string>("");
const numero = ref<string>("");
const complemento = ref<string>("");
const cep = ref<string>("");
const l = ref<number>(0);
const erros = ref<Record<string, string> | null>();
const step = ref<Istep>({
  steps: ["Dados pessoais", "Local de entrega", "Pagamento"],
  currentStep: 0,
});
const product =
  ref<
    Omit<
      ProductModel,
      | "descricao"
      | "quantidade"
      | "categoria"
      | "a_venda"
      | "created_at"
      | "update_at"
      | "slug"
    >
  >();

onMounted(() => {
  // const { purchase } = purchaseStore();
  // product.value = purchase;
});

const nextStep = () => {
  // let result: Record<string, string> | void;
  // switch (step.value.currentStep) {
  //   case 0:
  //     result = validateSchema<ISelf>(selfData, {
  //       cpf: cpf.value,
  //       nome: nome.value,
  //       email: email.value,
  //     });
  //     break;
  //   case 1:
  //     result = validateSchema<IDelivery>(deliveryPlace, {
  //       endereco: endereco.value,
  //       cep: cep.value,
  //       cidade: cidade.value,
  //       estado: estado.value,
  //       bairro: bairro.value,
  //       numero: numero.value,
  //       complemento: complemento.value,
  //     });
  //     break;
  //   default:
  //     break;
  // }
  // if (typeof result == "object" && result) {
  //   erros.value = result;
  //   return;
  // }
  // if (step.value.currentStep < step.value.steps.length) {
  //   erros.value = null;
  //   step.value.currentStep++;
  // }
};

const prevStep = () => {
  if (step.value.currentStep > 0) {
    step.value.currentStep--;
  }
};

let interval: any = "";

const incre = () => {
  l.value += 1;
};

const conclude = () => {
  interval = setInterval(incre, 50);
};

watch(l, (o, n) => {
  console.log(n);
  if (n == 100) {
    clearInterval(interval);
  }
});

const findDeliveryInfo = async () => {
  try {
    const result = await cepPromise(cep.value.replace("-", ""));
    erros.value = null;
    cep.value = result.cep;
    cidade.value = result.city;
    bairro.value = result.neighborhood;
    estado.value = result.state;
    endereco.value = result.street;
  } catch (error) {
    erros.value = { ...erros.value, cep: "Cep não encontrado" };
  }
};

watch(cep, () => {
  if (cep.value.length == 9) {
    findDeliveryInfo();
  }
});

const stepProgress = ref();

const stepOne = () => {
  // const { saveData } = orderStore();
  // switch (step.value.currentStep) {
  //   case 0:
  //     saveData([
  //       { nome: nome.value },
  //       { email: email.value },
  //       { cpf: cpf.value },
  //     ]);
  //     break;
  //   case 1:
  //     saveData([
  //       { endereco: endereco.value },
  //       { cep: cep.value },
  //       { cidade: cidade.value },
  //       { estado: estado.value },
  //       { complemento: complemento.value },
  //       { numero: numero.value },
  //     ]);
  //     break;
  //   default:
  //     break;
  // }
  // nextStep();
};
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <section class="w-full m-auto px-20 py-5">
    <div class="border-2 border-zinc-500 rounded-md">
      <div class="p-5 w-full">
        <HeaderPay :data="step" ref="stepProgress" />
        <p class="text-center mt-4 mb-7">
          Seus dados pessoais somente serão utilizados para completar o processo
          de pagamento estipulado pelo Banco Central.
        </p>
      </div>
      <div class="grid grid-cols-3">
        <form
          @submit.prevent=""
          class="p-5 space-y-5"
          v-if="step.currentStep == 0"
        >
          <fieldset>
            <Input
              :value="nome"
              :label="'Nome completo'"
              :mask="'name'"
              :handleChange="(value) => (nome = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.nome">
              {{ erros?.nome }}
            </p>
          </fieldset>
          <fieldset>
            <Input
              :value="email"
              :label="'Email'"
              :handleChange="(value) => (email = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.email">
              {{ erros?.email }}
            </p>
          </fieldset>
          <fieldset>
            <Input
              :value="cpf"
              :mask="'cpf'"
              :label="'CPF'"
              :handleChange="(value) => (cpf = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.cpf">
              {{ erros?.cpf }}
            </p>
          </fieldset>
          <button
            class="mt-10 ml-auto flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
            @click="stepOne"
          >
            Próximo
            <span>
              <i class="fa-solid fa-chevron-right"></i>
            </span>
          </button>
        </form>
        <form
          @submit.prevent=""
          class="p-5 gap-5 flex flex-wrap items-center col-span-2"
          v-if="step.currentStep == 1"
        >
          <fieldset class="w-full">
            <Input
              :value="endereco"
              :label="'Endereço'"
              :handleChange="(value) => (endereco = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.endereco">
              {{ erros?.endereco }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="cep"
              :label="'CEP'"
              :mask="'cep'"
              :handleChange="(value) => (cep = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.cep">
              {{ erros?.cep }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="cidade"
              :label="'Cidade'"
              :handleChange="(value) => (cidade = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.cidade">
              {{ erros?.cidade }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="bairro"
              :label="'Bairro'"
              :handleChange="(value) => (bairro = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.bairro">
              {{ erros?.bairro }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="estado"
              :label="'Estado'"
              :handleChange="(value) => (estado = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.estado">
              {{ erros?.estado }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="numero"
              :label="'Numero'"
              :handleChange="(value) => (numero = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.numero">
              {{ erros?.numero }}
            </p>
          </fieldset>
          <fieldset class="w-[31.5%]">
            <Input
              :value="complemento"
              :label="'Complemento'"
              :handleChange="(value) => (complemento = value)"
            />
            <p class="mt-1 ml-2 text-sm text-red-400" v-if="erros?.complemento">
              {{ erros?.complemento }}
            </p>
          </fieldset>
          <fieldset
            class="flex justify-between w-full items-center flex-row-reverse"
          >
            <button
              class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
              @click="stepOne"
            >
              Próximo
              <span>
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            </button>
            <button
              class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
              @click="prevStep"
            >
              Anterior
              <span>
                <i class="fa-solid fa-chevron-left"></i>
              </span>
            </button>
          </fieldset>
        </form>
        <form
          @submit.prevent=""
          class="p-5 gap-5 col-span-2 flex flex-wrap items-center w-full"
          v-if="step.currentStep == 2"
        >
          <CreditCard :validator="makeCreditCardValidator()" />
          <fieldset
            class="flex justify-between w-full items-center flex-row-reverse"
          >
            <button
              class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300 relative before:absolute before:-z-10 before:left-0 before:bg-yellow-300 before:top-0 before:h-full before:transition-all before:duration-700"
              @click="conclude"
            >
              {{ l > 0 ? "Aguarde" : "Finalizar" }}
              <span
                class="transition-all duration-700 absolute -z-10 left-0 bg-yellow-300 top-0 h-full"
                :style="{ width: `${l + '%'}` }"
              ></span>
            </button>
            <button
              class="flex items-center gap-5 py-3 px-8 uppercase font-bold text-lg border-2 border-yellow-300"
              @click="prevStep"
            >
              Anterior
              <span>
                <i class="fa-solid fa-chevron-left"></i>
              </span>
            </button>
          </fieldset>
        </form>
        <div class="col-end-4 px-5 py-2">
          <h3 class="text-center text-2xl font-bold mb-5">Pedido</h3>
          <p class="flex justify-between">
            {{ product?.nome }}
            <span>{{
              product?.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRl",
              })
            }}</span>
          </p>
          <p
            class="relative flex justify-between font-bold text-lg before:absolute before:h-[2px] before:w-full before:bg-zinc-300 before:rounded-full before:-top-2 mt-5"
          >
            Total: <span>R$30</span>
          </p>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>
