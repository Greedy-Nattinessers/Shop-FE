import {defineStore} from 'pinia'
import user from '@/apis/user'

const useUserStore = defineStore('user', {
    state: () => ({
        uid: undefined,
        username: undefined,
        email: undefined,
        permission: undefined,
    }),
    getters: {
        userInfo(state) {
            return {...state}
        }
    },
    actions: {
        setInfo(partial) {
            this.$patch(partial)
        },

        isLogin() {
            return this.uid !== undefined
        },

        async login({username, password}) {
            try {
                const res = await user.login({username, password})
                const token = res.data.access_token
                localStorage.setItem('token', token)
                return true
            } catch {
                return false
            }
        },

        async update() {
            if (!localStorage.token) {
                return false
            }
            try {
                const res = await user.profile()
                this.setInfo(res.data)
                return true
            } catch {
                return false
            }
        },

        async logout() {
            localStorage.removeItem('token')
            this.$reset()
        }
    }
})

export default useUserStore