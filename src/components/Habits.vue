<template>
  <div class="habits container">
    <div class="col-md-8 mx-auto">
      <div class="row align-items-center pt-5">
        <h1 class="pt-2">My Habits</h1>
        <span class="ml-auto"><router-link to="/add" class="btn btn-info">Add new habit</router-link></span>
      </div>
      <Alert v-if="alert" v-bind:message="alert" :class="'alert-success'" />
      <div class="row my-3">
        <div class="col card card-body ml-auto rounded-0 shadow-lg" style="background-color: #ebf0f3;" v-for="(habit, index) in habits">
          <div class="row">
            <div class="ml-2">
              <h3 class="py-0 my-0">{{ index + 1 }}. {{ habit.name }}</h3>
              <p class="p-0 my-0 pl-4 ml-2">{{ habit.goal }}</p>
              <p class="p-0 my-0 pl-4 ml-2">{{ habit.start_date }}</p>
            </div>
            <div class="ml-auto my-auto px-3">
              <router-link class="btn btn-info" v-bind:to="'/habits/'+habit.id">
                View
              </router-link>
            </div>
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
