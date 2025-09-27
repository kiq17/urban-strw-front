import { RouteRecordRaw } from "vue-router";

export const makeProductsPage: RouteRecordRaw = {
  path: "/produtos",
  component: () => import(`@/presentation/pages/Products.vue`),
};
