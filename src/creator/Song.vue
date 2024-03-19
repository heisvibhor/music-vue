<template>
    <div class="home">
        <div class="container">
            <div class="row gap-1">
                <div class="col-sm">
                </div>

                <div class="col-sm-4 border border-dark rounded py-2">
                    <div class="form-group mb-2">
                        <label for="Title" class="ms-2 m-1 float-start">Song Title</label>
                        <input type="Title" id="Title" class="form-control" placeholder="Enter Title"
                            v-model="song.title">
                    </div>

                    <div class="form-group mb-2">
                        <label for="description" class="ms-2 m-1 float-start">Song Description</label>
                        <input type="description" id="description" class="form-control" placeholder="Enter Description"
                            v-model="song.description">
                    </div>

                    <div class="form-group">
                        <label for="image" class="ms-2 m-1 text-start d-block">Cover Image</label>
                        <img v-if="image" :src="imageUrl" height="170" width="170px"
                            class="float-start d-block ms-2 m-1" style="object-fit: cover;">
                        <input type="file" @change="updatePhoto($event.target)" id="image" placeholder="Profile File"
                            accept="image/*">
                    </div>
                    <div class="form-group">
                        <label class="ms-2 m-1 text-start d-block">Audio</label>
                        <audio controls v-if="audio" style="width: 300px;">
                            <source :src="audioUrl">
                        </audio>
                        <input type="file" @change="updateAudio($event.target)" id="image" placeholder="Profile File"
                            accept="audio/*">
                    </div>
                    <div class="form-group mb-2">
                        <label class="ms-2 m-1 float-start">Song Language</label>
                        <select class="form-select form-control" v-model="song.language">
                            <option v-for="lang in languages" :value="lang.name">
                                {{ lang.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label class="ms-2 m-1 float-start">Genre</label>
                        <select class="form-select form-control" v-model="song.genre">
                            <option v-for="gen in genres" :value="gen.name">
                                {{ gen.name }}
                            </option>
                        </select>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" v-on:click="getOtp()"
                        :disabled="!song.email || !song.name || !song.language">Get OTP</button>
                    
                </div>

                <div class="col-sm-4 border border-dark rounded px-1 py-2">
                    <div class="form-group">
                        <label class="ms-2 m-1 text-start d-block">Lyrics</label>
                        <textarea name="lyrics" placeholder="Enter lyrics" v-model="song.lyrics"
                        class="form-control" style="white-space: pre-wrap;" :rows="rows">{{ song.lyrics }}</textarea>
                    </div>
                    
                </div>
                <div class="col-sm">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Song',
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

    },

    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
        audioUrl() {
            return process.env.VUE_APP_API + '/audio/' + this.audio;
        },
        rows(){
            let h = 20
            if (this.audio){
                h+=5
            } 
            if (this.image){
                h+=5
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
            const res = this.$api.get(this.$root, "/song", { song_id: this.id })
            res.then((r) => {
                this.song = r.song
                this.image = r.song.image
                this.audio = r.song.audio
                this.song.image = null
                this.song.audio = null
            })
            const lan = this.$api.get(this.$root, "/language")
            lan.then((r) => {
                this.languages = r.languages
            })
            const gen = this.$api.get(this.$root, "/genre")
            gen.then((r) => {
                this.genres = r.genres
            })
        }
    }
}
</script>