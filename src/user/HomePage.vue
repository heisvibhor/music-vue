<template>
  <div class="home">
    {{ hello }}
    <Music :music="hello"></Music>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Music from '@/components/Music.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Music
  },
  data() {
    return {
      hello: { name: "fhgjk" },
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
      this.albums= res.albums
      this.top_rated= res.top_rated
      this.top_views= res.top_views
      this.recently_added= res.recently_added
      this.playlists= res.playlists
    })
  }
}
</script>