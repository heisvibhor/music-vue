<template>
    <div class="music-medium border">
        <table class="w-100">
            <tr>
                <td style="width:25%" rowspan="2">
                    <a :href="'/listen/' + song.song.id" target="_blank">
                        <img :src="imagePath" height="80px" width="80px" style="object-fit: cover;">
                    </a>
                </td>
                <td class="p-1" style="height:1px">
                        <div @click="route()" class="h-50 text-left mt-1" style="font-size: large;">
                            {{ song.song.title }}
                        </div>
                    <div class="h-50 text-left m-1">
                        <img :src="creatorPath" height="25px" width="25px"
                            style="object-fit: cover; border-radius: 25px;">
                        <span>{{ song.song.creator.artist }}</span>
                    </div>
                </td>
                <td style="width:15%" v-if="buttonFunction">
                    <div @click="buttonFunction()">
                        <b-avatar :icon="buttonIcon" :variant="buttonVariant" size="2.1rem"></b-avatar>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div class="float-left m-1">
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
        buttonFunction: null,
        buttonIcon: {
            default: "plus",
        },
        buttonVariant: {
            default: "info"
        }
    },
    data() {
        return {

        }
    },
    computed: {
        imagePath() {
            return process.env.VUE_APP_API + '/image/' + this.song.song.image
        },
        creatorPath() {
            return process.env.VUE_APP_API + '/image/' + this.song.song.creator.image
        }
    },
    methods: {
        route(){
            window.open('/listen/' + this.song.song.id, '_blank')
        }
    }
}


</script>
