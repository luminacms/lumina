import Vue from 'vue'
import App from './Client.vue'
import VueRouter from 'vue-router'
import FastClick from 'FastClick'
import './assets/js/date'
import routes from './extend/RouterMap'
import ESlog from './extend/ESlog'
import clientlib from './extend/client/'
import {fetch} from './extend/fetch'
import Util from './extend/Util'
let config = require('./config/index')

window.Truck = window.$GP = {
  Util,
  ESlog,
  Env: {},
  Native: {},
  Server: {fetch},
}
window.Truck.Maliang = clientlib
window.$GP.VueExtend = clientlib
/**
 * 定义编辑配置属性的混合策略
 */
var strategies = Vue.config.optionMergeStrategies
strategies.editorMethods = strategies.methods
strategies.editerMethods = strategies.methods
Vue.use(VueRouter)
FastClick.attach(document.body, {})

const router = new VueRouter(routes)

const app = window.app = new Vue({ // eslint-disable-line
  router,
  render: h => h(App)
})

function startApp () {
  if (startApp.started) return
  startApp.started = true
  mount()

  function mount () {
    Object.defineProperty(window, 'EventHub', {
      get () { return window.app }
    })
    app.$mount('#app')
    // window.addEventListener('pagehide', trackPVTime)
    // sendPVTime()
    // window.trackPVTime = trackPVTime
  }
}
startApp()
