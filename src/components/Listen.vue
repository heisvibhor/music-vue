<template>
    <div class="listen container">
        <div class="row">
            <div class="col-sm">
                <img :src="imagePath" height="200px" width="200px" class="m-1 float-left" style="object-fit: cover;">
            </div>
            <div class="col-sm-8">
                <div class="h-50">
                    <h3 class="text-left">{{ song.title }}</h3>
                    <p class="text-left">{{ song.description }}</p>
                </div>

                <div class="h-25 text-left">
                    <img v-if="song.creator" :src="creatorPath" height="25px" width="25px"
                        style="object-fit: cover; border-radius: 25px;">
                    <span class="ml-2" v-if="song.creator">{{ song.creator.artist }}</span>
                </div>

                <div class="h-25 text-left">
                    <b-badge variant="warning" class="ml-1">{{ song.genre }}</b-badge>
                    <b-badge variant="info" class="ml-1">{{ song.language }}</b-badge>
                    <b-badge variant="success" class="ml-1">{{ song.views }} Views</b-badge>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-sm">
                <audio controls v-if="song.audio" style="width:250px">
                    <source :src="audioPath">
                </audio>
                <div class="mt-2">
                    <div v-if="!songlike.like" class="d-inline" @click="songlike.like = true; updateRating()">
                        <b-avatar icon="hand-thumbs-up" variant="light" size="2rem"></b-avatar>
                    </div>
                    <div v-if="songlike.like" class="d-inline" @click="songlike.like = false; updateRating()">
                        <b-avatar icon="hand-thumbs-up-fill" variant="info" size="2rem"></b-avatar>
                    </div>

                    <b-form-rating variant="warning" inline :value="songlike.rating" @change="updateRating" class="ml-2"
                        v-model="songlike.rating"></b-form-rating>

                </div>
            </div>
            <div class="col-sm-6" v-if="song.lyrics">
                <h5>
                    Lyrics
                </h5>
                <div name="lyrics" placeholder="Enter lyrics" style="white-space: pre-wrap;" rows="30" cols="30">{{
                    song.lyrics }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Listen',

    props: {
        id: undefined,
    },
    data() {
        return {
            likes: 0,
            rating: 0,
            song: {},
            songlike: {},
        }
    },
    async mounted() {
        if (this.id) {
            this.fetch()
        }
    },

    computed: {
        imagePath() {
            return process.env.VUE_APP_API + '/image/' + this.song.image
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.creator.image
        },
        audioPath() {
            return process.env.VUE_APP_API + '/audio/' + this.song.audio
        }
    },
    methods: {
        updateRating() {
            console.log(this.songlike.rating)
            this.$api.mutate(this.$root, 'put', `/like_rate/${this.id}`, this.songlike).then(
                (r) => {
                    this.songlike = r.songlike
                }
            )
        },
        fetch() {
            const res = this.$api.get(this.$root, "/song", { song_id: this.id })
            res.then((r) => {
                this.song = r.song
                setTimeout(this.addView, 60000)
                // after one minute
            })
            const r1 = this.$api.get(this.$root, `/like_rate/${this.id}`)
            r1.then((r) => {
                this.songlike = r.songlike
            })
        },
        addView() {
            const res = this.$api.get(this.$root, `/view/${this.id}`)
        }
    },
    watch: {
        id(val, prev) {
            if (val != prev) {
                this.fetch()
            }
        }
    }
}


</script>
