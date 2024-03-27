<template>
    <div class="profile">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                </div>
                <div v-if="creator.disabled" class="col-sm">
                    <h4 class="text-center">
                        OOPS it seems that you have violated some policy
                    </h4>
                    <p>
                        {{ creator.policy_violate }}
                    </p>
                </div>
                <div v-else-if="type == 'edit'" class="col-sm-6 border border-1 p-1">
                    <table class="w-100 mx-2">
                        <tr>
                            <td v-if="image" style="width:25%">
                                <img :src="imageUrl" height="170" width="170px;" style="border-radius: 20px;
                                object-fit: cover;">
                            </td>
                            <td class="p-1" style="height:1px">
                                <h4 class="text-center">
                                    Hi {{ creator.artist }}
                                </h4>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div class="form-group">
                        <label for="image" class="ml-2 m-1 text-left d-block">Update Your Display Pic</label>

                        <input type="file" @change="updatePhoto($event.target)" id="image" accept="image/*">
                    </div>

                    <div class="form-group">
                        <label class="ml-2 m-1 text-left d-block" for="aname">Your Display Name</label>
                        <input type="text" class="form-control" id="aname" placeholder="Your Good Name"
                            v-model="creator.artist">
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="save()">Save</button>
                </div>
                <div v-else-if="type == 'new'" class="col-sm-4 border border-1 p-4">
                    <h4 class="text-center">
                        Hi Register as Creator with us
                    </h4>

                    <br>
                    <div class="form-group">
                        <label for="image" class="ml-2 m-1 text-left d-block">Update Your Display Pic</label>

                        <input type="file" @change="updatePhoto($event.target)" id="image" accept="image/*">
                    </div>

                    <div class="form-group">
                        <label class="ml-2 m-1 text-left d-block" for="aname">Your Display Name</label>
                        <input type="text" class="form-control" id="aname" placeholder="Your Good Name"
                            v-model="creator.artist">
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="save()">Create</button>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    data() {
        return {
            languages: [],
            creator: {},
            image: null,
            type: null
        }
    },
    mounted() {
        if (this.$route.params.type) {
            this.type = this.$route.params.type
        }
        if (this.type == 'edit') {
            if (this.$store.state.auth.user_type == 'USER'){
                this.$store.commit('logout')
                router.push({ name: 'login'})
            }
            const u = this.get("/creator")
            u.then((r) => {
                this.creator = r.creator
                this.image = r.creator.image
                this.creator.image = null
            })
        }

    },
    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.creator.image = files.files[0]
        },
        save() {
            if (this.type == 'edit') {
                this.mutate('put', '/creator', this.creator).then(
                    (r) => {
                        this.creator = r.creator
                        this.image = r.creator.image
                        this.creator.image = null
                    }
                )
            }
            else if (this.type == 'new') {
                this.mutate('post', '/creator', this.creator).then(
                    (r) => {
                        this.creator = r.creator
                        this.image = r.creator.image
                        this.creator.image = null
                        this.type = 'edit'
                        router.push({ name: 'creatorProfile', params: { type: 'edit' } })
                    }
                )
            }

        },
    },
    computed: {
        imageUrl() {
            return process.env.VUE_APP_API + '/image/' + this.image;
        },
    },
}
</script>