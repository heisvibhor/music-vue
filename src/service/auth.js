export class AuthService {
    email: string = '';
    user_type: 'USER' | 'CREATOR' | 'ADMIN' = 'USER'
    token: string = '';
    user_id: string = '';
    is_logged_in: boolean = false

    constructor() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token')
            this.user_type = localStorage.getItem('user_type')
            this.user_id = localStorage.getItem('user_id')
            this.email = localStorage.getItem('email')
            this.is_logged_in = true
        }
    }

    login(login_res) {
        this.token = 'Bearer' + login_res.token
        this.user_type = login_res.user_type
        this.user_id = login_res.user_id
        this.email = login_res.email
        this.is_logged_in = true
        localStorage.setItem('token', this.token)
        localStorage.setItem('user_type', this.user_type)
        localStorage.setItem('user_id', this.user_id)
        localStorage.setItem('email', this.email)
    }
    logout() {
        this.is_logged_in = false
        localStorage.removeItem('token')
        localStorage.removeItem('user_type')
        localStorage.removeItem('user_id')
        localStorage.removeItem('email')
    }
}