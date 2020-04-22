import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './app.vue'

Vue.use(Vant);

new Vue({
  el: '#app',
  render: h => h(App)
})
