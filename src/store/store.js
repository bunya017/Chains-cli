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
    signupError: null,
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
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setLoginError ({commit}, message) {
      commit('setLoginError', message)
    },
    //dismissLoginError ({commit}) {
      //commit('dismissLoginError')
    //},
  }
})
