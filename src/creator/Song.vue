<template>
    <div class="home">
        <div class="container">
            <div class="row gap-1">
                <div class="col-sm">
                </div>

                <div class="col-sm-4 border border-dark rounded py-2">
                    <div class="form-group mb-2">
                        <label for="Title" class="ml-2 m-1 float-left">Song Title</label>
                        <input id="Title" class="form-control" placeholder="Enter Title" v-model="song.title">
                    </div>

                    <div class="form-group mb-2">
                        <label for="description" class="ml-2 m-1 float-left">Song Description</label>
                        <input id="description" class="form-control" placeholder="Enter Description"
                            v-model="song.description">
                    </div>

                    <div class="form-group">
                        <label for="image" class="ml-2 m-1 text-left d-block">Cover Image</label>
                        <img v-if="image" :src="imageUrl" height="170" width="170px" class="float-left d-block ml-2 m-1"
                            style="object-fit: cover;">
                        <input type="file" @change="updatePhoto($event.target)" id="image" placeholder="Cover Image"
                            accept="image/*">
                    </div>
                    <div class="form-group">
                        <label class="ml-2 m-1 text-left d-block">Audio</label>
                        <audio controls v-if="audio" style="width: 300px;">
                            <source :src="audioUrl">
                        </audio>
                        <input type="file" @change="updateAudio($event.target)" id="image" placeholder="Audio" 
                            accept="audio/*">
                    </div>
                    <div class="form-group mb-2">
                        <label class="ml-2 m-1 float-left">Song Language</label>
                        <select class="form-select form-control" v-model="song.language">
                            <option v-for="lang in languages" :value="lang.name">
                                {{ lang.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="ml-2 m-1 float-left">Genre</label>
                        <select class="form-select form-control" v-model="song.genre">
                            <option v-for="gen in genres" :value="gen.name">
                                {{ gen.name }}
                            </option>
                        </select>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" v-on:click="save()"
                        :disabled="!song.title || !song.genre || !song.language || !(song.lyrics || song.audio)">Save</button>
                    <button v-if="id" type="submit" class="ml-2 btn btn-danger"
                        v-on:click="deleteSong()">Delete</button>
                </div>

                <div class="col-sm-4 border border-dark rounded px-1 py-2">
                    <div class="form-group">
                        <label class="ml-2 m-1 text-start d-block">Lyrics</label>
                        <textarea name="lyrics" placeholder="Enter lyrics" v-model="song.lyrics" class="form-control"
                            style="white-space: pre-wrap;" :rows="rows">{{ song.lyrics }}</textarea>
                    </div>

                </div>
                <div class="col-sm">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
    name: 'Song',
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    data() {
        return {

            id: undefined,
            song: {},
            image: null,
            audio: null,
            languages: [],
            genres: [],
        }
    },

    async mounted() {
        if (this.$route.params.id && this.$route.params.id != "new") {
            this.id = this.$route.params.id
            this.fetch()
        }
        const lan = this.get("/language")
        lan.then((r) => {
            this.languages = r.languages
        })
        const gen = this.get("/genre")
        gen.then((r) => {
            this.genres = r.genres
        })
    },

    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
        audioUrl() {
            return process.env.VUE_APP_API + '/audio/' + this.audio;
        },
        rows() {
            let h = 20
            if (this.audio) {
                h += 5
            }
            if (this.image) {
                h += 5
            }
            return h
        }
    },

    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.song.image = files.files[0]
        },
        updateAudio(files) {
            if (!files) return;
            this.song.audio = files.files[0]
        },

        fetch() {
            const res = this.get("/song", { song_id: this.id })
            res.then((r) => {
                this.song = r.song
                this.image = r.song.image
                this.audio = r.song.audio
                this.song.image = null
                this.song.audio = null
            })
        },
        save() {
            console.log(this.song)
            if (this.id) {
                this.mutate('put', '/song/' + this.id, this.song).then(
                    (r) => {
                        this.song = r.song
                        this.image = r.song.image
                        this.audio = r.song.audio
                        this.song.image = null
                        this.song.audio = null
                    }
                )
            } else {
                this.mutate('post', '/song', this.song).then(
                    (r) => {
                        this.song = r.song
                        this.image = r.song.image
                        this.audio = r.song.audio
                        this.song.image = null
                        this.song.audio = null
                        router.push({ name: 'song', params: { id: this.song.id } })
                    }
                )
            }
        },
        deleteSong() {
            let text = "Are You Sure you want to delete";
            if (confirm(text) == true) {
                this.mutate('delete', '/song/' + this.id, {}).then(
                    (r) => {
                        router.push({ name: 'CreatorHome' })
                    }
                )
            }
        }
    }
}
</script>