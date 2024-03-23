<template>
    <div class="profile">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                </div>
                <div class="col-sm-6 border border-1 p-1">
                    <table class="w-100 mx-2">
                        <tr>
                            <td v-if="image" style="width:25%">
                                <img :src="imageUrl" height="170" width="170px;" style="border-radius: 20px;
                                object-fit: cover;">
                            </td>
                            <td class="p-1" style="height:1px">
                                <h4 class="h-50 text-center">
                                    Hi {{ user.name }}
                                </h4>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div class="form-group">
                        <label for="image" class="ml-2 m-1 text-left d-block">Update Your Profile Pic</label>

                        <input type="file" @change="updatePhoto($event.target)" id="image" accept="image/*">
                    </div>

                    <div class="form-group mb-2">
                        <label class="ml-2 m-1 float-left">Preferred Language</label>
                        <select class="form-select form-control" v-model="user.language">
                            <option v-for="lang in languages" :value="lang.name">
                                {{ lang.name }}
                            </option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="save()">Save</button>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    data() {
        return {
            languages: [],
            user: {},
            image: null,
        }
    },
    mounted() {
        const lan = this.get("/language")
        lan.then((r) => {
            this.languages = r.languages
        })
        const u = this.get("/user")
        u.then((r) => {
            this.user = r.user
            this.image = r.user.image
            this.user.image = null
        })
    },
    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.user.image = files.files[0]
        },
        save() {
            this.mutate('put', '/user', this.user).then(
                (r) => {
                    this.user = r.user
                    this.image = r.user.image
                    this.user.image = null
                }
            )
        },
    },
    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
    },
}
</script>