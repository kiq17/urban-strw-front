import { makeStorageValidator } from "@/main/factories/validation/storageValidation.factory";
import { createRouter, createWebHistory } from "vue-router";
import { useModal } from "@/main/composables/useModal";

const routes = [
  {
    path: "/",
    component: () => import(`@/presentation/pages/Home.vue`),
  },
  {
    path: "/cadastro",
    component: () => import(`@/presentation/pages/createAccount.vue`),
    beforeEnter: (to, from) => {
      const { closeModal } = useModal();
      closeModal();

      return true;
    },
  },
  {
    path: "/pagamento",
    component: () => import(`@/presentation/pages/Payment.vue`),
  },
  {
    path: "/produtos",
    component: () => import(`@/presentation/pages/Products.vue`),
  },
  {
    path: "/produto/:slug",
    component: () => import(`@/presentation/pages/ProductSingle.vue`),
  },
  {
    path: "/perfil",
    component: () => import(`@/presentation/pages/Profile.vue`),
    beforeEnter: async (to, from) => {
      const isValid = makeStorageValidator().check("user");
      if (!isValid) return "/";
    },
  },
  {
    path: "/verificar/:code",
    component: () => import(`@/presentation/components/OtpComponents/Otp.vue`),
  },
  { path: '/:pathMatch(.*)*', component: () => import(`@/presentation/pages/NotFound.vue`) },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
