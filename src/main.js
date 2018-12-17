// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import './../node_modules/jquery/dist/jquery.min.js'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(vueResource)

Vue.http.options.root = 'http://127.0.0.1:8000/api';

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: function() {
    return {
    }
  },
  template: `
    <div id='app'>
      <nav class="navbar navbar-expand-md navbar-light bg-light py-1">
        <div class="container">
          <router-link to="/" class="navbar-brand">brokenChains</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav" v-show="this.getAuthToken()">
              <li class="nav-item">
                <router-link to="/habits" class="nav-link">Habits</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">About</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-if="this.getAuthToken()">
              <li class="nav-item" @click="logout">
                <a class="nav-link btn" style="cursor: pointer;">Logout</a>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/signup" class="nav-link">Signup</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view />
    </div>
  `,
  methods: {
    getAuthToken: function() {
      return localStorage.getItem('auth_token')
    },
    removeAuthToken: function() {
      return localStorage.removeItem('auth_token')
    },
    logout: function() {
      this.removeAuthToken()
      return this.$router.push({path: '/login'})
    }
  },
  updated: function() {
    this.getAuthToken()
  }
}).$mount('#app')
