// ie polyfill
// import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'

import { Dialog, Button } from 'element-ui';
Vue.component(Dialog.name, Dialog);
Vue.component(Button.name, Button);

new Vue({
    el: '#lumina_canlendar',
    render: h => h(App)
  })
