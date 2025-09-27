import { RouteRecordRaw } from "vue-router";

export const makePaymentPage: RouteRecordRaw = {
  path: "/pagamento",
  component: () => import(`@/presentation/pages/Payment.vue`),
};
