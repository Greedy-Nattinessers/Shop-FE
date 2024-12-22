import axios from 'axios';

export const ServerURL = "http://localhost:8123";

const requests = axios.create({
    baseURL: ServerURL,
    timeout: 5000,
    withCredentials: true
});

requests.interceptors.request.use(
    (request) => {
        if (localStorage.token) {
            request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }

        return request
    },
    (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
    },
)

requests.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error.response.data.message) {
            console.error('Response error:', error.response.data.message)
        } else {
            console.error('Response error:', error)
        }
        return Promise.reject(error)
    },
)

const get = (url, params, headers, config) => requests.get(url, {params, headers, ...config})
const post = (url, data, headers, config) => requests.post(url, data, {headers, ...config})
const postFormData = (url, data, headers, config) => {
    const form = new FormData()
    for (const key in data) {
        form.append(key, data[key])
    }
    return requests.post(url, form, {headers, ...config})
}
const put = (url, data, headers, config) => requests.put(url, data, {headers, ...config})
const del = (url, headers, config) => requests.delete(url, {headers, ...config})

export {
    get, post, postFormData, put, del
}