<template>
    <div class="container">
        <div class="play container" v-if="(tab == 'play' && id)">
            <div class="col-sm">
                <div v-for="mc in playlist_songs">
                    <MusicSmall :song="mc" ></MusicSmall>
                </div>
            </div>
            <div class="col-sm-6">
                <button v-if="current_song_id" class="ml-2 btn btn-danger"
                    v-on:click="deleteSong(current_song_id)">Delete
                    Song</button>
                <Listen v-if="current_song_id" :id="current_song_id"></Listen>
                <span v-if="!playlist_songs.length">
                    Add Songs to Listen
                    <button class="btn btn-primary" v-on:click="tab = 'edit'">Add Songs</button>
                </span>
            </div>
        </div>
        <div class="edit row" v-else-if="tab == 'edit'">
            <div class="col-sm">
                <div class="border border-1 p-1">
                    <table class="w-100 m-2">
                    <tr>
                        <td style="width:25%">
                            <img :src="imageUrl" height="80px" width="80px" style="object-fit: cover;">
                        </td>
                        <td class="p-1" style="height:1px">
                            <h5 class="h-50 text-left">
                                {{ playlist.title }}
                            </h5>
                            <div class="h-50 text-left">
                                {{ playlist.description }}
                            </div>
                        </td>
                    </tr>
                </table>
                <button class="btn btn-primary" v-on:click="save()" :disabled="!playlist.title">Save</button>
                <button v-if="id" class="ml-2 btn btn-warning" v-on:click="deletePlaylist()">Close Edits</button>
                <button v-if="id" class="ml-2 btn btn-danger" v-on:click="deletePlaylist()">Delete</button>
                </div>
                <div v-if="id" class="mt-2" style="height:90vh; overflow-y: scroll">
                    <div v-for="(mc, index) in playlist_songs">
                        <MusicSmall :song="mc" :deleteFunction="deleteSong.bind({}, mc.id, index)"></MusicSmall>
                    </div>
                </div>
            </div>
            <div v-if="!id" class="col-sm">

            </div>
            <div v-if="id" class="col-sm-4">
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
                        <MusicMedium :song="mc" :add-function="addSong.bind({}, mc.song.id, mc.song)"></MusicMedium>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group mb-2">
                    <label for="Title" class="ml-2 m-1 float-left">Playlist Title</label>
                    <input id="pTitle" class="form-control" placeholder="Enter Title" v-model="playlist.title">
                </div>

                <div class="form-group mb-2">
                    <label for="pdescription" class="ml-2 m-1 float-left">Playlist Description</label>
                    <input id="pdescription" class="form-control" placeholder="Enter Description"
                        v-model="playlist.description">
                </div>

                <div class="form-group">
                    <label for="image" class="ml-2 m-1 text-left d-block">Cover Image</label>
                    <img v-if="image" :src="imageUrl" height="170" width="170px" class="float-left d-block ml-2 m-1"
                        style="object-fit: cover;">
                    <input type="file" @change="updatePhoto($event.target)" id="image" placeholder="Cover Image"
                        accept="image/*">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="save()"
                    :disabled="!playlist.title">Save</button>
            </div>
            <div v-if="!id" class="col-sm">

            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
import MusicSmall from '@/components/MusicSmall.vue'
import MusicMedium from '@/components/MusicMedium.vue'
export default {
    name: 'Song',
    components: {
        MusicSmall,
        MusicMedium
    },
    data() {
        return {
            tab: 'edit',
            id: undefined,
            playlist: {},
            playlist_songs: [],
            image: null,
            song_search: { title: '', language: 'All', genre: 'All' },
            current_song_id: null,
            languages: [],
            genres: [],
            songs: []
        }
    },
    async mounted() {
        if (this.$route.params.id && this.$route.params.id != "new") {
            this.id = this.$route.params.id
            this.fetch()
        }
        const lan = this.$api.get(this.$root, "/language")
        lan.then((r) => {
            this.languages = [{ name: 'All' }, ...r.languages]
        })
        const gen = this.$api.get(this.$root, "/genre")
        gen.then((r) => {
            this.genres = [{ name: 'All' }, ...r.genres]
        })
    },
    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
    },
    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.playlist.image = files.files[0]
        },
        fetch() {
            const res = this.$api.get(this.$root, `/playlist/${this.id}`, {})
            res.then((r) => {
                this.playlist_songs = r.playlist.songs
                this.image = r.playlist.image
                this.playlist = r.playlist
                this.playlist.image = null
                console.log(this.playlist_songs)
            })
        },
        addSong(song_id, song) {
            this.$api.mutate(this.$root, 'post', `/playlist/${this.id}/${song_id}`, {})
            this.playlist_songs.push(song)
        },
        deleteSong(song_id, index) {
            this.$api.mutate(this.$root, 'delete', `/playlist/${this.id}/${song_id}`, {})
            this.playlist_songs.splice(index, 1)
        },
        searchSong() {
            if (this.song_search.language == 'All') {
                this.song_search.language = null
            }
            if (this.song_search.genre == 'All') {
                this.song_search.genre = ''
            }
            this.$api.get(this.$root, "/song", this.song_search).then(
                (r) => {
                    this.songs = r.data
                }
            )
        },
        save() {
            if (this.id) {
                this.$api.mutate(this.$root, 'put', '/playlist/' + this.id, this.playlist).then(
                    (r) => {
                        this.playlist_songs = r.playlist.songs
                        this.image = r.playlist.image
                        this.playlist = r.playlist
                        this.playlist.image = null
                    }
                )
            } else {
                this.$api.mutate(this.$root, 'post', '/playlist', this.playlist).then(
                    (r) => {
                        this.playlist_songs = r.playlist.songs
                        this.playlist = r.playlist
                        this.image = r.playlist.image
                        this.playlist.image = null
                        this.id = r.playlist.id
                        router.push({ name: 'playlist', params: { id: this.playlist.id } })
                    }
                )
            }
        },
        deletePlaylist() {
            let text = "Are You Sure you want to delete";
            if (confirm(text) == true) {
                this.$api.mutate(this.$root, 'delete', '/playlist/' + this.id, {}).then(
                    (r) => {
                        router.push({ name: 'home' })
                    }
                )
            }
        }
    },
}

</script>