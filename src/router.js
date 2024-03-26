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
    next({ name: 'login' })
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
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      store.commit('logout')
      next({ name: 'login' })
    }
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
    component: User,
    beforeEnter: checkLogin,
    children: [
      { path: '', redirect: 'home', name: "user",},
      { path: 'home', component: HomePage, name: 'home' },
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
      {
        path: 'albumSearch', component: () =>
          import("./user/AlbumSearch.vue"), name: "userAlbumSearch"
      },
    ],
  },
  {
    path: "/creator/",
    component: Creator,
    beforeEnter: checkLogin,
    children: [
      { path: '', redirect: 'home', name: "creator",},
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
    component: Admin,
    beforeEnter: checkLogin,
    children: [
      { path: '', redirect: 'home', name: "admin",},
      {
        path: 'albumSearch', component: () =>
          import("./admin/AlbumSearch.vue"), name: "adminAlbumSearch"
      },
      {
        path: 'creatorSearch', component: () =>
          import("./admin/CreatorSearch.vue"), name: "creatorSearch"
      },
      {
        path: 'songsearch', component: () =>
          import("./admin/SongSearch.vue"), name: "adminSongSearch"
      },
      {
        path: 'genre', component: () =>
          import("./admin/Genre.vue"), name: "genre"
      },
      {
        path: 'language', component: () =>
          import("./admin/Language.vue"), name: "language"
      },
      {
        path: 'home', component: () =>
          import("./admin/Home.vue"), name: "adminHome"
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
