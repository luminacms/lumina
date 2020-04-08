import http from '../utils/api.request'

const makeOrder = ((type, id) =>{
    return http.request({method: 'POST', 'url': '/api/vod/order', params: {'type': type, 'id': id}})
})

export default {
    makeOrder
}
