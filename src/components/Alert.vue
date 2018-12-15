<template>
  <div class="alert alert-dismissible fade show text-center" role="alert">
    {{ message }}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="dismiss">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: ['message', 'dismiss'],
  data: function() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
