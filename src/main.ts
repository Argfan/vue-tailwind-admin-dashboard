import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from './presets/20.05.24'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'


const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(VueApexCharts)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara  
});

app.mount('#app')
