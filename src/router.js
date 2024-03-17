import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from './views/HomeView.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import store from './store'
import HomePage from './user/HomePage.vue'
import User from './user/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component :Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    beforeEnter: (to, from, next) => {
      if (store.getters.is_logged_in) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    component: () =>
      import("./views/AboutView.vue"),
  },
  {
    path: "/",
    name: "user",
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if (store.getters.is_logged_in) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    children: [
        {path: 'home', component: HomePage},
      ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
