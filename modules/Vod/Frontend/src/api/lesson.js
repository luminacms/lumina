import http from '../utils/api.request'

const list = ((course_id, params) =>{
    return http.request({method: 'GET', 'url': '/vod/courses/'+course_id+'/lessons', params: params})
})
const show = ((lesson_id) => {
    return http.request({method: 'GET', 'url': '/vod/lessons/'+lesson_id})
})

// 推荐课程
const recommend = ((lesson_id) => {
    return http.request({method: 'GET', 'url': '/vod/lessons/'+lesson_id+'/recommend'})
})


export default {
    list,
    show,
    recommend
}
