<template>
  <div class="app">
        <div class="list">
          <van-cell-group class="mb-1">
            <van-cell title="精品课程" title-class="tj_value" />
          </van-cell-group>

          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list"
          >
            <div class v-for="( item, index) in list" :key="index" @click="toGoodInfo($event)" :data-id="item.id"> 
            
                <div class="mainImg align-middle">
                  <img :src="item.thumbnail_pic_s" alt />
                </div>
                <div class="desc align-middle">
                  <div class="tt text2">{{item.title}}</div>
                  <div class="price">{{item.price}}</div>
                </div>
             
              <van-divider />
            </div>
          </van-list>
        </div>
  </div>
</template>

<script>
import { Icon, Cell, Divider, CellGroup,  Toast, List} from 'vant'
// import {listGet} from '../../request/api_'
export default {
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Divider.name]: Divider,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [List.name]: List
  },
  mounted(){
    
  },
  data() {
    return {
        list:[],
        page:1,
        loading:false,
        finished:false,
        kind:1,
    }
  },
  methods: {
     onLoad() {
      let self = this
      let page = this.page
      let kind = this.kind
      //  orderGet({page}).then(res => {
      //     self.orderlist.concat(res.orderList);
      //     // 加载状态结束
      //     self.loading = false;

      //     // 数据全部加载完成
      //     if (self.list.length >= 40) {
      //          self.finished = true;
      //     }
      //  })
      // listGet({}).then(res => {
      //   self.list = self.list.concat(res.listdata)
      //   console.log(self.list)
      //   // 加载状态结束
      //   self.loading = false
      //   page += 1
      //   // 数据全部加载完成
      //   if (self.list.length >= 40) {
      //     self.finished = true
      //   }
      // })
    },
   toGoodInfo(e) {
         let goodId = e.currentTarget.dataset.id;

        location.assign('../good/info.html?id='+ goodId);
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    }
  }
}
</script>

<style lang="scss" scope>
html,
body {
  background: #f0f0f0;
}

.text2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.list {
    background: white;
  .tj_value {
    padding-left: 30px;
    
  }
  .tj_value::before {
    width: 5px;
    height: 25px;
    background: red;
    content: '';
    position: absolute;
    left: 40px;
    top: 33px;
  }

  .list {
    padding: 0 44px;
    .mainImg {
      width: 30%;
      display: inline-block;
      img {
        width: 200px;
        height: 150px;
      }
    }
    .desc {
      width: 70%;
      display: inline-block;
      vertical-align: top;
      padding-left: 20px;
      .tt {
        min-height: 56px;
        font-size: 26px;
      }
      .price {
        padding-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>
