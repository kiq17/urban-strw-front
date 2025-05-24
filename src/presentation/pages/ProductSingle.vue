<script setup lang="ts">
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
import Footer from "@/presentation/components/Footer.vue";
import Header from "@/presentation/components/Header.vue";
import ProductDetails from "@/presentation/components/ProductsComponents/ProductDetails.vue";
import SelectProduct from "@/presentation/components/SelectProduct.vue";
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <section
    class="max-w-[1200px] max-base:max-w-[768px] m-auto mt-32 flex gap-10 max-base:flex-col my-36"
  >
    <SelectProduct />
    <ProductDetails :storage="makeLocalStorageAdapter()" />
  </section>
  <Footer />
  <DisclaimerBar />
</template>
