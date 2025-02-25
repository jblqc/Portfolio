import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";

// Import Vuetify styles and Material Design Icons
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Import Flicking
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

// Create Vue app instance
const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Create Vuetify instance
const vuetify = createVuetify({
  // Add your custom configurations here if needed
});

app.use(pinia);
app.use(router);
app.use(vuetify);
app.component("Flicking", Flicking);

// Set initial theme
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

app.mount("#app");
