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
      email: localStorage.getItem('email'),
      disabled: sessionStorage.getItem('disabled'),
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.amount
    },

    refreshToken(state, token) {
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

    },
    disable(state, isDisabled) {
      state.disabled = isDisabled
      sessionStorage.setItem('disabled', isDisabled)
    },
  },
  getters: {
    is_logged_in(state) {
      if (state.token) {
        return true
      } else return false
    }
  }
}

export default new Vuex.Store({
  state: {},
  modules: {
    auth: moduleSign
  }
})
