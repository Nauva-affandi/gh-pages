import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      func: fileURLToPath(new URL("./src/utils/helper", import.meta.url)),
      store: fileURLToPath(new URL("./src/stores", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
      },
    },
  },
});
