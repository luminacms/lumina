import '../../base'

import Vue from 'vue'
import App from './app.vue'

import {
  Tag,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Icon,
  GoodsAction,
  Collapse,
  CollapseItem,
  GoodsActionIcon,
  GoodsActionButton,
  Popup,
  Button,
  Stepper,
  Cell,
  CellGroup,
  Divider,
  SubmitBar,
  List,
  Skeleton
} from 'vant'

Vue.use(Tag).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Icon).use(GoodsAction).use(Collapse)
.use(CollapseItem).use(GoodsActionIcon).use(GoodsActionButton).use(Popup)
.use(Button).use(Stepper).use(Cell).use(CellGroup).use(Divider)
.use(SubmitBar).use(List).use(Skeleton)

// import './.xgplayer/skin/index.js';
import '../../assets/css/detail.scss';

new Vue({
  el: '#app',
  render: h => h(App)
})
