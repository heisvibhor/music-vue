<template>
    <div class="album-search container">
        <div class="row">
            <div class="col-sm">

            </div>
            <div class="col-sm-5">
                <div class="d-float">
                    <input class="form-control d-inline-block w-75" placeholder="Enter album title"
                        v-model="search.title">
                    <b-button v-on:click="albumSearch()"
                        variant="outline-info"><b-icon-search></b-icon-search></b-button>
                </div>
                <div v-for="(album, index) in albums">
                    <AlbumHorizontal :album="album" :buttonFunction="deleteAlbum.bind({}, album.id, index)">
                    </AlbumHorizontal>
                </div>
            </div>
            <div class="col-sm">

            </div>
        </div>

    </div>
</template>
<script>
import AlbumHorizontal from '@/components/AlbumHorizontal.vue'
export default {
    data() {
        return {
            albums: [],
            search: {
                title: ''
            },
        }
    },
    components: {
        AlbumHorizontal,
    },
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    methods: {
        albumSearch() {
            this.get("/album", this.search).then(
                (r) => {
                    this.albums = r.albums
                }
            )
        },
        deleteAlbum(album_id, index) {
            let text = "Are You Sure you want to delete";
            if (confirm(text) == true) {
                this.mutate("delete", `/album/${album_id}`, {}).then(
                    (r) => this.albums.splice(index, 1)
                )
            }
        }
    },
}
</script>