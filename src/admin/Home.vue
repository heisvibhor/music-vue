<template>
    <div class="container">
        <h4 class="my-2">
            Dashboard
        </h4>
        <div class="row row-cols-md-4 gap-1">
            <div class="border py-4 col">
                <div style="font-size:larger">
                    User Count
                </div>
                {{ analytics.user_count }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    User Last Month
                </div>
                {{ analytics.user_last_month }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Creator Count
                </div>
                {{ analytics.creator_count }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Creators Last Month
                </div>
                {{ analytics.creator_last_month }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Song Count
                </div>
                {{ analytics.song_count }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Album Count
                </div>
                {{ analytics.album_count }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Playlist Count
                </div>
                {{ analytics.playlist_count }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Total Views
                </div>
                {{ analytics.total_views }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Total Likes
                </div>
                {{ analytics.total_likes }}
            </div>

            <div class="border py-4 col">
                <div style="font-size:larger">
                    Average Rating
                </div>
                {{ analytics.average_rating }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Song in Album
                </div>
                {{ analytics.total_songs_in_albums }}
            </div>
            <div class="border py-4 col">
                <div style="font-size:larger">
                    Song in Playlist
                </div>
                {{ analytics.total_songs_in_playlists }}
            </div>


        </div>

        <div class="row row-cols-md-3 gap-1">
            <img :src="imagePath('plot.jpg')" class="border">
            <img :src="imagePath('plot1.jpg')" class="border">
            <img :src="imagePath('plot2.jpg')" class="border">
            <img :src="imagePath('plot3.jpg')" class="border">
            <img :src="imagePath('plot4.jpg')" class="border">
            <img :src="imagePath('plot5.jpg')" class="border">
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
            }
        )
    },
    methods:{
        imagePath(image){
            return process.env.VUE_APP_API + '/image/' + image
        }
    }
}
</script>