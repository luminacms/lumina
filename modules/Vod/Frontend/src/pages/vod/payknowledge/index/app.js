import '../base'

import App from './app.vue'
import Vue from 'vue'

import { Row, Col } from 'vant'

Vue.use(Row).use(Col);

new Vue({
  el: '#app',
  render: h => h(App)
})
