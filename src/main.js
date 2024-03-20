import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { MyPlugin } from './api'
import { ToastPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ToastPlugin)

Vue.config.productionTip = false
Vue.use(MyPlugin, store)
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

