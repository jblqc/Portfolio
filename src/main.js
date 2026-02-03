import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import App from './App.vue';
import router from './router';
import './assets/global.css';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({});

app.use(pinia);
app.use(router);
app.use(vuetify);

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

app.mount('#app');
