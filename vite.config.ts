import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), nodePolyfills()],
  server: {
    port: 3000,
  },
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
