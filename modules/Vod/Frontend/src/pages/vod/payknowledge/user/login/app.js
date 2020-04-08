import '../../base'

import Vue from 'vue'
import App from './app.vue'

import { Field, Icon, Cell, CellGroup, Button, Toast } from 'vant'

Vue.use(Field).use(Cell).use(Icon).use(CellGroup).use(Button).use(Toast)

new Vue({
  el: '#app',
  render: h => h(App)
})