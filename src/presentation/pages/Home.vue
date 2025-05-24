<script setup lang="ts">
import Header from "@/presentation/components/Header.vue";
import BannerHome from "@/presentation/components/BannerHome.vue";
import BrandSection from "@/presentation/components/BrandSection.vue";
import ItensSection from "@/presentation/components/ItensSection.vue";
import StoreSection from "@/presentation/components/StoreSection.vue";
import Footer from "@/presentation/components/Footer.vue";
import DisclaimerBar from "@/presentation/components/DisclaimerBar.vue";
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
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
