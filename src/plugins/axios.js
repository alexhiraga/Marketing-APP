import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

// const success = res => res
// const error = err => {
//     if (401 === err.response.status) {
//         window.location = '/'
//     } else {
//         return Promise.reject(err)
//     }
// }


Vue.use({
    install(Vue) {
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                // get: {
                //     "Authorization": "test"
                // }
            }
        })

        // Vue.prototype.$http.interceptors.response.use(success, error)

        // Vue.prototype.$http.interceptors.request.use(config => {
        //     return config
        // }, error => Promise.reject(error))

        // Vue.prototype.$http.interceptors.response.use(res => {
        //     const array = []
        //     for(let chave in res.data){
        //         array.push({
        //             id: chave, ...res.data[chave]
        //         })
        //     }

        //     res.data = array
        //     return res
        // }, error => Promise.reject(error))

    }
})