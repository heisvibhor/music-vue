<template>
  <div>
    <div class="text-center">
      <div class="container-fluid row">
        <div class="col">
          1 of 3
        </div>
        <div class="col-9">
          <div class="d-flex flex-row" style="overflow-x: scroll;">
            <div v-for="mc in top_rated">
              <Music :song="mc"></Music>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Music from '@/components/Music.vue'
export default {
  name: 'HomeView',
  components: {
    Music
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
    const res = this.$api.get(this.$root, "/home")
    res.then((r) => {
      console.log(r)
      this.albums = r.albums
      this.top_rated = r.top_rated
      this.top_views = r.top_views
      this.recently_added = r.recently_added
      this.playlists = r.playlists
    })
  }
}
</script>