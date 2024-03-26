<template>
    <div class="album-horizontal border border-1">
        <table class="w-100">
            <tr>
                <td style="width:25%" rowspan="3">
                    <div @click="route()">
                        <img :src="imagePath" height="80px" width="80px" style="object-fit: cover;">
                    </div>
                </td>

                <td class="p-1" style="height:1px">
                    <div @click="route()" class="text-left" style="font-size: large;">
                        {{ album.title }}
                    </div>
                </td>
                <td style="width:15%" v-if="buttonFunction" rowspan="3">
                    <div @click="buttonFunction()" class="text-left">
                        <b-avatar :icon="buttonIcon" :variant="buttonVariant" size="2.1rem"></b-avatar>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="text-left">
                    <b-badge variant="success"  class="mr-1 m-1" v-if="album.songs">{{ album.songs.length }} Songs</b-badge>  {{ album.description }}
                </td>
            </tr>
            <tr>
                <td class="text-left">
                    <img class="m-1" :src="creatorPath" height="25px" width="25px"
                            style="object-fit: cover; border-radius: 25px;">
                            <span>{{ album.creator.artist }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'AlbumHorizontal',

    props: {
        album: {},
        buttonFunction: null,
        buttonIcon: {
            default: "trash",
        },
        buttonVariant: {
            default: "danger"
        }
    },
    data() {
        return {

        }
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
        }
    },
    methods: {
        route() {
            window.open('/album/' + this.album.id, '_blank')
        }
    }
}


</script>
