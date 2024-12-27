import {defineStore} from 'pinia'
import user from '@/apis/user'

const useUserStore = defineStore('user', {
    state: () => ({
        uid: undefined,
        username: undefined,
        password: undefined,
        email: undefined,
        permission: undefined,
        birthday: undefined,
        gender: undefined,
        addresses: [], // 地址列表状态
        aid: undefined
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
            } catch(error) {
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

        changePassword(newPassword) {
            if (!this.isLogin()) {
                return false
            }
            this.password = newPassword;
            return true
            
        },

        setAddresses(addresses) {
            this.addresses = addresses
        },

        // 获取地址列表
        async fetchAddresses() {
            try {
                const res = await user.address()
                this.setAddresses(res.data)
                return true
            } catch {
                return false
            }
        },

        // 添加地址
        async addAddress(address) {
            try {
                const res = await user.addAddress(address)
                this.aid = res.data
                await this.fetchAddresses()
                return true
            } catch {
                return false
            }
        },

        // 删除地址
        async deleteAddress(aid) {
            try {
                await user.deleteAddress(aid)
                await this.fetchAddresses()
                return true
            } catch {
                return false
            }
        },

        async logout() {
            localStorage.removeItem('token')
            this.$reset()
            this.addresses = [] // 确保地址列表也被清空
        }
    }
})

export default useUserStore