import { createApp } from 'vue';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from "./router";
import Notifications from '@kyvg/vue3-notification';
import '@/assets/style.css';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Notifications);
app.mount("#app");
