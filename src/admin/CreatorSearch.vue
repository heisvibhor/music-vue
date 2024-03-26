<template>
    <div class="search container">
        <div class="row">
            <div class="col-sm">

            </div>
            <div class="col-sm-8">
                <div class="d-float">
                    <input class="form-control d-inline-block w-75" placeholder="Enter Artist name"
                        v-model="search.artist">
                    <b-button v-on:click="artistSearch()"
                        variant="outline-info"><b-icon-search></b-icon-search></b-button>
                </div>
                <div v-if="current_creator_index !== null" class="border border-1 m-2 p-2">
                    <h5 class="text-left">
                        {{ creators[current_creator_index].artist }} | {{ creators[current_creator_index].user.email }}
                    </h5>
                    <label for="pol" class="ml-2 m-1 float-left">Policy Violate Message</label>
                    <input id="pol" class="form-control" style="width: 90%;" placeholder="Policy Violate Message"
                        v-model="policy_violate">
                    <b-button class="m-1" v-on:click="markCreator()" variant="outline-info">Block</b-button>
                </div>
                <table v-if="creators.length">
                    <tr>
                        <th></th>
                        <th>Artist</th>
                        <th>Created At</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    <tr v-for="(creator, index) in creators">
                        <td style="width:55px"><img v-if="creator.image" :src="imageUrl(creator.image)" height="50px" width="50px"
                                class="float-left d-block ml-2 m-1" style="object-fit: cover;"></td>
                        <td>{{ creator.artist }}</td>
                        <td>{{ creator.created_at.slice(0, 10) }}</td>
                        <td style="width:20%; ">
                            <div style="word-wrap:break-word; width: 150px">
                                {{ creator.user.email }}
                            </div>
                        </td>
                        <td>
                            <b-button v-if="!creator.disabled" v-on:click="current_creator(index)"
                                variant="outline-info">Block</b-button>
                            <b-button v-if="creator.disabled" v-on:click="unMarkCreator(creator.id, index)"
                                variant="outline-info">Unblock</b-button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-sm">

            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            creators: [],
            search: {
                artist: ''
            },
            current_creator_index: null,
            policy_violate: ''
        }
    },
    inject: ['get', 'mutate', 'redToast', 'yellowToast', 'greenToast'],
    methods: {
        artistSearch() {
            this.get("/creator", this.search).then(
                (r) => {
                    this.creators = r.creators
                }
            )
        },
        markCreator() {
            this.mutate("put", "/creator", {
                creator_id: this.creators[this.current_creator_index].id,
                disabled: true,
                policy_violate: this.policy_violate
            }
            ).then(
                (r) => {
                    this.creators[this.current_creator_index].disabled = true,
                        this.current_creator_index = null
                }

            )
        },
        unMarkCreator(creator_id, index) {
            this.mutate("put", "/creator", { creator_id: creator_id, disabled: false }).then(
                (r) => this.creators[index].disabled = false
            )
        },
        imageUrl(image) {
            return process.env.VUE_APP_API + '/image/' + image;
        },
        current_creator(index) {
            this.current_creator_index = index
        }
    },
}
</script>