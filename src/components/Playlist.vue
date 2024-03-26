<template>
    <div class="playlist border border-1">
        <table class="w-100" @click="route()">
            <tr>
                <td style="width:25%" rowspan="3">
                    <div>
                        <img :src="imagePath" height="80px" width="80px" style="object-fit: cover;">
                    </div>
                </td>

                <td class="p-1" style="height:1px">
                    <div class="text-left" style="font-size: large;">
                        {{ playlist.title }}
                    </div>
                </td>
            </tr>
            <tr>
                <td class="text-left">
                    <b-badge variant="success" class="mr-1 m-1" v-if="playlist.songs">{{ playlist.songs.length }}
                        Songs</b-badge>
                </td>
            </tr>

            <tr>
                <td class="text-left ">
                    <div class="ml-1">
                    {{ playlist.description }}</div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Playlists',

    props: {
        playlist: {},
    },
    computed: {
        imagePath() {
            if (this.playlist.image) {
                return process.env.VUE_APP_API + '/image/' + this.playlist.image
            }
            return process.env.VUE_APP_API + '/image/' + undefined
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.playlist.creator.image
        }
    },
    methods: {
        route() {
            window.open('/playlist/' + this.playlist.id, '_blank')
        }
    }
}


</script>
