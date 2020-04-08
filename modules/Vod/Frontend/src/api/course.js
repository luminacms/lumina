import http from '../utils/api.request'

const list = ((params) =>{
    return http.request({method: 'GET', 'url': '/vod/courses', params: params})
})

const show = ((id) => {
    return http.request({method: 'GET', 'url': '/vod/courses/'+id})
})

export default {
    list,
    show
}
