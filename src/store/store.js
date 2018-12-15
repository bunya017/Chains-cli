import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState({
    paths: ['habits']
  })],
  state: {
    token: null,
    loginError: null,
    usernameError: null,
    passwordError: null,
    emailError: null,
  },
  mutations: {
    setToken (state, token){
      state.token = token
    },
    setLoginError (state, message){
      state.loginError = message
    },
    dismissLoginError (state){
      state.loginError = null
    },
    setSignupError (state, message){
      if(message.username) {
        state.usernameError = message.username[0]
      }
      if(message.email) {
        state.emailError = message.email
      }
      if(message.password) {
        state.passwordError = message.password[0]
      }
    },
    dismissSignupError (state){
      state.usernameError = null
      state.emailError = null
      state.passwordError = null
    },
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setLoginError ({commit}, message) {
      commit('setLoginError', message)
    },
    setSignupError ({commit}, message) {
      commit('setSignupError', message)
    },
  }
})
