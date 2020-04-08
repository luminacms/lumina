<template>
  <div id="app">
    <van-tabs v-model="kind" sticky @click="getOrder">
      <van-tab v-for="(item ,index) in title" :title="item" :name="index" :key="index">
        <!-- orderList -->
        <div class="orderC">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group>
              <van-cell v-for="(item ,index) in orderlist" :key="index" :data-id="item.id" @click="togoodInfo($event)">
                <!-- <div class="mainImg w-2/5 inline-block align-middle">
                  <img :src="item.thumbnail_pic_s" alt />
                </div>
                <div class="desc inline-block w-2/5 align-middle pl-1">
                  <p class="tt h-4">{{item.title}}</p>
                  <div class="price ">{{item.price}}</div>
                </div>
                
                <div class="active inline-block w-1/5 align-middle text-center" v-if="item.active">
                    未付
                </div>
                <div class="active inline-block w-1/5 align-middle text-center text-gray-300 border-gray-300 border" v-else>
                    已付
                </div>-->

                <div class="mainImg w-2/5 inline-block align-middle">
                  <img :src="item.thumbnail_pic_s" alt />
                </div>
                <div class="desc inline-block w-3/5 align-middle pl-1">
                  <p class="tt h-4 text-gray-700">{{item.title}}</p>
                  <div class="price text-right ">{{item.price}}</div>
            
                    

                    <!-- <div class="inline-block " v-if="kind == 0">
                      <div
                        class="active inline-block w-1-3 align-middle text-center"
                        v-if="item.active"
                      >未付</div>
                      <div
                        class="active inline-block  w-full  align-middle text-center text-gray-300 border-gray-300 border"
                        v-else
                      >已付</div>
                    </div>-->
                    <!-- <span >{{item.price}}</span> -->
                
                </div> 


                
              </van-cell>
             
            </van-cell-group>
          </van-list>
           <div class="text-center border-green-400 border m-auto w-1/3 h-3 text-green-500 mt-4 leading-loose rounded-sm" v-if="!orderlist.length" @click="toHome">去逛逛</div>
        </div>
      </van-tab>
    </van-tabs>z
  </div>
</template>

<script>
import { Cell, Tab, Tabs, List, CellGroup } from 'vant'
// import { orderGet } from '../../request/api_'
export default {
  mounted() {
    this.activeName = this.getQueryString('kind')
    // orderGet({}).then(res => {
    //   this.orderlist = res.orderList;
    //   console.log(res.orderList)
    // })
  },

  components: {
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      title: ['全部订单', '已付款', '未付款'],
      kind: '0',
      orderlist: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      list:[]
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
      // orderGet({}).then(res => {
      //   self.orderlist = self.orderlist.concat(res.orderList)
      //   console.log(self.orderlist)
      //   // 加载状态结束
      //   self.loading = false
      //   page += 1
      //   // 数据全部加载完成
      //   if (self.orderlist.length >= 40) {
      //     self.finished = true
      //   }
      // })
    },
    getOrder(name, title) {
        console.log(name)
      let kind = name;

      // orderGet({}).then(res => {
      //   this.orderlist = res.orderList
      // })
    },
    togoodInfo(e) {
         let goodId = e.currentTarget.dataset.id;

        location.assign('../good/info.html?id='+ goodId);
    },
     toHome() {
        

        location.assign('../index.html');
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

<style lang="scss" scoped>
</style>
