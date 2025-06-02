<script setup lang="ts">
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { useModal } from "@/main/composables/useModal";
import { makeRemoteAuthentication } from "@/main/factories/usecases/remoteAuthentication.factory";
import {
  makeYupValidationFields,
  makeYupValidationForms,
} from "@/main/factories/validation";
import { Teleport, Transition, onMounted, onUnmounted, ref } from "vue";
import Modal from "./Modal.vue";

const itens = ref(["home", "marcas", "produtos", "lojas"]);

interface Props {
  storage: LocalStorageAdapter;
}

const { storage } = defineProps<Props>();

const modalControl = useModal();
const isOpen = ref<boolean>(false);
const data = ref<{ user: string }>(storage.get("user"));

function handleNavigate(value: string) {
  const element = document.querySelector(`[data-section=${value}]`);
  if (!element) return;

  window.scrollTo({
    top: (element as HTMLElement).offsetTop - 100,
    behavior: "smooth",
  });
}

function teste() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  window.addEventListener("resize", handleSizeChange);
  handleSizeChange();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleSizeChange);
});

function handleSizeChange() {
  if (window.innerWidth < 1000) {
    itens.value = ["home", "produtos", "eventos"];
  } else {
    itens.value = ["home", "marcas", "produtos", "lojas"];
  }
}
</script>

<template>
  <header class="h-20 bg-black items-center fixed w-full top-0 z-50">
    <div
      class="max-w-[1200px] max-base:max-w-[768px] max-lg:max-w-[360px] m-auto h-20 flex justify-between items-center relative group"
      :data-open="isOpen"
    >
      <a href="/">
        <img
          src="../assets/Group_50.png"
          class="w-full h-full"
          alt="Logo Urban StreeWear"
        />
      </a>
      <button
        class="max-base:hidden max-lg:block max-lg:cursor-pointer max-lg:border-none max-lg:w-7 max-lg:h-6 max-lg:bg-none max-lg:relative group"
        :data-btn="isOpen"
        @click="() => (isOpen = !isOpen)"
      >
        <span
          className="max-base:hidden max-lg:block max-lg:absolute max-lg:h-1 max-lg:w-7 max-lg:top-0 max-lg:border-t-4 max-lg:rounded-full max-lg:border-white max-lg:before:content-[''] max-lg:before:block max-lg:before:w-7 max-lg:before:h-1 max-lg:before:bg-white max-lg:before:transition-all max-lg:before:duration-300 max-lg:before:absolute max-lg:before:top-5 max-lg:after:content-[''] max-lg:after:block max-lg:after:w-7 max-lg:after:h-1 max-lg:after:bg-white max-lg:after:transition-all max-lg:after:duration-300 max-lg:after:absolute max-lg:after:top-2 max-lg:before:rounded-full max-lg:after:rounded-full group-data-[btn='true']:border-t-transparent group-data-[btn='true']:after:rotate-[-135deg] group-data-[btn='true']:before:rotate-[135deg] group-data-[btn='true']:after:top-2 group-data-[btn='true']:before:top-2"
        ></span>
      </button>
      <nav
        class="max-lg:h-0 max-lg:transition-all max-lg:duration-300 max-lg:fixed max-lg:top-20 max-lg:bg-black max-lg:w-[360px] max-lg:flex max-lg:justify-center max-lg:overflow-y-hidden max-lg:items-center group-data-[open='true']:h-screen group-data-[open='true']:visible group-data-[open='false']:visible max-sm:w-full max-sm:left-0"
      >
        <ul
          class="flex gap-16 max-lg:gap-5 text-zinc-300 items-center relative max-lg:flex-col max-lg:text-center max-lg:-mt-28"
        >
          <li
            v-for="navItem in itens"
            :key="navItem"
            class="hover:text-white transition-colors duration-300 max-lg:w-full"
          >
            <RouterLink
              :onclick="teste"
              v-if="
                navItem != 'marcas' &&
                navItem != 'lojas' &&
                navItem != 'eventos'
              "
              class="w-full inline-block first-letter:uppercase max-lg:p-2"
              active-class="text-white"
              :to="navItem == 'home' ? '/' : `/${navItem}`"
            >
              {{ navItem }}
            </RouterLink>
            <RouterLink
              :onclick="() => handleNavigate(navItem)"
              class="w-full inline-block first-letter:uppercase max-lg:p-2"
              to="/"
              v-else
              >{{ navItem }}</RouterLink
            >
          </li>
          <li>
            <RouterLink
              :to="'/perfil'"
              active-class="text-yellow-300"
              class="text-4xl cursor-pointer text-zinc-400 hover:text-zinc-300 transition duration-300"
              v-if="data?.user?.length > 0"
            >
              <i class="fa-solid fa-circle-user"></i>
            </RouterLink>
            <button
              v-else
              class="py-1 px-5 border-2 border-yellow-300 rounded-full text-center text-white max-lg:px-20"
              type="button"
              @click="modalControl.openModal"
            >
              Entrar
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <Teleport to="body">
    <Transition>
      <Modal
        v-if="modalControl.show.value"
        :authentication="makeRemoteAuthentication()"
        :validation-field="makeYupValidationFields()"
        :validation-form="makeYupValidationForms()"
        :storage="storage"
        @close="modalControl.closeModal"
      />
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
