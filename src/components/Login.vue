<template>
  <div class="login container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Login</h1>
      <Alert v-if="alert" v-bind:message="alert" v-bind:class="'alert-danger'" />
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
            document.cookie = "brokenChainsAuthToken=" + response.body.token;
            this.router.push({path: '/habits'});
          },
          (error) => {
            this.$router.push({path: '/login', query: {alert: error.body.non_field_errors[0]}})
          }
      );
    },
  },
  created: function() {
    if(this.$route.query.alert){
      this.alert = this.$route.query.alert;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
