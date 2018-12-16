<template>
  <div class="signup container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Signup</h1>
      <Alert v-if="alert" v-bind:message="alert" v-bind:class="'alert-danger'" />
      <form v-on:submit.prevent="registerUser">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" class="form-control" placeholder="Enter username" required="" v-model="user.username">
          <small class="form-text text-danger ml-4 font-weight-bold" v-if="usernameError">{{ usernameError }}</small>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" placeholder="Enter a valid email address" required="" v-model="user.email">
          <small class="form-text text-danger ml-4 font-weight-bold" v-if="emailError">{{ emailError }}</small>
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" placeholder="Password" minlength=8 required="" v-model="user.password">
          <small class="form-text text-danger ml-4 font-weight-bold" v-if="passwordError">{{ passwordError }}</small>
        </div>
        <button type="submit" class="btn btn-outline-dark btn-lg" required="" @click="dismissSignupErrors">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'signup',
  data: function() {
    return {
      user: {},
      alert: '',
      csrfToken: this.getCookie('csrftoken'),
    }
  },
  components: {
    Alert
  },
  methods: {
    getCookie: function(cookieName) {
      var name = cookieName + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
    },
    registerUser: function() {
      let regUser = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      }
      this.$http.post('users/signup/',
        regUser,
        {
          headers: {
            'X-CSRFToken': this.csrfToken,
          }
        }).then(
          (response) => {
            localStorage.setItem('auth_token', response.body.token)
            this.$router.push({path: '/habits'})
          },
          (error) => {
            this.$store.dispatch('setSignupError', error.body)
          }
      )
    },
    dismissSignupErrors: function() {
      return this.$store.commit('dismissSignupError')
    }
  },
  computed: {
    usernameError: function() {
      return this.$store.state.usernameError
    },
    emailError: function() {
      return this.$store.state.emailError
    },
    passwordError: function() {
      return this.$store.state.passwordError
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
