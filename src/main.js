import { createApp } from 'vue'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


import store from './store/index.js'

  import 'bootstrap/dist/css/bootstrap.css'
  import "bootstrap" 
import router from './router.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '@mdi/font/css/materialdesignicons.css' 
import BaseModal from './components/User/BaseModal.vue';
  const vuetify = createVuetify({
    components,
    directives,
    
    icons: {
      defaultSet: 'mdi',
      
      
    },
    
  })
  const app = createApp(App)
app.component('base-modal', BaseModal);
  app.use(vuetify)
  app.use(router)
app.use(store)
app.mount('#app')


