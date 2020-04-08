import App from './app.vue'
import Vue from 'vue'
import goto from '@/utils/goto'
Vue.prototype.goto = goto

new Vue({
  el: '#app',
  render: h => h(App)
})
