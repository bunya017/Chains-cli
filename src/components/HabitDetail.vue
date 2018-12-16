<template>
  <div class="habitdetail container">
    <div class="card card-body col-md-6 mx-auto my-2 border-dark">
      <h1 class="py-2">{{ habit.name }}</h1>
      <p>Goal: <span class="ml-3">{{ habit.goal }}</span></p>
      <p>Start on: <span class="ml-3">{{ habit.start_date }}</span></p>
      <p>End on: <span class="ml-3">{{ habit.stop_date }}</span></p>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Weeks</th>
            <th colspan="7">Entries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22-Oct-2018</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>29-Oct-2018</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'habitdetail',
  data: function() {
    return {
      habit: {},
      authToken: this.getAuthToken(),
    }
  },
  methods: {
    getAuthToken: function() {
      return localStorage.getItem('auth_token')
    },
    fetchHabit: function(id) {
      this.$http.get('habits/'+ id +'/', {headers: {'Authorization': 'Token '+this.authToken,}})
        .then(
          (response) => {
            this.habit = response.body;
          }
      );
    },
  },
  created: function() {
    this.fetchHabit(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
