<template>
  <div class="login container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Login</h1>
      <Alert v-if="message" :message="message" :class="'alert-danger'" :dismiss="dismissError" />
      <form v-on:submit.prevent="getAuthToken">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" class="form-control" placeholder="Enter username" v-model="user.username">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" placeholder="Password" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-outline-dark btn-lg">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'login',
  data: function() {
    return {
      user: {},
      alert: '',
    }
  },
  components: {
    Alert
  },
  methods: {
    getAuthToken: function() {
      let loginUser = {
        username: this.user.username,
        password: this.user.password,
      }
      this.$http.post('api-token-auth/', loginUser)
        .then(
          (response) => {
            localStorage.setItem('auth_token', response.body.token)
            this.$router.push({path: '/habits'})
          },
          (error) => {
            this.$store.dispatch('setLoginError', error.body.non_field_errors[0])
          }
      );
    },
    dismissError: function() {
      return this.$store.commit('dismissLoginError')
    },
  },
  computed: {
    message: function() {
      return this.$store.state.loginError
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
