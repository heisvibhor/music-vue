import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API
Vue.use(Vuex)

const moduleSign = {
  state: () => {
    return {
      token: localStorage.getItem('token'),
      user_type: localStorage.getItem('user_type'),
      user_id: localStorage.getItem('user_id'),
      email: localStorage.getItem('email')
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.amount
    },

    refreshToken(state, token){
      state.token = 'Bearer ' + token
    },

    login(state, login_res) {
      state.token = 'Bearer ' + login_res.token
      state.user_type = login_res.user_type
      state.user_id = login_res.user_id
      state.email = login_res.email
      state.is_logged_in = true
      localStorage.setItem('token', state.token)
      localStorage.setItem('user_type', state.user_type)
      localStorage.setItem('user_id', state.user_id)
      localStorage.setItem('email', state.email)
    },

    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_type')
      localStorage.removeItem('user_id')
      localStorage.removeItem('email')
      state.token = ''
      state.user_type = ''
      state.user_id = ''
      state.email = ''
      
    }
  },
  getters: {
    is_logged_in(state) {
      if (state.token) {
        return true
      } else return false
    }
  }
}

const api = {

}



const refreshToken = () => {

}


export default new Vuex.Store({
  state: {
    count: 1,

  },
  mutations: {
    refreshToken(state) {
      axios('/refresh_token', {
        method: 'post',
        headers: {
          "Authorization": this.state.auth.token,
        }
      }).then((response) => {
        if (response.statusText == 'OK') {
          this.state.commit('refreshToken', response.data.token)
        }
        else {
          console.log(response)
          this.state.commit('logout')
        }
      }).catch((error) => {
        console.log(error)
        this.state.commit('logout')
      });
    },
    api(state, url, method, data) {
      console.log("hey")
      console.log(this.state.auth.token)
      axios(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.state.auth.token,
        }
      }).then((response) => {
        if (response.statusText == 'OK') {
          return response.data
        }
      }).catch((error) => {
        console.log(error);
        const err = error.response.data.message
        this.$root.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000,
          variant: "danger",
          solid: true
        })
      });
    },
    get(state, url, params) {
      if (params) {
        const searchParams = new URLSearchParams(data)
        url += searchParams.toString()
      }
      axios.get(url, {
        headers: {
          "Authorization": this.state.auth.token,
        }
      }).then((res) => {
        if (res.statusText == 'OK') {
          return res.data
        } else if (res.data.message == "Token has expired") {

        } else {
          yellowToast(res.data.message, "OOPS")
        }
      }).catch(err => console.log(err))
    }
  },
  actions: {
  },
  modules: {
    auth: moduleSign
  }
})
