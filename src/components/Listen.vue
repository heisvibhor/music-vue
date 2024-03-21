<template>
    <div class="listen">
        <div class="col-sm">
            <img v-if="image" :src="imageUrl" height="200px" width="200px" class="m-1"
                            style="object-fit: cover;">
            
        </div>
        <div class="col-sm">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Listen',

    props: {
        id: undefined,
        likes: 0,
        rating: 0,
        song: {},
    },
    async mounted() {
        if (this.id) {
            const res = this.$api.get(this.$root, "/song", { song_id: this.id })
            res.then((r) => {
                this.song = r.song
                
                
            })
        }
    },

    computed: {
        imagePath() {
            return process.env.VUE_APP_API + '/image/' + this.song.image
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.creator.image
        }
    },
}


</script>
