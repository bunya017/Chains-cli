<template>
  <div class="login container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Login</h1>
      <Alert v-if="message" :message="message" :class="'alert-danger'" :dismiss="dismissLoginError" />
      <form v-on:submit.prevent="setAuthToken">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" class="form-control" placeholder="Enter username" required="" v-model="user.username">
          <small class="form-text text-danger ml-4 font-weight-bold" v-if="usernameError">{{ usernameError }}</small>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" placeholder="Password" required="" v-model="user.password">
          <small class="form-text text-danger ml-4 font-weight-bold" v-if="passwordError">{{ passwordError }}</small>
        </div>
        <button type="submit" class="btn btn-outline-dark btn-lg" @click="dismissLoginFieldError">Login</button>
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
    }
  },
  components: {
    Alert
  },
  methods: {
    setAuthToken: function() {
      let loginUser = {
        username: this.user.username,
        password: this.user.password,
      }
      this.$http.post('api-token-auth/', loginUser)
        .then(
          (response) => {
            localStorage.setItem('auth_token', response.body.token)
            localStorage.setItem('isLoggedIn', true)
            this.$router.push({path: '/habits'})
          },
          (error) => {
            if (error.body.non_field_errors) {
              this.$store.dispatch('setLoginError', error.body.non_field_errors[0])
            } else {
              this.$store.dispatch('setLoginFieldError', error.body)
            }
          }
      );
    },
    dismissLoginError: function() {
      return this.$store.commit('dismissLoginError')
    },
    dismissLoginFieldError: function() {
      return this.$store.commit('dismissLoginFieldError')
    }
  },
  computed: {
    message: function() {
      return this.$store.state.loginError
    },
    usernameError: function() {
      return this.$store.state.usernameLoginError
    },
    passwordError: function() {
      return this.$store.state.passwordLoginError
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
