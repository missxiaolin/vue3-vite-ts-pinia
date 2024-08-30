import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "babel-polyfill";

import "./assets/css/tailwindcss.css";

const a = 1;

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");
