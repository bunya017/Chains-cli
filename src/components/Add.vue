<template>
  <div class="add container">
    <div class="col-sm-8 col-md-6 mx-auto my-5">
      <div class="card card-body shadow-lg border-0 rounded-0" style="background-color: #ebf0f3;">
        <form class="" v-on:submit.prevent="addNewHabit">
          <h2 class="text-center py-1">NEW HABIT</h2>
          <Alert v-if="habitExist" :message="habitExist" :class="'alert-danger'" :dismiss="dismissHabitExist" />
          <div class="form-group">
            <label>Name <small class="font-italic text-danger">(required)</small></label>
            <input type="text" class="form-control rounded-0" placeholder="Name of new habit" v-model="habit.name">
            <div class="bg-light my-1" style="border-left: 4px solid #e43545 !important;">
              <small class="ml-3 text-danger font-weight-bold" v-if="nameError">{{ nameError }}</small>
            </div>
          </div>
          <div class="form-group">
            <label>Goal <small class="font-italic text-danger">(required)</small></label>
            <input type="text" class="form-control rounded-0" placeholder="Goal statement" v-model="habit.goal">
            <div class="bg-light my-1" style="border-left: 4px solid #e43545 !important;">
              <small class="ml-3 text-danger font-weight-bold" v-if="goalError">{{ goalError }}</small>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Start date <small class="font-italic">(optional)</small></label>
              <input type="date" class="form-control rounded-0" v-model="habit.start_date">
              <small class="font-italic form-text text-muted">Set to today by default.</small>
            </div>
            <div class="form-group col">
              <label>Stop date <small class="font-italic">(optional)</small></label>
              <input type="date" class="form-control rounded-0" v-model="habit.stop_date">
              <small class="font-italic form-text text-muted">Set to 21 days from today by default.</small>
            </div>
          </div>
          <div class="py-3">
            <button type="submit" class="btn btn-info btn-lg rounded-0 shadow" @click="dismissAddError">Add new habit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'add',
  data: function() {
    return {
      habit: {
        // set default to today
        start_date: new Date().toISOString().slice(0, 10),
        // set default to 21 days from today
        stop_date: new Date(new Date().getTime() + (21 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10)
      },
      authToken: this.getAuthToken(),
      csrfToken: this.getCookie('csrftoken'),
    }
  },
  components : {
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
    getAuthToken: function() {
      return localStorage.getItem('auth_token')
    },
    addNewHabit: function() {
      let newHabit = {
        name: this.habit.name,
        goal: this.habit.goal,
        stop_date: this.habit.stop_date,
        start_date: this.habit.stop_date
      }

      this.$http.post('habits/',
        newHabit,
        {
          headers: {
            'Authorization': 'Token ' + this.authToken,
            'X-CSRFToken': this.csrfToken,
          }
        }).then(
          (response) => {
            console.log('response:', response.body)
          },
          (error) => {
            if(error.status === 403) {
              this.$store.dispatch('setHabitExistError', error.body.detail)
            } else {
              this.$store.dispatch('setAddError', error.body)
            }
      });
    },
    dismissAddError: function() {
      return this.$store.commit('dismissAddError')
    },
    dismissHabitExist: function() {
      return this.$store.commit('dismissHabitExistError')
    }
  },
  computed: {
    nameError: function() {
      return this.$store.state.nameAddError
    },
    goalError: function() {
      return this.$store.state.goalAddError
    },
    habitExist: function() {
      return this.$store.state.habitExistError
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
