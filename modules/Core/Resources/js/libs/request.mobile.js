import axios from 'axios'

// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }

}

class RequestMobile {
    constructor (baseUrl, globalParams) {
        this.baseUrl = baseUrl
        this.globalParams = globalParams || {}
        this.queue = {}
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'Accept':'application/json'
            }
        }
        return config
    }
    destroy (url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            config.params = Object.assign(this.globalParams, config.params)
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)

            return res.data
        }, error => {
            this.destroy(url)
            let errorInfo = error.response
            // if (!errorInfo) {
            //     const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
            //     errorInfo = {
            //         statusText,
            //         status,
            //         request: { responseURL: config.url }
            //     }
            // }
            // addErrorLog(errorInfo)
            return Promise.reject(error)
        })
    }
    request (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default RequestMobile
