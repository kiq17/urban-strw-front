<script setup lang="ts">
import { makeRemoteSignUp } from "@/main/factories/usecases/remoteSignUp.factory";
import Footer from "@/presentation/components/Footer.vue";
import Header from "@/presentation/components/Header.vue";
import SignUp from "@/presentation/components/SignUp.vue";
import {
  makeYupValidationFields,
  makeYupValidationForms,
} from "@/main/factories/validation";
import { makeSignUpValidator } from "@/main/factories/validation/signUpValidation.factory";
import { makeLocalStorageAdapter } from "@/main/factories/cache/localStorage.factory";
</script>

<template>
  <Header :storage="makeLocalStorageAdapter()" />
  <SignUp
    :sing-up="makeRemoteSignUp()"
    :validator="makeSignUpValidator()"
    :validation-field="makeYupValidationFields()"
    :validation-form="makeYupValidationForms()"
  />
  <Footer />
  <DisclaimerBar />
</template>
