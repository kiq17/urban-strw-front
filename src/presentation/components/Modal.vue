<script lang="ts" setup>
import { Authentication } from "@/domain/usecases";
import { YupFiledsAdapter, YupFormsAdapter } from "@/infra/validators";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useModal } from "@/main/composables/useModal";
import Input from "@/presentation/components/shared/Input.vue";
import InputPass from "@/presentation/components/shared/InputPass.vue";
import Spinner from "./Spinner.vue";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";

const email = ref<string>("");
const pass = ref<string>("");
const error = ref<Record<string, string>>({});
const loading = ref<boolean>(false);

const router = useRouter();

interface Props {
  authentication: Authentication;
  validationField: YupFiledsAdapter;
  validationForm: YupFormsAdapter;
  storage: LocalStorageAdapter;
}

const props = defineProps<Props>();

const validateLogin = (): boolean => {
  const checkLogin = props.validationForm.auth({
    email: email.value,
    senha: pass.value,
  });
  if (checkLogin) {
    error.value = checkLogin;
    return true;
  }

  return false;
};

const login = async () => {
  loading.value = true;

  if (validateLogin()) {
    loading.value = false;
    return;
  }

  try {
    const data = await props.authentication.auth({
      email: email.value,
      senha: pass.value,
    });
    console.log("data", data)
    props.storage.set("user", data);
    loading.value = false;
    router.push("/perfil");
    const { closeModal } = useModal();
    closeModal();
  } catch (e) {
    const err = e as Error;
    loading.value = false;
    error.value = { server: err.message };
  }
};
</script>

<template>
  <div
    id="overlay"
    @click="e => {
        if ((e.target as HTMLDivElement).getAttribute('id')) {
            $emit('close');
        }
    }"
    class="bg-black bg-opacity-50 inset-0 fixed flex items-center z-50"
  >
    <dialog
      open
      class="p-10 mt-14 rounded-md bg-white h-max w-[400px] text-black shadow-xl"
    >
      <h2 class="text-4xl font-bold text-center mb-5">Login</h2>
      <form @submit="$event.preventDefault()" class="flex h-max flex-col gap-5">
        <Input
          :value="email"
          :label="'Email'"
          :handleChange="
            (value) => {
              email = value;
              const checkEmail = validationField.email(email);
              if (checkEmail) {
                error = { ...error, email: checkEmail, server: '' };
              } else {
                error = { ...error, email: '', server: '' };
              }
            }
          "
        />
        <p v-if="error.email" class="text-red-500 text-sm ml-3 -mt-3">
          {{ error.email }}
        </p>
        <InputPass
          :value="pass"
          :label="'Senha'"
          :handleChange="
            (value) => {
              pass = value;
              const checkPass = validationField.password(pass);
              if (checkPass) {
                error = { ...error, senha: checkPass, server: '' };
              } else {
                error = { ...error, senha: '', server: '' };
              }
            }
          "
        />
        <p v-if="error.senha" class="text-red-500 text-sm ml-3 -mt-3">
          {{ error.senha }}
        </p>
        <p v-if="error.server" class="text-red-500 text-center text-sm ml-2">
          {{ error.server }}
        </p>
        <button
          type="submit"
          class="px-5 py-3 bg-black text-white rounded-md font-bold disabled:cursor-not-allowed"
          @click="login"
          :disabled="loading"
        >
          <Spinner v-if="loading" :st="''"/>
          <span v-else>Entrar</span>
        </button>
        <i
          class="fa-solid fa-xmark absolute right-5 cursor-pointer top-2 text-2xl py-[1px] px-[9px] hover:bg-zinc-200 rounded-full transition-colors duration-300"
          role="button"
          aria-label="Fechar"
          @click="$emit('close')"
        ></i>
      </form>
      <p
        class="uppercase text-center w-full my-5 before:w-[42%] relative before:absolute before:bottom-3 text-lg before:h-1 before:bg-zinc-400 before:block before:rounded-full after:absolute after:bottom-3 after:right-0 after:w-[42%] after:h-1 after:bg-zinc-400 after:block after:rounded-full"
      >
        ou
      </p>
      <div class="flex gap-5">
        <span class="absolute px-3 py-2 z-10 bottom-[46px] left-[68px] cursor-not-allowed block text-xs font-bold text-black bg-yellow-300 rounded-lg text-center">Em breve</span>
        <button
          type="button"
          disabled="true"
          class="px-4 py-2 border-2 border-black text-black rounded-md flex justify-between items-center font-bold gap-3 blur-[2px] cursor-not-allowed"
        >
          <span> Entrar com</span>
          <i class="fa-brands fa-google"></i>
        </button>
        <RouterLink
          :to="'/cadastro'"
          class="px-4 py-2 border-2 border-black text-black rounded-md flex justify-between items-center font-bold gap-3"
        >
          <span>Criar conta</span>
          <i class="fa-solid fa-user"></i>
        </RouterLink>
      </div>
    </dialog>
  </div>
</template>
