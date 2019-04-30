import axios from 'axios';

axios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const conf = config;

    if (user) {
        conf.headers.Authorization = `Bearer ${user.token}`;
    }

    return conf;
}, err => Promise.reject(err));

let instance = {};
/* global test */
if (process.env.NODE_ENV !== 'production') {
    instance = axios.create({
        baseURL: process.env.VUE_APP_API,
    });
} else {
    instance = axios.create({
        baseURL: process.env.VUE_APP_API,
    });
}
console.log(process.env.VUE_APP_API)

export const get = (path, queryParams = '') => instance.get(`${path}${queryParams}`)

export const post = (path, data) => instance.post(path, data)

export const put = (path, bodyFormData, id) => instance.put(`${path}/${id}`, bodyFormData)

export const del = (path, id) => instance.delete(`${path}/${id}`)

export const HTTP = config => axios.create(config);
