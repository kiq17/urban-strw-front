import { createRouter, createWebHistory } from "vue-router";
import {
  makeHomePage,
  makeNotFoundPage,
  makeProductPage,
  makeProductsPage,
  makeProfilePage,
  makeSingUpPage,
  makeVerificationPage,
} from "../factories/router";
import { makePaymentPage } from "../factories/router/payment.factory";

const routes = [
  makeHomePage,
  makeSingUpPage,
  makePaymentPage,
  makeProductsPage,
  makeProductPage,
  makeProfilePage,
  makeVerificationPage,
  makeNotFoundPage,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
