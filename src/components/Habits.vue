<template>
  <div class="habits container">
    <div class="col-md-8 mx-auto">
      <div class="row align-items-center pt-5">
        <Alert v-if="alert" v-bind:message="alert" :class="'alert-success'" />
        <h1>My Habits</h1>
        <span class="ml-auto"><router-link to="/add" class="btn btn-info rounded-0 shadow">New Habit</router-link></span>
      </div>
      <ul class="list-group shadow-lg mb-5 my-2">
        <li class="list-group-item rounded-0"  style="background-color: #ebf0f3;" v-for="(habit, index) in habits">
          <router-link class="text-dark" :to="'/habits/'+habit.id">
            <h3>{{ habit.name }}</h3>
            <p class="pl-2 my-0">{{ habit.goal }}</p>
            <p class="pl-2 my-0">{{ habit.start_date }}</p>
          </router-link>
        </li>
      </ul>
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
      authToken: this.getAuthToken(),
    }
  },
  components: {
    Alert
  },
  methods: {
    getAuthToken: function() {
      return localStorage.getItem('auth_token')
    },
    fetchHabits: function() {
      this.$http.get('habits/', {headers: {'Authorization': 'Token '+this.authToken,}})
        .then(
          (response) => {
            this.habits = response.body;
          }
      );
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
