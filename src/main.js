import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { MyPlugin } from './api'
import { ToastPlugin } from 'bootstrap-vue'
import axios from "axios";
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
  data() {
    return {
      x: 'asd'
    }
  },
  methods: {
    redToast(message, title) {
      this.$root.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        variant: "danger",
        solid: true
      })
    },
    greenToast(message, title) {
      this.$root.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        variant: "success",
        solid: true
      })
    },

    yellowToast(message, title) {
      this.$root.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 5000,
        variant: "warning",
        solid: true
      })
    },
  },
  provide() {
    return {
      yellowToast(message, title) {
        this.$root.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 5000,
          variant: "warning",
          solid: true
        })
      },
      redToast(message, title) {
        this.$root.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 5000,
          variant: "danger",
          solid: true
        })
      },
      greenToast(message, title) {
        this.$root.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 5000,
          variant: "success",
          solid: true
        })
      },

      mutate(method, url, data) {
        const mid = axios(url, {
          method: method,
          data: data,
          headers: {
            "Authorization": store.state.auth.token,
            "Content-Type": "multipart/form-data"
          }
        })

        return new Promise((resolve, reject) => {
          mid.then(async (res) => {
            if (res.statusText == 'OK') {
              resolve(res.data)
              if (res.data.message) {
                this.greenToast(res.data.message, "SUCCESS")
              }
            } else {
              this.redToast(res.data.message, "OOPS")
            }
          }).catch(async (err) => {
            if (err.response && err.response.data && err.response.data.message == "Token has expired") {
              router.push({ path: "/login" })
              store.commit("logout")
            } else if (err.response && err.response.data && err.response.data.message == "creator disabled") {
              this.$store.commit('disable', true)
              router.push({name: 'creatorProfile', params: {'type': 'edit'}})
            } else if (err.response && err.response.data && err.response.data.message) {
              this.redToast(err.response.data.message, "OOPS")
            }

            console.log(err)
          })
        })
      },

      get(url, params = undefined) {
        let furl = url
        if (params) {
          furl += "?" + Object.keys(params).map(key => {
            return `${key}=${encodeURIComponent(params[key])}`;
          }).join("&");
        }

        const mid = axios.get(furl, {
          headers: {
            "Authorization": store.state.auth.token,
          }
        })
        return new Promise((resolve, reject) => {
          mid.then(async (res) => {
            if (res.statusText == 'OK') {
              resolve(res.data)
            } else {
              this.yellowToast(res.data.message, "OOPS")
            }
          }).catch(async (err) => {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message == "Token has expired") {
              router.push({ path: "/login" })
              store.commit("logout")
            } else if (err.response && err.response.data && err.response.data.message == "creator disabled") {
              this.$store.commit('disable', true)
              router.push({name: 'creatorProfile', params: {'type': 'edit'}})
            }  else if (err.response && err.response.data && err.response.data.message) {
              this.yellowToast(err.response.data.message, "OOPS")
            }
            console.log(err)
          })
        })
      },


    }
  },
  render: function (h) { return h(App) },
}).$mount('#app')

