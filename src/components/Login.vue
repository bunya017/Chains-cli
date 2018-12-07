<template>
  <div class="login container">
    <h1 class="pt-2">Login</h1>
    <hr>
    <form v-on:submit.prevent="getAuthToken">
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" placeholder="Enter username" v-model="user.username">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" placeholder="Password" v-model="user.password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function() {
    return {
      user: {},
    }
  },
  methods: {
    getAuthToken: function() {
      let loginUser = {
        username: this.user.username,
        password: this.user.password
      }
      this.$http.post('http://127.0.0.1:8000/api-token-auth/', loginUser)
        .then(function(response){
          document.cookie = "brokenChainsAuthToken=" + response.body.token +";";
      });
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
