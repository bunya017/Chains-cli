<template>
  <div class="accountcreationsuccess container">
    <div class="col-md-6 mx-auto card card-body mt-3">
      <h1 class="pb-3 text-center">Success</h1>
      <p>Your account has been created successfully.</p>
      <div class="py-2 ">
        <router-link to="/login" class="btn btn-outline-dark btn-lg">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accountcreationsuccess',
  data: function() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
