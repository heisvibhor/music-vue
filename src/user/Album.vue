<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
            <div class="border border-1 p-1">
                <table class="w-100 m-2">
                    <tr>
                        <td style="width:25%">
                            <img :src="imageUrl" height="80px" width="80px" style="object-fit: cover;">
                        </td>
                        <td class="p-1" style="height:1px">
                            <h5 class="h-50 text-left">
                                {{ album.title }}
                            </h5>
                            <div class="h-50 text-left">
                                {{ album.description }}
                            </div>
                        </td>
                        <td style="width:15%">
                            <div v-on:click="tab = 'edit'">
                                <b-avatar icon="pencil" variant="info" size="2rem"></b-avatar>
                            </div>
                        </td>

                    </tr>
                </table>
            </div>
            <div class="border border-1 p-1">
                <table class="w-100 m-2">
                    <tr>
                        <td class="p-1" style="height:1px">
                            <h5 class="h-50 text-left">
                                Play Next Song
                            </h5>
                        </td>
                        <td style="width:15%">
                            <div v-on:click="playRandom">
                                <b-avatar icon="collection-play" variant="info" size="2rem"></b-avatar>
                            </div>
                        </td>
                        <td style="width:15%">
                            <div v-on:click="playNext">
                                <b-avatar icon="play" variant="info" size="2rem"></b-avatar>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-for="mc in album_songs">
                <MusicSmall :song="mc" :playFunction="play.bind({}, mc.id)"></MusicSmall>
            </div>
        </div>
        <div class="col-sm-8">
            <Listen v-if="current_song_id" :id="current_song_id"></Listen>
            <span v-if="!album_songs.length">
                OOPS Know Song in this album please wait
            </span>
        </div>
        </div>
    </div>
</template>
<script>
import MusicSmall from '@/components/MusicSmall.vue'
import Listen from '@/components/Listen.vue'
import MusicMedium from '@/components/MusicMedium.vue'

export default {
    name: 'Song',
    components: {
        MusicSmall,
        MusicMedium,
        Listen
    },
    data() {
        return {
            id: undefined,
            album: {},
            album_songs: [],
            current_song_id: null,
            songs: [],
            next_song: {},
            current_song_index: 0,
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
            return process.env.VUE_APP_API + '/image/' + this.album.image;
        },
    },
    methods:{
        fetch() {
            const res = this.$api.get(this.$root, `/album`, {album_id : this.id})
            res.then((r) => {
                this.album_songs = r.album.songs
                this.album = r.album
                
                if (this.album_songs.length) {
                    this.play(this.album_songs[0].id)
                }
            })
        },
        playRandom() {
            const i = Math.floor(Math.random()*this.album_songs.length)%this.album_songs.length
            this.current_song_index = i
            this.play(this.album_songs[i].id)
        },
        playNext(){
            this.current_song_index += 1
            this.current_song_index = this.current_song_index%this.album_songs.length
            this.play(this.album_songs[this.current_song_index].id)
        },
        play(song_id) {
            this.current_song_id = song_id
        },
    }
}
</script>