<template>
    <div class="search container">
        <div class="row">
            <div class="col-sm">

            </div>
            <div class="col-sm-6">
                <table>
                    <tr>
                        <td>
                            Song Title
                        </td>
                        <td>
                            Language
                        </td>
                        <td>
                            Genre
                        </td>
                    </tr>
                    <tr>
                        <input class="form-control" placeholder="Enter Title Name" v-model="song_search.description">
                        <td>
                            <select class="form-select form-control" v-model="song_search.language">
                                <option v-for="lang in languages" :value="lang.name">
                                    {{ lang.name }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <select class="form-select form-control" v-model="song_search.genre">
                                <option v-for="gen in genres" :value="gen.name">
                                    {{ gen.name }}
                                </option>
                            </select>
                        </td>
                        <td><b-button v-on:click="searchSong()"
                                variant="outline-info"><b-icon-search></b-icon-search></b-button>
                        </td>
                    </tr>
                </table>
                <div style="height:90vh; overflow-y: auto">
                    <div v-for="mc in songs">
                        <MusicMedium :song="mc">
                        </MusicMedium>
                    </div>
                </div>
            </div>
            <div class="col-sm">

            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            languages: [],
            genres: [],
            songs: [],
            song_search: {}
        }
    },
    components: {
        MusicMedium,
    },
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    mounted() {
        if (this.$route.params.id && this.$route.params.id != "new") {
            this.id = this.$route.params.id
            this.fetch()
        }
        const lan = this.get("/language")
        lan.then((r) => {
            this.languages = [{ name: 'All' }, ...r.languages]
        })
        const gen = this.get("/genre")
        gen.then((r) => {
            this.genres = [{ name: 'All' }, ...r.genres]
        })
    },
    methods: {
        searchSong() {
            if (this.song_search.language == 'All') {
                this.song_search.language = null
            }
            if (this.song_search.genre == 'All') {
                this.song_search.genre = ''
            }
            this.get("/song", this.song_search).then(
                (r) => {
                    this.songs = r.data
                }
            )
        },
    }
}
</script>