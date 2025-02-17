import { createApp } from "vue";
import { createPinia } from "pinia"; // Import Pinia
import { createVuetify } from "vuetify";

import App from "./App.vue";
import router from "./router"; // Import router
import "./assets/global.css";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const pinia = createPinia(); // Create Pinia instance
const app = createApp(App);

app.use(pinia); // Use Pinia
app.use(router);
app.use(vuetify); // Use Vuetify
app.component("Flicking", Flicking);

// Set initial theme
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

app.mount("#app");
