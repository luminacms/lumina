import http from '../utils/api.request'

const sendSmsCode = ((mobile) =>{
    return http.request({method: 'POST', 'url': '/server/sendsmscode', data: {'mobile': mobile}})
})
const loginWithMobile = ((data) => {
    return http.request({method: 'POST', 'url': '/server/loginwithmobile', data: data})
})
const userinfo = (() => {
    return http.request({method: 'GET', 'url': '/api/userinfo'})
})

export default {
    sendSmsCode,
    loginWithMobile,
    userinfo
}
