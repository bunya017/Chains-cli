import Vue from 'vue'
import Router from 'vue-router'
import Habits from '@/components/Habits'
import About from '@/components/About'
import Login from '@/components/Login'
import Add from '@/components/Add'
import Signup from '@/components/Signup'
import HabitDetail from '@/components/HabitDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/habits',
      name: 'habits',
      component: Habits,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/habits/:id',
      name: 'habitDetail',
      component: HabitDetail,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/add',
      name: 'addHabit',
      component: Add,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/',
      name: 'home',
      component: Habits,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let userAuthenticated = function() {
    return JSON.parse(localStorage.getItem('isLoggedIn'))
  }
  if (to.meta.requiresAuth && !userAuthenticated()) {
    next('/login');
  } else {
    next();
    console.log(!userAuthenticated())
  }
})

export default router
