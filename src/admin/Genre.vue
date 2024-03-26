<template>
    <div class="genre">
        <h3 class="m-4">
            Genres
        </h3>
        <div class="container">
            <div class="row">
                <div class="col-sm">

                </div>
                <div class="col-sm border p-2">
                    <h5 class="my-2">
                        Add New Genre
                    </h5>
                    <div class="form-group">
                        <label class="text-left" for="genreName">Enter Genre Name</label>
                        <input class="form-control" id="genreName" placeholder="Genre Name" v-model="genre.name">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" v-on:click="add" :disabled="!genre.name">Add</button>
                </div>
                <div class="col-sm border p-2">
                    <h5 class="my-2">
                        Existing Genres
                    </h5>
                    <div class="border" v-for="gen in genres">
                        {{ gen.name }}
                    </div>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            genres: [],
            genre: {
                name: '',
            }
        }
    },
    inject: ['redToast', 'yellowToast', 'greenToast', 'mutate', 'get'],
    methods: {

    },
    mounted() {
        this.fetch()
    },
    methods: {
        fetch() {
            this.get("/genre").then((r) => {
                this.genres = r.genres
            })
        },
        add() {
            let text = "Are You Sure you want to add";
            if (confirm(text) == true) {
                this.mutate("post", 'genre', this.genre).then(
                    (r) => {this.fetch()
                    this.genre.name = ''}
                )
            }

        }
    }
}
</script>