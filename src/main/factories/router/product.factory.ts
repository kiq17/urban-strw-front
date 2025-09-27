import { RouteRecordRaw } from "vue-router";

export const makeProductPage: RouteRecordRaw = {
  path: "/produto/:slug",
  component: () => import(`@/presentation/pages/ProductSingle.vue`),
};
