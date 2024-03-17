import axios from "axios";
import Vue from "vue";
import router from "./router";

export const methods = {
    api(url, method, data) {
        console.log("hey")
        console.log(this.$store.state.auth.token)
        axios(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.$store.state.auth.token,
            }
        }).then((response) => {
            if (response.statusText == 'OK') {
                return response.data
            }
        }).catch((error) => {
            console.log(error);
            const err = error.response.data.message
            this.$root.$bvToast.toast(err, {
                title: 'Error',
                autoHideDelay: 5000,
                variant: "danger",
                solid: true
            })
        });
    }
}
export const MyPlugin = {
    install(app, store, root) {
        const redToast = (root, message, title) => {
            root.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 5000,
                variant: "danger",
                solid: true
            })
        }
        const greenToast = (root, message, title) => {
            root.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 5000,
                variant: "success",
                solid: true
            })
        }

        const yellowToast = (root, message, title) => {
            root.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 5000,
                variant: "warning",
                solid: true
            })
        }
        app.prototype.$api = {
            async get(root, url, params) {
                let furl = url
                if (params) {
                    furl += "?" + Object.keys(params).map(key => {
                        return `${key}=${encodeURIComponent(params[key])}`;
                    }).join('&');
                }
                const mid = axios.get(furl, {
                    headers: {
                        "Authorization": store.state.auth.token,
                    }
                })
                return new Promise((resolve, reject) => {
                    mid.then(async (res) => {
                        if (res.statusText == 'OK') {
                            console.log("resolved")
                            resolve(res.data)
                        } else {
                            yellowToast(root, res.data.message, "OOPS")
                        }
                    }).catch(async (err) => {
                        if (err.response.data.message == "Token has expired") {
                            router.push({ path: "/login" })
                            store.commit("logout")
                        } else if (err.response.data.message) {
                            yellowToast(root, err.response.data.message, "OOPS")
                        }

                        console.log(err)
                    })
                })
            },
        }

    },
};
