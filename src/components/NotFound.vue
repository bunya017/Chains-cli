<template>
  <div class="notFound container">
    <div class="row fill-viewport align-items-start">
      <div class="col-12 col-md-6 mx-auto mt-5 text-center">
        <h1 class="text-dark display-1">404</h1>
        <p class="lead pb-3">We can't seem to find the page you're looking for. We hope you'll help us not make a habit out of this.</p>
        <ul class="list-inline" v-if="userAuthenticated()">
          <li class="list-inline-item">
            <router-link to="/habits">
              <button class="btn btn-outline-dark border-0 p-2">
                Back to Home
              </button>
            </router-link>
          </li>
        </ul>
        <ul class="list-inline" v-else>
          <li class="list-inline-item">
            <router-link to="/login">
              <button class="btn btn-outline-dark border-0 p-2">
                Login
              </button>
            </router-link>
          </li>
          <li class="list-inline-item">
            <router-link to="/signup">
              <button class="btn btn-outline-dark border-0 p-2">
                Signup
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data: function() {
    return {

    }
  },
  methods: {
    userAuthenticated: function() {
      return JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fill-viewport {
  min-height: calc(100vh - 48px);
}
</style>
