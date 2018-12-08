<template>
  <div class="habits container">
    <h1 class="pt-2">My Habits</h1>
    <hr>
    <Alert v-if="alert" v-bind:message="alert" />
    <div class="col-md-6 card card-body mx-auto  border-dark">
      <div class="ml-auto">
        <router-link to="/add" class="btn btn-dark btn-lg">Add new habit</router-link>
      </div>
      <div class="card card-body py-0 my-2 border-dark" v-for="habit in habits">
        <div class="row">
          <div class="pl-2">
            <h3>{{ habit.name }}</h3>
            <p>{{ habit.goal }}</p>
            <p>{{ habit.start_date }}</p>
          </div>
          <div class="ml-auto my-auto p-3">
            <router-link class="btn btn-dark" v-bind:to="'/habits/'+habit.id">
              View
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Alert from './Alert'
export default {
  name: 'habits',
  data: function() {
    return {
      habits: [],
      alert: '',
      authToken: this.getCookie('brokenChainsAuthToken'),
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
    fetchHabits: function() {
      this.$http.get('habits/', {headers: {'Authorization': 'Token '+this.authToken,}})
        .then(function(response){
          this.habits = response.body;
        });
    },
  },
  created: function() {
    if(this.$route.query.alert){
      this.alert = this.$route.query.alert;
    }

    this.fetchHabits();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
