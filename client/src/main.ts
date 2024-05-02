import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
    // You can set your default options here
    timeout:5000,
    position:POSITION.TOP_CENTER,
    maxToasts:1
};


const app = createApp(App)

app.use(router)
app.use(Toast, options);

app.mount('#app')
