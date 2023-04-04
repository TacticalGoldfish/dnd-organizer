import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
fetch(process.env.BASE_URL + "modules.json")
  .then((response) => response.json())
  .then((modules) => {
    console.log(modules)
      Vue.prototype.$modules = modules
      new Vue({
        vuetify,
        render: h => h(App)
      }).$mount('#app')
})
