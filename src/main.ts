import "./assets/index.css"
import 'vue-sonner/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from "./i18n"
import { useLocaleStore } from "./stores/localeStore"

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const localeStore = useLocaleStore();
localeStore.initLocale()
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
})

app.use(i18n);

app.mount('#app')
