<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                </div>
                <div v-if="tab == 'first'" class="col-sm-5 p-2">
                    <div class="border border-dark rounded p-4">
                        <h3>Sign Up</h3>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-left">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Enter email" v-model="cred.email">
                        </div>
                        <div class="form-group">
                            <label class="text-left" for="name">Your Good Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Your Good Name"
                                v-model="cred.name">
                        </div>
                        <div class="form-group">
                            <label for="image">Profile Image</label>
                            <input type="file" @change="updatePhoto($event.target)" id="image"
                                placeholder="Profile File" class="form-control" accept="image/*">
                        </div>
                        <div class="form-group">
                            <label for="image">Preferred Language</label>
                            <select class="form-select form-control" aria-label="Default select example"
                                v-model="cred.language">
                                <option v-for="lang in languages" :value="lang.name">
                                    {{ lang.name }}
                                </option>
                            </select>
                        </div>
                        <br>
                        <div>
                        Already Registered? <router-link to="login">Click Here</router-link> to login
                    </div>
                        <button type="submit" class="btn btn-primary" v-on:click="getOtp()"
                            :disabled="!cred.email || !cred.name || !cred.language">Get OTP</button>
                    </div>
                </div>
                <div v-if="tab == 'second'" class="col-sm-5 p-2">
                    <div class="border border-dark rounded p-4">
                        <h3>Sign Up</h3>
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="text-left">Email address</label>
                            {{ cred.email }}
                        </div>
                        <div class="form-group">
                            <label class="text-left" for="example">Enter OTP</label>
                            <input type="text" class="form-control" id="example" placeholder="Enter OTP" name="otp"
                                v-model="cred.otp">
                        </div>
                        <div class="form-group">
                            <label class="text-left" for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"
                                placeholder="Password" v-model="cred.password">
                        </div>

                        <br>
                        <button type="submit" class="btn btn-primary" v-on:click="submitForm()"
                            :disabled="!cred.otp || !cred.password">SignUP</button>
                    </div>
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
import Vue from 'vue'
axios.defaults.baseURL = process.env.VUE_APP_API

export default {
    data() {
        return {
            cred: { email: "", name: "", language: "", password: "", otp: "", image: null },
            tab: 'first',
            languages: [],
        }
    },
    
    mounted() {
        axios('/language' , {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            this.languages = response.data.languages
        }).catch((error) => {
            if (error.response.data) {

                this.dangerToast(error.response.data.message, 'Error')

            }
        });
    },
    inject: ['redToast', 'yellowToast', 'greenToast'],
    methods: {
        updatePhoto(files) {
            if (!files) return;
            this.cred.image = files.files[0]
        },

        async submitForm() {
            axios({
                method: 'post',
                url: process.env.VUE_APP_API + '/user',
                data: this.cred,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                router.push({ name: 'login' })
            }).catch((error) => {
                if (error.response.data) {
                    this.dangerToast(error.response.data.message, 'Error')
                }
            });
        },
        async getOtp() {
            axios('/get_otp', {
                method: 'post',
                data: this.cred,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                console.log(response)
                if (response.statusText == 'OK') {
                    this.greenToast('OTP send success', 'success')
                    this.tab = 'second'
                }
                else {
                    this.redToast(response.data.message, 'Error')
                }

            }).catch((error) => {
                this.redToast(error.response.data.message, 'Error')
            });
        },
    }
}

</script>