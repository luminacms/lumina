import Axios from "axios"
import qs from 'qs'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css';
import {Notification} from 'element-ui';

const $http = Axios.create({
  withCredentials: false,
  crossDomain: true
});
// Before request
$http.interceptors.request.use(
    config => {
      // 配置接口地址
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
      }

      let token = document.head.querySelector('meta[name="csrf-token"]');
      if (token) {
        config.headers.common['X-CSRF-TOKEN'] = token.content;
      }
      config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);
// After request
$http.interceptors.response.use(
    response => {
      let errcode = response.data.errcode
      let res = response.data

      if (errcode == 0) {
        return Promise.resolve(res);
      }else if(errcode == 422) {
        _.forEach(res.errors, (val) =>{
          notice({
            title: val[0]
          }, 'notice', 'error', 5);
        })
        return Promise.reject(res.msg);
      }else if(errcode == 401) {
          Notification.error(res.msg)
        // $router.replace('/member/login?redirect=' + $router.currentRoute.fullPath);
        // $store.dispatch('SET_LOGOUT');
        return Promise.reject(res.msg);
      }else if(errcode == 403) {
        //无权限操作资源
          Notification.error(res.msg !== '' ? res.msg : '无权限操作资源，访问被拒绝')
        return Promise.reject(res.msg);
      }else if (errcode <= 400) {
          Notification.error(res.msg)
        return Promise.resolve(res);
      } else if (errcode == 404) {
        //资源不存在
          Notification.error(res.msg !== '' ? res.msg : '资源不存在')
          // $router.replace(HOME_PAGE);
        return new Promise(() => {});
      } else if (errcode < 500) {
          Notification.error('请求错误 ' + errcode)
        // $router.back();
        return Promise.reject(res);
      } else {
          Notification.error('路径：' + self.url + '，' + res.msg || '未知错误，请联系管理员或稍后重试')
        return new Promise(() => {});
      }
    },
    error => {
        Notification.error(error.message ? error.message : '未知错误，请稍后重试')
      return Promise.reject(error);
    }
);

export default $http;
