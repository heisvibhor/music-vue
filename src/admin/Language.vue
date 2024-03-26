<template>
    <div class="language">
        <h3 class="m-4">
            Languages
        </h3>
        <div class="container">
            <div class="row">
                <div class="col-sm">

                </div>
                <div class="col-sm border p-2">
                    <h5 class="my-2">
                        Add New Langauge
                    </h5>
                    <div class="form-group">
                        <label class="float-left ml-1" for="languageName">Enter language Name</label>
                        <input class="form-control" id="languageName" placeholder="Language Name" v-model="language.name">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary" v-on:click="add" :disabled="!language.name">Add</button>
                </div>
                <div class="col-sm border p-2">
                    <h5 class="my-2">
                        Existing Langauges
                    </h5>
                    <div class="border" v-for="lang in languages">
                        {{ lang.name }}
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
            languages: [],
            language: {
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
            this.get("/language").then((r) => {
                this.languages = r.languages
            })
        },
        add() {
            let text = "Are You Sure you want to add";
            if (confirm(text) == true) {
                this.mutate("post", "/language", this.language).then(
                    (r) => {
                        this.fetch();
                        this.language.name = ''
                    }
                )
            }

        }
    }
}
</script>