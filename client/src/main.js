import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueKonva from 'vue-konva';

Vue.config.productionTip = false
Vue.use(VueKonva, { prefix: 'Konva'})
fetch(process.env.BASE_URL + "modules.json")
  .then((response) => response.json())
  .then((modules) => {
      Vue.prototype.$modules = modules
      new Vue({
        vuetify,
        render: h => h(App)
      }).$mount('#app')
})
