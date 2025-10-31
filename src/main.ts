import "./assets/index.css"
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import { QuillEditor } from "@vueup/vue-quill"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
})

app.component('QuillEditor', QuillEditor)


app.mount('#app')
