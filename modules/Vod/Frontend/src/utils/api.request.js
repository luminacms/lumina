import HttpRequest from '$libs/request.mobile'
import config from '../config'
import store from '../pages/vod/payknowledge/store'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest(baseUrl, {'oid': config.oid, 'token': store.getData('token')})

export default axios
