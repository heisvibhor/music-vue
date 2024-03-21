<template>
    <div class="music-small border border-1">
        <table class="w-100">
            <tr>
                <td style="width:25%">
                    <img :src="imagePath" height="80px" width="80px" style="object-fit: cover;">
                </td>
                <td class="p-1" style="height:1px">
                    <div class="h-50 text-left">
                        {{ song.title }}
                    </div>
                    <div class="h-50 text-left">
                        <img :src="creatorPath" height="25px" width="25px"
                            style="object-fit: cover; border-radius: 25px;">
                        <span>{{ song.creator.artist }}</span>
                    </div>
                </td>
                <td style="width:15%">
                    <div v-on:click="playFunction()" v-if="playFunction">
                        <b-avatar icon="play" variant="info" size="2rem"></b-avatar>
                    </div>
                    <div v-on:click="deleteFunction()" v-if="deleteFunction">
                        <b-avatar class="mt-1" icon="trash" variant="danger" size="2rem"></b-avatar>
                    </div>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
export default {
    name: 'MusicSmall',

    props: {
        song: {},
        playFunction: null,
        deleteFunction: null
    },
    computed: {
        imagePath() {
            return process.env.VUE_APP_API + '/image/' + this.song.image
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.creator.image
        }
    },
    mounted() {
        // console.log(this.deleteFunction)
    }
}


</script>
