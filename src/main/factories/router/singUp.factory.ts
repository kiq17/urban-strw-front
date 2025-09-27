import { useModal } from "@/main/composables/useModal";
import { RouteRecordRaw } from "vue-router";

export const makeSingUpPage: RouteRecordRaw = {
  path: "/cadastro",
  component: () => import(`@/presentation/pages/createAccount.vue`),
  beforeEnter: (to, from) => {
    const { closeModal } = useModal();
    closeModal();

    return true;
  },
};
