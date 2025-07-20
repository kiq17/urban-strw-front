<script setup lang="ts">
import { Email } from "@/domain/usecases";
import { SignUp } from "@/domain/usecases/signUp.case";
import Input from "@/presentation/components/shared/Input.vue";
import InputPass from "@/presentation/components/shared/InputPass.vue";
import { SignUpValidator } from "@/presentation/validator/signUp.validator";
import { useMotions } from "@vueuse/motion";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Spinner from "./Spinner.vue";

interface Props {
  singUp: SignUp;
  emailService: Email;
  validator: SignUpValidator;
}

const props = defineProps<Props>();
const motions = useMotions();

const nome = ref<string>("");
const email = ref<string>("");
const senha = ref<string>("");

const imgHtml = ref<HTMLImageElement>();
const loading = ref<boolean>(false);
const errors = ref<Record<string, string>>({});
const loadImg = ref<boolean>(true);
const router = useRouter();

watch(imgHtml, () => {
  if (imgHtml.value) {
    if (imgHtml.value.complete) {
      loadImg.value = false;
    } else {
      imgHtml.value.addEventListener("load", () => (loadImg.value = false));
    }
  }
});

const itens = ref<Array<{ interesse: string; active: boolean }>>([
  {
    interesse: "Camiseta",
    active: false,
  },
  {
    interesse: "Boné",
    active: false,
  },
  {
    interesse: "Tênis",
    active: false,
  },
  {
    interesse: "Mochila",
    active: false,
  },
  {
    interesse: "Calça",
    active: false,
  },
  {
    interesse: "Jaqueta",
    active: false,
  },
]);

const validateSignUp = (): boolean => {
  const checkSignUp = props.validator.signUp({
    email: email.value,
    senha: senha.value,
    nome: nome.value,
    preferences: itens.value
      .filter((item) => item.active)
      .map((i) => i.interesse),
  });
  if (checkSignUp) {
    errors.value = checkSignUp;
    return true;
  }

  return false;
};

async function handleSubmit(e: Event) {
  e.preventDefault();
  loading.value = true;

  if (validateSignUp()) {
    loading.value = false;
    return;
  }

  try {
   const result = await props.singUp.create({
      email: email.value,
      senha: senha.value,
      nome: nome.value,
      preferences: itens.value
        .filter((item) => item.active)
        .map((i) => i.interesse),
    });
    const otp = await props.emailService.send({
      id: result.id
    })
    loading.value = false;
    router.push(`verificar/${otp.tempLink}`);
  } catch (er) {
    loading.value = false;
    errors.value = { server: er as string };
  }
}
</script>

<template>
  <section class="flex h-1/2 mt-14 max-lg:justify-center">
    <figure
      class="w-1/2 h-[900px] max-lg:hidden bg-[url('../assets/compressed/signCompress.jpg')] bg-cover bg-center group transition-all duration-400"
      :class="loadImg ? 'load' : ''"
    >
      <img
        class="h-full w-full object-cover object-center group-[.load]:invisible"
        src="../assets/sign.jpg"
        alt="Arte com pessoas em modelo de colagem"
        ref="imgHtml"
        loading="lazy"
      />
    </figure>
    <div class="p-5 mt-10 h-max overflow-hidden max-lg:w-[360px] max-lg:px-0">
      <div class="mb-5">
        <h3 class="text-3xl font-extrabold">Criar conta</h3>
        <p class="text-zinc-400">
          Preencha seus dados abaixo. Antes de clicar em Criar se certifque das
          informações.
        </p>
      </div>
      <form class="flex flex-col gap-5 h-max">
        <Input
          :value="nome"
          :label="'Nome'"
          :handleChange="
            (value) => {
              nome = value;
              const checkNome = validator.nome(nome);
              if (checkNome) {
                errors = { ...errors, nome: checkNome, server: '' };
              } else {
                errors = { ...errors, nome: '', server: '' };
              }
            }
          "
        />
        <Transition :css="false" @leave="(_, done) => motions.p1.leave(done)">
          <p
            class="-mt-3 ml-2 text-sm text-red-400"
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
        <Input
          :value="email"
          :label="'Email'"
          :handleChange="
            (value) => {
              email = value;
              const checkEmail = validator.email(email);
              if (checkEmail) {
                errors = { ...errors, email: checkEmail, server: '' };
              } else {
                errors = { ...errors, email: '', server: '' };
              }
            }
          "
        />
        <Transition :css="false" @leave="(_, done) => motions.p1.leave(done)">
          <p
            class="-mt-3 ml-2 text-sm text-red-400"
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
            v-if="errors.email"
          >
            {{ errors.email }}
          </p>
        </Transition>
        <InputPass
          class="max-lg:w-full"
          :value="senha"
          :label="'Senha'"
          :handleChange="
            (value) => {
              senha = value;
              const checkSenha = validator.password(senha);
              if (checkSenha) {
                errors = { ...errors, senha: checkSenha, server: '' };
              } else {
                errors = { ...errors, senha: '', server: '' };
              }
            }
          "
        />
        <Transition :css="false" @leave="(_, done) => motions.p1.leave(done)">
          <p
            class="-mt-3 ml-2 text-sm text-red-400"
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
            v-if="errors.senha"
          >
            {{ errors.senha }}
          </p>
        </Transition>
        <fieldset class="w-[316px] max-lg:w-[360px] my-5">
          <div>
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-extrabold">Interesses</h4>
              <p class="text-zinc-400">No mínino um</p>
            </div>
            <div class="flex gap-2 flex-wrap mt-5">
              <p
                class="w-max py-1 px-5 border-2 border-black rounded-full text-center cursor-pointer mb-2 bg-white"
                @click="(event) => (item.active = !item.active)"
                :class="[item.active ? 'bg-yellow-300' : '']"
                v-for="item in itens"
              >
                {{ item.interesse }}
              </p>
              <Transition
                :css="false"
                @leave="(_, done) => motions.p1.leave(done)"
              >
                <p
                  class="-mt-3 ml-2 text-sm text-red-400"
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
                  v-if="errors.preferences"
                >
                  {{ errors.preferences }}
                </p>
              </Transition>
            </div>
          </div>
        </fieldset>
        <button
          class="mt-10 ml-auto flex items-center gap-5 py-3 px-10 uppercase font-bold text-lg border-2 border-yellow-300 max-lg:w-full"
          @click="handleSubmit"
        >
          <Spinner v-if="loading" class="m-auto" :st="'w-[52.48px] h-7'" />
          <span class="m-auto" v-else>Criar</span>
        </button>
        <Transition :css="false" @leave="(_, done) => motions.p1.leave(done)">
          <p
            class="-mt-3 ml-2 text-sm text-red-400 self-end"
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
            v-if="errors.server"
          >
            {{ errors.server }}
          </p>
        </Transition>
      </form>
    </div>
    <figure class="absolute right-0 bottom-5 -z-10 overflow-hidden max-lg:hidden">
      <img
        class="-rotate-12"
        src="../assets/grafite.png"
        alt="Arte de grafite"
      />
    </figure>
  </section>
</template>
