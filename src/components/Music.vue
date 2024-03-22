<template>
    <div class="container border border-1 pt-1">
        <div class="m-auto" v-on:click="push">
            <img :src="imagePath" style="width: 160px; height: 160px; object-fit: contain;">
        </div>
        <div class="">
            <b-badge variant="warning" class="ml-1">{{ song.song.genre }}</b-badge>
            <b-badge variant="info" class="ml-1">{{ song.song.language }}</b-badge>
            <b-badge variant="success" class="ml-1">{{ song.song.views }} Views</b-badge>
            <b-badge class="ml-1">{{ handleNull(song.rating) }} Star</b-badge>
            <b-badge variant="danger" class="ml-1">{{ handleNull(song.likes) }} Likes</b-badge>
            <div class="mt-3" style="width: 200px;">
                <table class="mb-2">
                    <tr>
                        <td>
                            <img :src="creatorPath" height="30px" width="30px"
                                style="object-fit: cover; border-radius: 30px;">
                        </td>
                        <td class="px-1">
                            {{ song.song.creator.artist }}
                        </td>
                        <td colspan="2"></td>
                    </tr>

                </table>
                <h5>{{ song.song.title }}</h5>
            </div>

        </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
    name: 'Music',
    props: {
        song: {},
    },
    computed: {
        imagePath() {
            if (this.song) {
                return process.env.VUE_APP_API + '/image/' + this.song.song.image
            }
            return process.env.VUE_APP_API + '/image/' + undefined
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.song.creator.image
        },
    },
    methods: {
        push() {
            router.push({ path: '/listen/' + this.song.song.id })
        },
        handleNull(val){
            if (!val){
                return 0
            } 
            return val
        }
    }
}


</script>
