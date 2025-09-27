import { RouteRecordRaw } from "vue-router";
import { makeStorageValidator } from "../validation/storageValidation.factory";

export const makeProfilePage: RouteRecordRaw = {
  path: "/perfil",
  component: () => import(`@/presentation/pages/Profile.vue`),
  beforeEnter: async (to, from) => {
    const isValid = makeStorageValidator().check("user");
    if (!isValid) return "/";
  },
};
