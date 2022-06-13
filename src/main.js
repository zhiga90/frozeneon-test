import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'
import './app.sass'
Vue.use(BootstrapVue)

import jsDelivrInstance from '@/api/jsDelivrInstance'
import npmSearchInstance from '@/api/npmSearchInstance'
Vue.prototype.$jsDelivrAPI = jsDelivrInstance
Vue.prototype.$npmSearchAPI = npmSearchInstance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
