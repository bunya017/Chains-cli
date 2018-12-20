import Vue from 'vue'
import Router from 'vue-router'
import Habits from '@/components/Habits'
import About from '@/components/About'
import Login from '@/components/Login'
import Add from '@/components/Add'
import Signup from '@/components/Signup'
import HabitDetail from '@/components/HabitDetail'
import NotFound from '@/components/NotFound'

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
        title: 'Habits | Broken Chains',
        requiresAuth: true,
      }
    },
    {
      path: '/habits/:id',
      name: 'habitDetail',
      component: HabitDetail,
      meta: {
        title: 'Habits | Broken Chains',
        requiresAuth: true,
      }
    },
    {
      path: '/add',
      name: 'addHabit',
      component: Add,
      meta: {
        title: 'New Habit | Broken Chains',
        requiresAuth: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About | Broken Chains',
        requiresAuth: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login | Broken Chains',
        requiresAuth: false,
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        title: 'Signup | Broken Chains',
        requiresAuth: false,
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
      meta: {
        title: 'Not Found | Broken Chains',
        requiresAuth: false,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let userAuthenticated = function() {
    return JSON.parse(localStorage.getItem('isLoggedIn'))
  }
  if (to.meta.requiresAuth && !userAuthenticated()) {
    next('/login')
  } else if (userAuthenticated() && (to.path === '/login')) {
    next('/habits')
  } else {
    next()
  }
})

router.afterEach((to) => {
document.title = to.meta.title;
})

export default router
