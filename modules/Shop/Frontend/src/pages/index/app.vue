<template>
  <div id="app" class="max-w-sm mx-auto ">
    <div class="g-header relative">
      <img class="shop-icon absolute top-0 left-0 " :src="shop.iconUrl" />
      <div class="shop-info absolute top-0 left-0 ">
        <h2 class="shop-name font-bold text-white">{{shop.name}}</h2>
        <ul class="dsr flex">
          <li class="split flex-1 relative">
            <span class="eva-name text-gray-300">用户口碑</span>
            <div class>
              <span
                class="value"
                :class="levelClass.word"
              >{{shop.grade.word.value == "高" ? "高" :(shop.grade.word.value == "中" ? "中" : "低")}}</span>
              <span class="num text-red-500">{{shop.grade.word.num}}</span>
            </div>
          </li>

          <li class="split flex-1 relative">
            <span class="eva-name text-gray-300">服务态度</span>
            <div class>
              <span class="value" :class="levelClass.word">{{shop.grade.service.value}}</span>
              <span class="num text-red-500">{{shop.grade.service.num}}</span>
            </div>
          </li>

          <li class="flex-1">
            <span class="eva-name text-gray-300">发货速度</span>
            <div class>
              <span class="value" :class="levelClass.word">{{shop.grade.delivery.value}}</span>
              <span class="num text-red-500">{{shop.grade.delivery.num}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="absolute bottom-0 left-0 w-full bg-xs">
        <van-notice-bar
          :text="shop.bg"
          left-icon="volume-o"
          color="#ccc"
          background="rgba(0,0,0,.3)"
        />
      </div>
    </div>

    <!-- tab -->
    <!--  @click="getTop()" -->
    <van-tabs v-model="active" >
      <van-tab title="店铺首页" >
        <div class="g-shop">
             <div class="g-recommend px-1 bg-white pb-2">
          <div class="tt relative py-1">店主推荐</div>
          <ul class="flex w-full justify-between">
            <li
              class="flex-1"
              :class="{'px-1' : (index % 2) != 0}"
              v-for="(item,index) in shop.recommend"
              :key="index"
            >
              <img class="img" :src="item.url" alt />
              <p class="name truncate mt-1">{{item.name}}</p>
              <p class="price text-red-500">{{"¥" + item.price}}</p>
            </li>
          </ul>
        </div>
        <!-- 隔离 -->
        <div class="solation w-full pt-1 bg-gray-200"></div>

        <!-- 精选 -->
        <div class="g-boutique px-1 bg-white pb-2">
          <div class="tt relative py-1">精选推荐</div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" class="good-box my-1" >
              <img  class="img inline-block align-top" :src="item.url" alt />
              <div class="des inline-block px-1 align-top">
                <p class="name">{{item.name}}</p>
                <div class="sell-info w-2/3 inline-block align-middle pt-1">
                <p class="price text-red-500">{{"¥" + item.price}}</p>
                <p class="comment-egg text-gray-500 ">
                  <span>{{item.payNum}}</span>  <span class="pl-1">{{item.comment}}</span>
                </p>
              </div>
                <p class="see w-1/3 inline-block align-middle text-red-500 bg-red-100 text-center rounded-full">去看看</p>
              </div>
            </van-cell>
          </van-list>
        </div>
        </div>
      </van-tab>

      <van-tab title="全部精品"  >
          <div class="g-goods aa"  ref="aa" >
            <van-tabs v-model="active1" sticky @click="goodsTitleClick" >
              <van-tab v-for="(item,index) in goodsTitle" :key="index">
                <div slot="title">
                  <div v-if="index == 2">
                   <div class="relative" >
                    价格
                    <van-icon name="arrow-up" :class="{textRed: goodsOrder && active1 == 2}" size=".3rem" style="position: absolute;top: 13px;"/>
                    <van-icon name="arrow-down" :class="{textRed: !goodsOrder && active1 == 2}"  size=".3rem" style="position: absolute;top: 22px;"/>
                  </div>
                </div>
                <div v-else>
                    {{item}}
                </div>
                </div>

                <!-- 商品列表 -->
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadGoods"
              >
               <!-- 商品列表 -->
              <van-row class="m-goods content" >
                
                <van-col span="12" class=" bg-gray-200 " v-for="(item,index) in goods" :key="index" >
                  <div class="item py-1 mb-0 rounded " :class="{itemMarR: index % 2 == 0,itemMarL : index % 2 != 0}" @click="GoodInfo(item.id)">
                    <img :src="item.thumbnail_pic_s" class="img px-1">
                    <p class="name text-gray-700 text-left m-0 mt-1 px-1  truncate">{{item.name}}</p>
                    <p class="price text-left m-0 px-1 pt-1">                                      
                        <span class="Symbol text-red-500 "> {{"¥" + item.price}}</span>                      
                    </p>
                    <p class="comment-egg text-gray-500 px-1 truncate">
                    <span>{{item.payNum}}</span>  <span class="pl-1">{{item.comment}}</span>
                    </p>
                    
                  </div>
                </van-col>
              </van-row>
              </van-list>
              
              </van-tab>
            </van-tabs>
    
        </div>
      </van-tab>
      <van-tab title="店铺简介" >
        <div class="g-info bg-white">
            <div class="header relative my-1">
              <img class="icon shop-icon absolute top-0 left-0  my-1" :src="shop.iconUrl" alt />
              <div class="des absolute top-0 left-0 mt-1 ml-8">
                 <p class="name truncate  ">{{shop.name}}</p>
                 <p class="attention">{{shop.num + "+粉丝" }}</p>
              </div>
            </div>
        <div class="shop-data mt-1 ">
              <ul>
                <li class="py-1">
                  <div class="icon comment inline-block align-middle"></div> <span class="align-middle mx-1 ">用户口碑</span> <span class="text-red-500 align-middle ml-1">4.8高于同行4.13%</span>
                </li>
                 <li class="py-1 border-t border-b border-gray-200">
                  <div class="icon server inline-block align-middle"></div> <span class="align-middle mx-1 ">服务态度</span> <span class="text-red-500 align-middle ml-1">4.77高于同行4.07%</span>
                </li>
                 <li class="py-1">
                  <div class="icon delivery inline-block align-middle"></div> <span class="align-middle mx-1 ">发货速度</span> <span class="text-red-500 align-middle ml-1">4.76高于同行2.51%</span>
                </li>

                 <li class="py-1 mt-1" @click="toLicenses">
                  <div class="icon license inline-block align-middle"></div> <span class="align-middle mx-1 ">证件信息</span> <van-icon name="arrow" color="cacaca" class="align-middle ml-24"  />
                </li>
              </ul>
            </div>

          
         
        </div>

      </van-tab>
    </van-tabs>
    <!-- <van-button type="primary" @click="gogogo">To Customer Home Page</van-button>
    <van-button type="primary" plain @click="tototo">To User Login Page</van-button>-->
 
  
  </div>
</template>

<script>
    export default {
   mounted: function() {
     this.getclientHeight()   
  },
  created() {

  },
  computed: {
    levelClass: function() {
      return {
        word:
          this.shop.grade.word.value == '高'
            ? 'high'
            : this.shop.grade.word.value == '中'
            ? 'mid'
            : 'low',
        service:
          this.shop.grade.word.value == '高'
            ? 'high'
            : this.shop.grade.word.value == '中'
            ? 'mid'
            : 'low',
        delivery:
          this.shop.grade.word.value == '高'
            ? 'high'
            : this.shop.grade.word.value == '中'
            ? 'mid'
            : 'low'
      }
    },
  

  },
  data() {
    return {
      shop: {
        iconUrl:
          'https://sf6-ttcdn-tos.pstatp.com/obj/temai/FhlP-vC59uFoyWXtwcWlknjGqiu_.png',
        name: '巧妇9妹鲜货旗舰店',
        num:999,
        grade: {
          word: { value: '高', num: '4.79' },
          service: { value: '高', num: '4.76' },
          delivery: { value: '高', num: '4.75' }
        },
        bg:
          '欢迎来到9妹家店铺，更多新鲜水果等你带回家哦！ -- 售前电话：17777961298 、18377709992  售后电话：18377706699、17777960197、15994667074',
        recommend: [
          {
            name: '巧妇9妹荔乡阉鸡 农家300天散养原鸡6-7斤 现杀现发顺丰空运包邮',
            price: '178',
            url:
              'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800'
          },
          {
            name: '巧妇9妹荔乡阉鸡 农家300天散养原鸡6-7斤 现杀现发顺丰空运包邮',
            price: '178',
            url:
              'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800'
          },
          {
            name: '巧妇9妹荔乡阉鸡 农家300天散养原鸡6-7斤 现杀现发顺丰空运包邮',
            price: '178',
            url:
              'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800'
          }
        ]
      },
      list: [],
      loading: false,
      finished: false,
      goodsTitle:["销量","新品","价格"],
      goodsOrder:false,
      active:0,
      active1:0,
      goods:[],
      timer:null,
      isGoTo:false,
      scroll:"",
      topV:0
    }
  },
  methods: {
    toLicenses() {
      location.assign('../customer/home.html')
    },
    GoodInfo(good_id) {
      console.log(good_id)
      location.assign('../good/info.html')
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            name: '巧妇9妹荔乡阉鸡 农家300天散养原鸡6-7斤 现杀现发顺丰空运包邮',
            price: '178',
            url:
              'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800',
            info: '巧妇9妹 自产霸王花干 无硫干货 农家手工自产 一级煲汤料包邮',
            payNum: "3000+人付款",
            comment:"98.5%好评",
            num:999
          })
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onLoadGoods(){
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goods.push({
            id:1,
            name: '巧妇9妹荔乡阉鸡 农家300天散养原鸡6-7斤 现杀现发顺丰空运包邮',
            price: '178',
            thumbnail_pic_s:'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800',
            info: '巧妇9妹 自产霸王花干 无硫干货 农家手工自产 一级煲汤料包邮',
            payNum: "3000+人付款",
            comment:"98.5%好评",
            promotion:true
          })
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.goods.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    goodsTitleClick(index, title) {

      this.gotoScroll()

      if(index == 2){
        if(this.goodsOrder ){
          this.goodsOrder = false;
        }else{
          this.goodsOrder = true;
        }
      }else{
         this.goodsOrder = false;
      }
    },

    getclientHeight() {
        let clientHeight = document.documentElement.clientHeight;
        return clientHeight;
    },
    
  
  
    gotoScroll (num) {
      let self = this;
      let clientHeight = document.documentElement.clientHeight;

      let top = Math.floor(159 * (clientHeight / 667));

      let osTop = document.documentElement.scrollTop || document.body.scrollTop
    
    // if(this.isGoTo){
        self.timer = setInterval(function () { 
         
          if (osTop === top) {
            clearInterval(self.timer)
            this.isGoTo = false;
          
          }else{
            osTop = document.documentElement.scrollTop || document.body.scrollTop
            let ispeed = Math.floor((top - osTop) / 5) == 0 ? 1:  Math.floor((top - osTop) / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
          }
        }, 60)
    // }
    },

  }
}
</script>

<style lang="postcss" scope>
.high {
  @apply bg-red-500 text-white ;
}
.textRed{
  @apply text-red-500;
}
.itemMarR{
  margin: 16px 8px 8px 16px;
}
.itemMarL{
  margin: 16px 16px 8px 8px;
}
</style>
<style lang="scss" scope>
body,html{
  background: #f4f5f6;
}
.van-notice-bar{
  height:50px!important;
}
.g-header {
  width: 100%;
  height: 230px;
  background: url('https://tms3.pstatp.com/foreground/static/img/Bitmap@3x.png')
    no-repeat;
  background-size: 100% 100%;
  .shop-icon {
    width: 96px;
    height: 96px;
    margin:70px 0 0 30px ;
  }
  
  .shop-info {
    width: 60%;
    margin:70px 0 0 155px;
    .shop-name {
      font-size: 30px;
      line-height: 30px;
    }
    .eva-name {
      line-height: 32px;
    }
    .value{
      padding:0 2px;
      border-radius: 2px;
    }
    .num{
      margin:0 2px;
    }
    .split::before {
      width: 2px;
      height: 30px;
      background: #ccc;
      content: '';
      position: absolute;
      right: 30px;
      top: 20px;
    }
  }
}

.g-shop{
  .g-recommend {
  .tt {
    font-size: 28px;
    color: #363636;
  }
  .tt::before {
    width: 7px;
    height: 28px;
    background: red;
    content: '';
    position: absolute;
    left: -20px;
    top: 25px;
  }
  .name {
    width: 220px;
    height: 30px;
    line-height: 30px;
    font-size: 26px;
  }
  .price {
    height: 30px;
    font-size: 28px;
  }
  .img {
    // width:200px;
  }
}

// jingxuan
.g-boutique {
  .tt {
    font-size: 28px;
    color: #363636;
  }
  .tt::before {
    width: 7px;
    height: 28px;
    background: red;
    content: '';
    position: absolute;
    left: -20px;
    top: 25px;
  }
  .good-box{
    padding: 0;
    .img{
      width:200px;
      height:200px;    
    }
    .des{
      width: 505px;
      .name{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .comment-egg{
        font-size: 24px;
        height:24px;
        line-height:20px;
      }
    }
  }
}
}
  .m-goods{
    .item{
      background: #fff;
      height: 500px;
        .img {
              width: 100%;
              // height: 250px;
              border-radius: .125rem;
            }
        .price{
          font-size: .4rem;
          line-height: 40px;      
        }
    }
  }

.g-info{

  .header{
     height:120px;
     margin:25px 30px;
    .icon{     
      width: 1.28rem;
      height: 1.28rem;
    }
    .des{
       width: 60%;
    }
    .name{
      font-size: 30px;
    }
    .attention{
      color: #999;
    }
  }
  .shop-data{
    margin:0 30px;
    font-size: 26px;
    .comment{
    width: 48px;
    height:48px;
    background: url("https://tms3.pstatp.com/foreground/static/img/license.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
    
    }
    .server{
    width: 48px;
    height:48px;
    background: url("https://tms3.pstatp.com/foreground/static/img/license.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
    background-position: 0 -2.05333rem;
    }
    .delivery{
    width: 48px;
    height:48px;
    background: url("https://tms3.pstatp.com/foreground/static/img/license.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
    background-position: 0 -.68444rem;
    }
    .license{
    width: 48px;
    height:48px;
    background: url("https://tms3.pstatp.com/foreground/static/img/license.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100%;
    background-position: 0 -1.36889rem;
    }
  
  }


}
</style>
