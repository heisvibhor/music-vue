<template>
    <div class="container">
        <div class="m-auto" style="width: 160px; height: 160px;" v-on:click="push">
            <img :src="imagePath" height="100%" width="100%" style="object-fit: contain;">
        </div>
        <div class="fs-6 d-flex justify-content-center gap-2">
            <div class="p-1 px-2 mx-1" data-toggle="tooltip" title="Genre" data-placement="bottom"
                style="background-color: rgb(240, 226, 146); border-radius: 8px;">{{ song.song.genre }}

            </div>
        </div>
        <div class="p-1 px-2" data-toggle="tooltip" title="Language" data-placement="bottom"
            style="background-color: rgb(180, 240, 146); border-radius: 8px;">{{ song.song.language }}</div>
        <div class="p-1 px-2 mx-1" data-toggle="tooltip" title="Views" data-placement="bottom"
            style="background-color: #92f0e3; border-radius: 8px;">{{ song.song.views }} Views</div>


        <div class="mt-3" style="width: 200px;">
            <table>
                <tr>
                    <td>
                        <img :src="creatorPath" height="30px" width="30px"
                            style="object-fit: cover; border-radius: 30px;">
                    </td>
                    <td class="px-1">
                        <h5>{{ song.song.title }}</h5>
                    </td>
                </tr>
            </table>

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
        }
    },
    mounted() {
        self.addEventListener('fetch', function (event) {
            const newRequest = new Request(event.request, {
                headers: { "Authorization": "Bearer XXX-my-token" },
                mode: "cors"
            });
            return fetch(newRequest);
        }
        )
    },
    methods: {
        push() {
            router.push({ path: '/listen/' + this.song.song.id })
        },

    }
}


</script>
