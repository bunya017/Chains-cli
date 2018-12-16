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
    loginError: null,
    usernameLoginError: null,
    passwordLoginError: null,
    usernameSignupError: null,
    passwordSignupError: null,
    emailSignupError: null,
  },
  mutations: {
    setLoginError (state, message){
      state.loginError = message
    },
    dismissLoginError (state){
      state.loginError = null
    },
    setSignupError (state, message){
      if(message.username) {
        state.usernameSignupError = message.username[0]
      }
      if(message.email) {
        state.emailSignupError = message.email
      }
      if(message.password) {
        state.passwordSignupError = message.password[0]
      }
    },
    dismissSignupError (state){
      state.usernameSignupError = null
      state.emailSignupError = null
      state.passwordSignupError = null
    },
    setLoginFieldError (state, message){
      if(message.username) {
        state.usernameLoginError = message.username[0]
      }
      if(message.password) {
        state.passwordLoginError = message.password[0]
      }
    },
    dismissLoginFieldError (state){
      state.usernameLoginError = null
      state.passwordLoginError = null
    },
  },
  actions: {
    setLoginError ({commit}, message) {
      commit('setLoginError', message)
    },
    setSignupError ({commit}, message) {
      commit('setSignupError', message)
    },
    setLoginFieldError ({commit}, message) {
      commit('setLoginFieldError', message)
    },
  }
})
