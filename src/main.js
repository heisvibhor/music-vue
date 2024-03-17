import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { methods, MyPlugin } from './api'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.someThing = function () {
  console.log("Somethong")
}
const $bus = new Vue();

Vue.prototype.$bus = $bus;

$bus.show = (vars) => {
  console.log("vars", $root)
}
Vue.config.productionTip = false
Vue.use(MyPlugin, store)
new Vue({
  mixin: [methods],
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

