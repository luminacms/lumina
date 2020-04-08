import Vue from 'vue'
import 'babel-polyfill'
import 'vant/lib/index.css'
import App from './app.vue'
import 'lib-flexible'


new Vue({
  el: '#app',
  render: h => h(App)
})  
