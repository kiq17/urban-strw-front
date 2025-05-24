import { createApp } from "vue";
import App from "./App.vue";
import "@/presentation/styles/global.css";
import { createPinia } from "pinia";
import router from "@/main/router";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);

app.use(MotionPlugin);
app.use(createPinia());
app.use(router).mount("#app");
