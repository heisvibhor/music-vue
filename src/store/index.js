import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleSign = {
  state: () => {
    return {token : localStorage.getItem('token'),
      user_type : localStorage.getItem('user_type'),
      user_id : localStorage.getItem('user_id'),
      email : localStorage.getItem('email')}
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.amount
    },

    login(state, login_res) {
      state.token = 'Bearer' + login_res.token
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


export default new Vuex.Store({
  state: {
    count: 1,

  },
  mutations: {
    increment(state) {
      // mutate state
      state.count++
    }
  },
  actions: {
  },
  modules: {
    auth: moduleSign
  }
})
