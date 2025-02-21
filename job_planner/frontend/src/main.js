import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css' 

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueToast)
  .mount('#app')
