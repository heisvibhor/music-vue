<template>
    <div class="home">
        <div class="container mt-2">
            
            <div class="row">
                <div class="col-sm">

                </div>
                <div class="col-sm border border-dark rounded py-5">
                    <h3>Login</h3>
                    <div class="form-group mt-2">
                        <label for="exampleInputEmail1" class="float-left ml-2">Email address</label>
                        <input type="email" class="form-control" id="Email1" aria-describedby="emailHelp"
                            placeholder="Enter email" name="email" v-model="cred.email">

                    </div>
                    <div class="form-group">
                        <label class="float-left ml-2" for="Password1">Password</label>
                        <input type="password" class="form-control" id="Password1" placeholder="Password"
                            name="password" v-model="cred.password">
                    </div>
                    <br>
                    <div>
                        Not Registered? <router-link to="signup">Click Here</router-link> to register
                    </div>
                    <button type="submit" class="btn btn-primary mt-2" v-on:click="submitForm"
                        :disabled="!cred.email || !cred.password">Login</button>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import Vue from 'vue';
import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)

export default {
    data() {
        return {
            cred: { email: "", password: "" },
        }
    },
    inject: ['redToast', 'yellowToast', 'greenToast'],
    methods: {
        async submitForm() {
            console.log(process.env.VUE_APP_API, this.cred)
            axios.defaults.baseURL = process.env.VUE_APP_API
            axios('/login', {
                method: 'post',
                data: this.cred,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    this.$store.commit('login', response.data)
                    if (this.$store.state.auth.user_type == "ADMIN") {
                        router.push({ name: 'admin', })
                    } else if (this.$store.getters.is_logged_in) {
                        router.push({ name: 'home', })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response && error.response.data) {
                        const err = error.response.data.message
                        this.redToast(err, 'Error')

                    }
                });
        },

    }
}
</script>