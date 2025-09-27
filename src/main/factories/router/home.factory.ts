import { RouteRecordRaw } from "vue-router";

export const makeHomePage: RouteRecordRaw = {
  path: "/",
  component: () => import(`@/presentation/pages/Home.vue`),
};
