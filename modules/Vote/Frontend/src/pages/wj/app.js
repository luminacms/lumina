// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import goto from '@/goto.js'

Vue.config.productionTip = false

window.drag = new Vue();
Vue.mixin({
  methods: {
    goto: (route, params) => {
      return goto(route, params)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})