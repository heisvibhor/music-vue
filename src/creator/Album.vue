<template>
    <div class="container">
        <div class="row">
            <div v-if="id" class="col-sm">
                <div class="border border-1 p-1">
                    <table class="w-100 m-2">
                        <tr>
                            <td style="width:25%">
                                <img :src="imageUrl" height="80px" width="80px" style="object-fit: cover;">
                            </td>
                            <td class="p-1" style="height:1px">
                                <h5 class="h-50 text-left">
                                    {{ album.title }}
                                </h5>
                                <div class="h-50 text-left">
                                    {{ album.description }}
                                </div>
                            </td>
                        </tr>
                    </table>
                    <button class="btn btn-primary" v-on:click="save()" :disabled="!album.title">Save</button>
                    <button v-if="id" class="ml-2 btn btn-danger" v-on:click="deleteAlbum()">Delete</button>
                </div>
                <div v-if="id" class="mt-2" style="height:90vh; overflow-y: scroll">
                    <div v-for="(mc, index) in album_songs">
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
                        <MusicMedium :song="mc" :buttonFunction="addSong.bind({}, mc.song.id, mc.song)"></MusicMedium>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group mb-2">
                    <label for="aTitle" class="ml-2 m-1 float-left">Album Title</label>
                    <input id="aTitle" class="form-control" placeholder="Enter Title" v-model="album.title">
                </div>

                <div class="form-group mb-2">
                    <label for="adescription" class="ml-2 m-1 float-left">Album Description</label>
                    <input id="adescription" class="form-control" placeholder="Enter Description"
                        v-model="album.description">
                </div>

                <div class="form-group">
                    <label for="image" class="ml-2 m-1 text-left d-block">Cover Image</label>
                    <img v-if="image" :src="imageUrl" height="170" width="170px" class="float-left d-block ml-2 m-1"
                        style="object-fit: cover;">
                    <input type="file" @change="updatePhoto($event.target)" id="image" placeholder="Cover Image"
                        accept="image/*">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="save()"
                    :disabled="!album.title || !album.description">Save</button>
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
import Listen from '@/components/Listen.vue'

export default {
    name: 'Album',
    components: {
        MusicSmall,
        MusicMedium,
        Listen
    },
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    data() {
        return {
            id: undefined,
            album: {},
            album_songs: [],
            image: null,
            song_search: { title: '', language: 'All', genre: 'All', creator_id: this.$store.state.auth.user_id },
            languages: [],
            genres: [],
            songs: [],
        }
    },
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
    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
    },
    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.album.image = files.files[0]
        },
        fetch() {
            const res = this.get(`/album`, { album_id: this.id })
            res.then((r) => {
                this.album_songs = r.album.songs
                this.image = r.album.image
                this.album = r.album
                this.album.image = null
                this.album.songs = null
            })
        },
        addSong(song_id, song) {
            this.mutate('post', `/album/${this.id}/${song_id}`, {})
            this.album_songs.push(song)
        },
        deleteSong(song_id, index) {
            this.mutate('delete', `/album/${this.id}/${song_id}`, {})
            this.album_songs.splice(index, 1)
        },
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
        save() {
            if (this.id) {
                this.mutate('put', '/album/' + this.id, this.album).then(
                    (r) => {
                        this.album_songs = r.album.songs
                        this.image = r.album.image
                        this.album = r.album
                        this.album.songs = null
                        this.album.image = null
                    }
                )
            } else {
                this.mutate('post', '/album', this.album).then(
                    (r) => {
                        this.album_songs = r.album.songs
                        this.album = r.album
                        this.image = r.album.image
                        this.album.image = null
                        this.id = r.album.id
                        this.album.songs = null
                        router.push({ name: 'albumEdit', params: { id: this.album.id } })
                    }
                )
            }
        },
        deleteAlbum() {
            let text = "Are You Sure you want to delete";
            if (confirm(text) == true) {
                this.mutate('delete', '/album/' + this.id, {}).then(
                    (r) => {
                        router.push({ name: 'CreatorHome' })
                    }
                )
            }
        }
    },
}

</script>