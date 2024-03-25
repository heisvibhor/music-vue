import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from './views/HomeView.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import store from './store'
import HomePage from './user/Home.vue'
import User from './user/User.vue'
import Song from './creator/Song.vue'
import Creator from './creator/Creator.vue'
import CreatorHome from './creator/Home.vue'
import Playlist from './user/Playlist.vue'
import Listen from './user/Listen.vue'
import Admin from './admin/Admin.vue'

Vue.use(VueRouter)

const checkLogin = (to, from, next) => {
  if (store.getters.is_logged_in) {
    next()
  } else {
    next({ name: 'home' })
  }
}

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "about",
    beforeEnter: checkLogin,
    component: () =>
      import("./views/AboutView.vue"),
  },
  {
    path: "/",
    name: "user",
    component: User,
    beforeEnter: checkLogin,
    children: [
      { path: 'home', component: HomePage },
      { path: 'playlist/:id', component: Playlist, name: 'playlist' },
      { path: 'listen/:id', component: Listen, name: "listen" },
      {
        path: 'album/:id', component: () =>
          import("./user/Album.vue"), name: "albumView"
      },
      {
        path: 'profile', component: () =>
          import("./user/Profile.vue"), name: "profile"
      },
      {
        path: 'creatorprofile/:type', component: () =>
          import("./user/Creator.vue"), name: "creatorProfile"
      },
      {
        path: 'songsearch', component: () =>
          import("./user/SongSearch.vue"), name: "userSongSearch"
      },
    ],
  },
  {
    path: "/creator/",
    name: "creator",
    component: Creator,
    beforeEnter: checkLogin,
    children: [
      { path: 'home', component: CreatorHome, name: "CreatorHome" },
      { path: 'song/:id', component: Song, name: "song" },
      {
        path: 'album/:id', component: () =>
          import("./creator/Album.vue"), name: "albumEdit"
      },
    ],
  },
  {
    path: "/admin/",
    name: "admin",
    component: Admin,
    beforeEnter: checkLogin,
    children: [
      {
        path: 'album/:id', component: () =>
          import("./admin/AlbumSearch.vue"), name: "adminAlbumSearch"
      },
      {
        path: 'creator', component: () =>
          import("./admin/CreatorSearch.vue"), name: "creatorSearch"
      },
      {
        path: 'songsearch', component: () =>
          import("./admin/SongSearch.vue"), name: "adminSongSearch"
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
