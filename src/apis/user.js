import {del, get, post, postFormData, put} from '@/apis/index.js'
import {AxiosHeaders} from "axios";

const login = async (loginForm) => {
    const response = await postFormData('/user/login', loginForm)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const registerCaptcha = async (email) => {
    const response = await get(`/user/captcha/register`, {email})
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    
    return response
}

const register = async (registerForm, requestId) => {
    console.log("1")
    const headers = new AxiosHeaders()
    headers.set('request-id', requestId)
    const response = await postFormData('/user/register', registerForm, headers)
    console.log(response.status_code)
    if (response.status_code !== 201) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const recoverCaptcha = async (email) => {
    const response = await get(`/user/captcha/recover`, {email})
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }

    return response
}

const recover = async (recoverForm, requestId) => {
    const headers = new AxiosHeaders()
    headers.set('request-id', requestId)
    const response = await postFormData('/user/recover', recoverForm, headers)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const profile = async () => {
    const response = await get('/user/profile')
    if (response.status_code !== 200) {
        return Promise.reject(response)
    }
    return response
}

const othersProfile = async (uid) => {
    const response = await get(`/user/profile/${uid}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response.data.username
}

const updateProfile = async (profile, uid) => {
    const response = await put(`/user/profile/${uid}`, profile)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const address = async () => {
    const response = await get('/user/address')
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const getAddress = async (aid) => {
    const response = await get(`/user/address/${aid}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response.data
}

const addAddress = async (address) => {
    console.log("1")
    const response = await post('/user/address', address)
    if (response.status_code !== 201) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const updateAddress = async (address, aid) => {
    const response = await put(`/user/address/${aid}`, address)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

const deleteAddress = async (aid) => {
    const response = await del(`/user/address/${aid}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Promise.reject(response)
    }
    return response
}

export default {
    login,
    registerCaptcha,
    register,
    recoverCaptcha,
    recover,
    profile,
    othersProfile,
    updateProfile,
    address,
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress
}
