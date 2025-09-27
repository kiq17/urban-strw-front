import { RouteRecordRaw } from "vue-router";

export const makeNotFoundPage: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  component: () => import(`@/presentation/pages/NotFound.vue`),
};
