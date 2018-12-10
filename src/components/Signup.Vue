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
          <input type="text" class="form-control" placeholder="Enter a valid email address" v-model="user.username">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" placeholder="Password" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Signup</button>
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
    }
  },
  components: {
    Alert
  },
  methods: {
    registerUser: function() {
      let regUser = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      }
      this.$http.post('signup/', regUser)
        .then(
          (response) => {
            console.log(response.body);
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
