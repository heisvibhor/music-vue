<template>
  <div>
    <router-view></router-view>
    <div class="text-center">
      <div class="container-fluid row">
        <div class="col">
          <div class="border p-1 text-left pl-3">
            <router-link to="/playlist/new" style="text-decoration: none;">
              <div style="font-size: large; color: black;">
                Playlists

              </div>
              <div>
                Click to create new playlist
              </div>
            </router-link>
          </div>

          <div v-for="playlist in playlists">
            <Playlist :playlist="playlist"></Playlist>
          </div>
        </div>
        <div class="col-9">
          <h4 class="text-left mt-2">Top Rated Songs</h4>
          <div class="d-flex flex-row" style="overflow-x: scroll;">
            <div v-for="mc in top_rated">
              <Music :song="mc"></Music>
            </div>
          </div>

          <h4 class="text-left mt-2">Recently Added Songs</h4>
          <div class="d-flex flex-row" style="overflow-x: scroll;">
            <div v-for="mc in recently_added">
              <Music :song="mc"></Music>
            </div>
          </div>

          <h4 class="text-left mt-2">Top Viewed Songs</h4>
          <div class="d-flex flex-row" style="overflow-x: scroll;">
            <div v-for="mc in top_views">
              <Music :song="mc"></Music>
            </div>
          </div>

          <h4 class="text-left mt-2">Albums</h4>
          <div class="d-flex flex-row" style="overflow-x: scroll;">
            <div v-for="al in albums">
              <Album :album="al"></Album>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Music from '@/components/Music.vue'
import Playlist from '@/components/Playlist.vue'
import Album from '@/components/Album.vue'

export default {
  inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
  name: 'HomeView',
  components: {
    Music,
    Playlist,
    Album
  },
  data() {
    return {
      albums: [],
      top_rated: [],
      top_views: [],
      recently_added: [],
      playlists: []
    }
  },

  async mounted() {
    const res = this.get("/home")
    res.then((r) => {
      this.albums = r.albums
      this.top_rated = r.top_rated
      this.top_views = r.top_views
      this.recently_added = r.recently_added
      this.playlists = r.playlists
    })
  }
}
</script>