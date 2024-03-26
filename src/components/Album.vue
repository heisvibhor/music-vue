<template>
    <div class="container border border-1 pt-1">
        <div class="m-auto" v-on:click="route">
            <img :src="imagePath" style="width: 160px; height: 160px; object-fit: contain;">
        </div>
        <div class="">
            <div style="word-wrap: break-word;">
                <b-badge variant="success" class="mr-1" v-if="album.songs">{{ album.songs.length }} Songs</b-badge> {{
            album.description }}
            </div>
            <div class="mt-3" style="width: 200px;">
                <table class="mb-2">
                    <tr>
                        <td>
                            <img :src="creatorPath" height="30px" width="30px"
                                style="object-fit: cover; border-radius: 30px;">
                        </td>
                        <td class="px-1">
                            {{ album.creator.artist }}
                        </td>
                        <td colspan="2"></td>
                    </tr>

                </table>
                <h5>{{ album.title }}</h5>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Album',
    props: {
        album: {},
    },
    computed: {
        imagePath() {
            if (this.album.image) {
                return process.env.VUE_APP_API + '/image/' + this.album.image
            }
            return process.env.VUE_APP_API + '/image/' + undefined
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.album.creator.image
        },
    },
    methods: {
        route() {
            window.open('/album/' + this.album.id, '_blank')
        }
    }
}


</script>
