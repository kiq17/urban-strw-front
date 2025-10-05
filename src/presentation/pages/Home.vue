<script setup lang="ts">
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
import BannerHome from "@/presentation/components/BannerHome.vue";
import BrandSection from "@/presentation/components/BrandSection.vue";
import DisclaimerBar from "@/presentation/components/DisclaimerBar.vue";
import Footer from "@/presentation/components/Footer.vue";
import Header from "@/presentation/components/Header.vue";
import ItensSection from "@/presentation/components/ItensSection.vue";
import StoreSection from "@/presentation/components/StoreSection.vue";
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <BannerHome />
  <BrandSection />
  <ItensSection :storage="makeLocalStorageAdapter()" />
  <StoreSection />
  <Footer />
  <DisclaimerBar />
</template>
