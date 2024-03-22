<template>
    <div class="music-medium border">
        <table class="w-100">
            <tr>
                <td style="width:25%">
                    <img :src="imagePath" height="80px" width="80px" style="object-fit: cover;">
                </td>
                <td class="p-1" style="height:1px">
                    <div class="h-50 text-left">
                        {{ song.song.title }}
                    </div>
                    <div class="h-50 text-left">
                        <img :src="creatorPath" height="25px" width="25px"
                            style="object-fit: cover; border-radius: 25px;">
                        <span>{{ song.song.creator.artist }}</span>
                    </div>
                </td>
                <td style="width:15%">
                    <div @click="addFunction()">
                        <b-avatar icon="plus" variant="primary"></b-avatar>
                    </div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2">
                    <div>
                        <b-badge class="ml-1" v-if="song.rating">{{ song.rating }} Star</b-badge>
                        <b-badge variant="success" class="ml-1" v-if="song.likes">{{ song.likes }} Likes</b-badge>
                        <b-badge variant="warning" class="ml-1">{{ song.song.genre }}</b-badge>
                        <b-badge variant="info" class="ml-1">{{ song.song.language }}</b-badge>
                        <b-badge variant="success" class="ml-1">{{ song.song.views }} Views</b-badge>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'MusicMedium',

    props: {
        song: {},
        addFunction: null
    },
    computed: {
        imagePath() {
            return process.env.VUE_APP_API + '/image/' + this.song.song.image
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.song.creator.image
        }
    },
}


</script>
