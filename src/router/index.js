import Vue from 'vue'
import Router from 'vue-router'
import Habits from '@/components/Habits'
import About from '@/components/About'
import Login from '@/components/Login'
import Add from '@/components/Add'
import Signup from '@/components/Signup'
import HabitDetail from '@/components/HabitDetail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/habits', name: 'habits', component: Habits},
    {path: '/habits/:id', name: 'habitDetail', component: HabitDetail},
    {path: '/about', name: 'about', component: About},
    {path: '/login', name: 'login', component: Login},
    {path: '/add', name: 'add', component: Add},
    {path: '/signup', name: 'signup', component: Signup},
  ]
})
