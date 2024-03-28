<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h4 class="text-left mt-2">Analytics</h4>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Song Count
                    </div>
                    {{ analytics.song_count }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Album Count
                    </div>
                    {{ analytics.album_count }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Total Views
                    </div>
                    {{ analytics.total_views }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Total Likes
                    </div>
                    {{ analytics.total_likes }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Playlist with your songs
                    </div>
                    {{ analytics.playlist_with_songs }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Average Rating
                    </div>
                    {{ analytics.average_rating? parseFloat(analytics.average_rating).toFixed(2) : 0 }}
                </div>
                <div class="border my-2">
                    <div style="font-size:larger">
                        Song in Album
                    </div>
                    {{ analytics.songs_in_album }}
                </div>
            </div>
            <div class="col-9">
                <div v-if="songs.length">
                    <h4 class="text-left mt-2">Songs</h4>
                    <div class="d-flex flex-row" style="overflow-x: scroll;">
                        <div v-for="mc in songs">
                            <Music :song="mc" edit="true"></Music>
                        </div>
                    </div>
                </div>

                <div v-else>
                    No Song Yet Create Song
                </div>

                <div v-if="albums.length">
                    <h4 class="text-left mt-2">Albums</h4>
                    <div class="d-flex flex-row" style="overflow-x: scroll;">
                        <div v-for="al in albums">
                            <Album :album="al" edit="true"></Album>
                        </div>
                    </div>
                </div>
                <div v-else>
                    No Albums Yet Create album
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Music from '@/components/Music.vue'
import Album from '@/components/Album.vue'
export default {

    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    components: {
        Music,
        Album
    },
    data() {
        return {
            albums: [],
            songs: [],
            analytics: {

            },
        }
    },
    mounted() {
        this.get('/analytics').then(
            (r) => {
                this.analytics = r.analytics
                this.albums = r.albums
            }
        )
        this.get('/song', { creator_id: this.$store.state.auth.user_id }).then(
            (r) => {
                this.songs = r.data
            }
        )
    }
}
</script>