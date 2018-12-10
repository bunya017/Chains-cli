<template>
  <div class="signup container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Signup</h1>
      <Alert v-if="alert" v-bind:message="alert" v-bind:class="'alert-danger'" />
      <form v-on:submit.prevent="registerUser">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" class="form-control" placeholder="Enter username" v-model="user.username">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="text" class="form-control" placeholder="Enter a valid email address" v-model="user.email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" placeholder="Password" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-outline-dark btn-lg">Signup</button>
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
            this.$router.push({path: '/success'});
          },
          (error) => {
            this.$router.push({path: '/signup', query: {alert: error.body.non_field_errors[0]}})
          }
      );
    },
  },
  /**
  created: function() {
    if(this.$route.query.alert){
      this.alert = this.$route.query.alert;
    }
  },
  **/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
