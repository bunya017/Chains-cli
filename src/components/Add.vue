<template>
  <div class="add container">
    <h1 class="pt-2">Add Habit</h1>
    <hr>
    <form class="col-md-6 mx-auto" v-on:submit.prevent="addNewHabit">
      <div class="form-group">
        <label>Name <small class="font-italic text-danger">(required)</small></label>
        <input type="text" class="form-control" placeholder="Name of new habit" required="" v-model="habit.name">
      </div>
      <div class="form-group">
        <label>Goal <small class="font-italic text-danger">(required)</small></label>
        <input type="text" class="form-control" placeholder="Goal statement" required="" v-model="habit.goal">
      </div>
      <div class="form-group">
        <label>Stop date <small class="font-italic text-danger">(required)</small></label>
        <input type="date" class="form-control" required="" v-model="habit.stop_date">
      </div>
      <button type="submit" class="btn btn-outline-dark">Submit</button>
    </form>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'add',
  data: function() {
    return {
      habit: {},
      authToken: 'Token ' + this.getCookie('brokenChainsAuthToken'),
      csrfToken: this.getCookie('csrftoken'),
    }
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
    addNewHabit: function() {
      if (!this.habit.name || !this.habit.goal || !this.habit.stop_date) {
        console.log('Please fill all form fields');
      } else {
        let newHabit = {
          name: this.habit.name,
          goal: this.habit.goal,
          stop_date: this.habit.stop_date
        }

        this.$http.post('habits/',
          newHabit,
          {
            headers: {
              'Authorization': this.authToken,
              'X-CSRFToken': this.csrfToken,
            }
          }).then(
            (response) => {
              this.$router.push({path: '/habits', query: {alert: 'Habit Created'}});
            }
        );
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
