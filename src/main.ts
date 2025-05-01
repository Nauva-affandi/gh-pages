import "@/config/firebase/app.ts";

import "./assets/style/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import darkModeStore from "store/darkMode.ts";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

darkModeStore().init();

app.use(router);

app.mount("#app");
