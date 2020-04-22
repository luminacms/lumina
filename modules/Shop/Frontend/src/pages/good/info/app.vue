<template>
  <div class="app">
    <div class="swiper">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for=" (item, index) in swiper" :key="index">
          <img :src="item" alt />
        </van-swipe-item>
      </van-swipe>

      <div class="g-activity bg-pink-500 h-6 clearfix p-1 text-white" v-if="!Sel_active">
        <div class="act_l inline-block align-middle w-2/3">
          <span class="price align-middle">{{"¥ "+ price}}</span>
          <span class="border border-white align-middle ml-1">{{ Sel_active == 0 ? "预售" : "售中"}}</span>
        </div>
        <div class="act_r inline-block w-1/3 text-right align-middle">
          <p>{{ end_data.data}}</p>
          <p>{{end_data.hour+ "结束"}}</p>
        </div>
      </div>
    </div>

    <div class="g-info">
      <div class="good_name p-1 pb-0 font-black">{{name}}</div>
      <div class="price text-red-500 px-1 font-bold" v-if="Sel_active">¥18.5~¥65</div>
      <div class="recommend px-1 pt-1">{{"商家推荐语："+recommend}}</div>
      <div class="text-gray-500 p-1 flex">
        <span class="flex-1">广西壮族自治区快递</span>
        <span class="flex-1 text-center">包邮</span>
        <span class="flex-1 text-right">已售500+件</span>
      </div>
      <!-- 物流 -->
      <div class="logistics border-t border-b border-gray-200 px-1 h-4">
        <span class="key align-middle">物流</span>
        <span class="val align-middle text-red-500 pl-1">店铺预售，7月16日12:6:6前发货</span>
      </div>
      <!-- 服务 -->
      <div class="serve px-1 border-gray-200 border-b-8" @click="serverPopShow">
        <div class="w-4/5 inline-block align-middle">
          <span class="key align-top inline-block">服务</span>
          <div class="val inline-block w-2/3 pl-1 align-middle">
            <div class="middle inline-block mr-1">
              <span class="icon inline-block align-middle"></span>
              <span class="align-middle">假一赔三</span>
            </div>
            <div class="middle inline-block">
              <span class="icon inline-block align-middle"></span>
              <span class="align-middle">消费者保障服务</span>
            </div>
            <div class="middle inline-block">
              <span class="icon inline-block align-middle"></span>
              <span class="align-middle">评价抽10元大礼包</span>
            </div>
          </div>
        </div>

        <div class="w-1/5 text-right inline-block align-middle">
          <van-icon name="arrow" size=".4rem" color="#999" class="align-middle" />
        </div>
      </div>

      <!-- 商品参数 -->
      <div class="parameters p-1 border-gray-200 border-b-8" @click="parametersPopShow">
        <div class="align-middle inline-block w-1/2">
          <span class="key align">商品参数</span>
        </div>
        <div class="align-middle inline-block w-1/2 text-right">
          <van-icon name="arrow" size=".4rem" color="#999" class="align-middle" />
        </div>
      </div>
    </div>

    <!-- 评论 -->

    <div class="g-comment px-1">
      <div class="top py-1">
        <div class="tt inline-block w-1/2">商品评价</div>
        <div class="tot inline-block w-1/2 text-right" @click="gotoComment">
          <span class="align-middle">{{ comment.tot + "条"}}</span>
          <span class>
            <van-icon name="arrow" size=".4rem" color="#999 " class="align-middle" />
          </span>
        </div>
      </div>
      <div class="com-items py-1">
        <van-tag
          round
          v-for=" (item ,index) in comment.items"
          :key="index"
          color="#e0e0e0"
          class="text inline-block mr-1"
        >{{ item.text }}</van-tag>
      </div>

      <div class="com-list">
        <div class="item pb-1" v-for="(item ,index) in comment.list" :key="index">
          <div class="user">
            <img :src="item.headImg " alt class="w-4 rounded-full inline-block" />
            <span class="name ml-1">{{ item.username |formatName}}</span>
          </div>

          <div class="desc my-1">{{item.desc}}</div>

          <div class="img pb-1">
            <ul>
              <li class="w-1/4 inline-block" v-for="(items ,index) in item.img" :key="index">
                <img :src="items" alt class="w-full" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- shop -->
    <div class="g-shop">
      <!-- shop_top -->
      <div class="shop-top p-1">
        <div class="left w-2/3 inline-block">
          <img
            src="https://sf6-ttcdn-tos.pstatp.com/obj/temai/FhlP-vC59uFoyWXtwcWlknjGqiu_.png"
            alt="logo"
            class="logo inline-block align-middle"
          />
          <div class="info w-2/3 inline-block align-middle pl-1">
            <p class="name">巧妇9妹鲜货旗舰店</p>
            <p class="des text-gray-500">精选店铺</p>
          </div>
        </div>
        <div class="right w-1/3 inline-block text-right">
          <div
            class="border inline-block rounded-sm border-red-500 text-red-500 toSee text-center"
          >进店逛逛</div>
        </div>
      </div>
      <!-- shop_data -->
      <div class="shop-data flex text-center p-1">
        <div class="flex-grow">
          <p class="goods_tot">16</p>
          <p class="text">全部商品</p>
        </div>
        <div class="flex-grow-0 border-l border-r border-gray-200 px-3">
          <p class="attention_tot">28.8万</p>
          <p class="text">关注人数</p>
        </div>
        <div class="flex-grow">
          <p>
            <span class="text">用户口碑</span>
            <span class="text px-1 text-red-500">4.80</span>
            <span class="text-red-500 border border-red-500 font-bold">高</span>
          </p>

          <p>
            <span class="text">服务态度</span>
            <span class="text px-1 text-red-500">4.77</span>
            <span class="text-red-500 border border-red-500 font-bold">高</span>
          </p>

          <p>
            <span class="text">发货速度</span>
            <span class="text px-1 text-red-500">4.76</span>
            <span class="text-red-500 border border-red-500 font-bold">高</span>
          </p>
        </div>
      </div>

      <!-- goods -->
      <div class="goods p-1 border-gray-200 border-b-8">
        <ul class>
          <li class="relative mr-1 inline-block w-full">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img w-full"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
          <li class="relative mr-1 inline-block">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
          <li class="relative mr-1 inline-block">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
          <li class="relative mr-1 inline-block">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
          <li class="relative mr-1 inline-block">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
          <li class="relative mr-1 inline-block">
            <img
              src="https://sf3-ttcdn-tos.pstatp.com/img/temai/Fvh6lE66Tz13B5GJHTGScVWBzSmPwww800-800~360x360_q75.jpeg"
              alt="商品图"
              class="goods-img"
            />
            <p
              class="price absolute w-full bottom-0 left-0 h-2 bg-black opacity-75 text-white pl-1"
            >¥68</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- good-info -->

    <van-tabs v-model="goods_active">
      <van-tab title="商品详情">
        <div class="g-goodInfo">
          <div class="top p-1">
            <span class="text-center inline-block w-1/3 bg-gray-200 border border-gray-300 h-3">品牌</span>
            <span class="text-center inline-block w-2/3 h-3 border border-l-0 border-gray-300">巧妇9妹</span>
          </div>

          <div class="html">
            <div class="tt bg-gray-200 text-center text-gray-500 h-4">
              --
              <span class="px-1 h-4 inline-block">图文详情</span>
              --
            </div>
            <div class="container" v-html="html"></div>
          </div>
        </div>
      </van-tab>

      <van-tab title="咨询与售后">
        <div class="g-counsel pb-6">
          <van-collapse accordion v-model="counsel_active">
            <van-collapse-item
              title="我的订单如何查询物流进度？"
              name="1"
              class="issue"
            >划线价格：指商品的专柜价，吊牌价，正品零售价，厂商指导价或该商品曾经展示的售卖价，并非原价，仅供参考。</van-collapse-item>
            <van-collapse-item
              title="划线价和未划线价格的含义是什么？"
              name="2"
              class="issue"
            >未划线价格：指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动或者会员使用优惠券、积分等发生变化，最终以订单结算价格为准。</van-collapse-item>
            <van-collapse-item
              title="用户协议有哪些？"
              name="3"
              class="issue"
            >注：本页面评论内容仅代表发布者个人观点，并不代表平台的立场、观点或者评价，更多协议请查看</van-collapse-item>
          </van-collapse>
        </div>
      </van-tab>
    </van-tabs>

    <div class="tabbar">
      <van-goods-action>
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-button type="danger" text="立即购买" @click="buyPopShow" />
      </van-goods-action>
    </div>

    <!-- 服务弹层 -->
    <van-popup v-model="serverPop_show" position="bottom">
      <div class="serverPopC">
        <div class="tt text-center p-2">服务说明</div>
        <ul class="px-3 pb-8">
          <li class="mb-4">
            <span class="pay inline-block align-top w-1/12"></span>
            <div class="text_desc inline-block pl-1 align-top w-11/12">
              <p class="tt">假一赔三</p>
              <p class="desc">为了保障消费者权益，平台商品支持假一赔三。</p>
            </div>
          </li>
          <li class="mb-4">
            <span class="service inline-block align-top w-1/12"></span>
            <div class="text_desc inline-block pl-1 align-top w-11/12">
              <p class="tt">消费者保障服务</p>
              <p class="desc">该卖家已缴纳保证金，如有商品质量问题，描述不符等，您有权申请退款或退货。</p>
            </div>
          </li>
          <li class="mb-4">
            <span class="gift inline-block align-top w-1/12"></span>
            <div class="text_desc inline-block pl-1 align-top w-11/12">
              <p class="tt">评价抽10元大礼包</p>
              <p class="desc">已完成的订单评价后支持抽取10元大礼包，原创且有价值的评价更容易获得大奖。</p>
            </div>
          </li>
        </ul>

        <van-button type="danger" class="w-full" @click="serverPopClose">完成</van-button>
      </div>
    </van-popup>

    <!-- 商品参数弹层 -->
    <van-popup v-model="parametersPop_show" position="bottom">
      <div class="parametersPopC">
        <div class="tt text-center p-2">商品参数</div>
        <ul class="px-3 pb-8">
          <li class="mb-4 border-b border-gray-200">
            <span class="inline-block align-middle w-1/3 tt">品牌</span>
            <span class="inline-block align-middle w-2/3 desc">巧妇9妹</span>
          </li>
        </ul>
      </div>
      <van-button type="danger" class="w-full" @click="parametersPopClose">完成</van-button>
    </van-popup>
    <!-- 购买弹层 -->

    <van-popup v-model="buyPop_show" position="bottom">
      <div class="buyPopC">
        <div class="absolute right-0 top-0 mt-1 mr-1" @click="buyPopClose">
          <van-icon name="cross" size="20" />
        </div>
        <div class="good-info p-1">
          <img
            src="https://sf6-ttcdn-tos.pstatp.com/img/temai/FuAS0-aUHYq4xW0rOxaubFH54bP1www750-750~1000x1000_q50.jpeg"
            alt
            class="h-10 inline-block"
          />
          <div class="desc inline-block align-bottom ml-1">
            <p class="price text-red-500 font-bold">{{ "¥ " +ComputedPrice}}</p>
            <p class="spec" v-if="spec_idx != null">{{ "已选择 " + spec.items[spec_idx]["text"]}}</p>
            <p class="spec text-gray-500" v-if="spec_idx == null">{{ "请选择 " + spec.title}}</p>
          </div>
        </div>

        <div class="good-spec p-1">
          <div class="tt text-gray-600">{{spec.title}}</div>
          <div class="spec_item">
            <van-tag
              :class=" {'specAction' :spec_idx == index }"
              class="mr-1 mt-1 colorDef"
              color="#f4f5f6"
              v-for="(item ,index) in spec.items"
              :key="index"
              :data-idx="index"
              @click="getSpecIdx($event)"
            >{{item.text}}</van-tag>
          </div>
        </div>

        <div class="count px-1 py-4">
          <div class="text inline-block w-1/2">购买数量</div>
          <div class="inline-block w-1/2 text-right">
            <van-stepper v-model="goodNum" integer />
          </div>
        </div>
      </div>
      <van-button type="danger" class="w-full" @click="gotoPay">确认</van-button>
    </van-popup>
  </div>
</template>

<script>
    import {
        Button,
        Collapse,
        CollapseItem,
        GoodsAction,
        GoodsActionButton,
        GoodsActionIcon,
        Icon,
        Popup,
        Stepper,
        Swipe,
        SwipeItem,
        Tab,
        Tabs,
        Tag,
        Toast
    } from 'vant'

    export default {
  components: {
    [Tag.name]: Tag,
    [Tab.name]: Tab,
    [Toast.name]: Toast,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Swipe.name]: Swipe,
    [Button.name]: Button,
    [Collapse.name]: Collapse,
    [Stepper.name]: Stepper,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [CollapseItem.name]: CollapseItem,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
      swiper: [
        'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800',
        'https://sf1-ttcdn-tos.pstatp.com/obj/temai/FkNKAi5oR-9LMK44SavSCquFdQ21www800-800'
      ],
      price: 156.8,
      Sel_active: 0,
      end_data: { data: '7月14日', hour: '12:06:06' },
      name: '巧妇9妹 金都一号红心火龙果 热带新鲜大红肉 净果6斤顺丰包邮',
      recommend:
        ' 金都一号优质大果红肉 当季水果 嫩滑甜美肉厚多汁 甜度高 6斤装 发顺丰',
      // 商品详细描述信息
      spec: {
        title: '优质金都一号 广西火龙果',
        items: [
          {"text":'金都一号 红心火龙果6斤（约9个）',"price":121},
          {"text":'包装：纸箱＋隔层＋网袋',"price":135},
          '发顺丰快递'
        ]
      },

      spec_idx: null,

      html:
        '<div><p><img src="https://sf3-ttcdn-tos.pstatp.com/obj/temai/FmsvmNQKyg6Dbm-kqJdxgbcOhULPwww790-326" style="max-width:100%;"><img src="https://sf1-ttcdn-tos.pstatp.com/obj/temai/FqAdjyS8_xLbknx8OiVYEaB8bTnxwww790-448" style="max-width:100%;"><img src="https://sf3-ttcdn-tos.pstatp.com/obj/temai/FqBuv8j6ZMoSJ9oldtlw_7jSEwc3www790-1014" style="max-width:100%;"><img src="https://sf6-ttcdn-tos.pstatp.com/obj/temai/FiBvAU9jH3ohZIZ3H8i9bY3n5Shvwww790-949" style="max-width:100%;"><img src="https://sf3-ttcdn-tos.pstatp.com/obj/temai/FjtK2RfLSawK7e4KEuLUm7sgaZbGwww790-697" style="max-width:100%;"><img src="https://sf1-ttcdn-tos.pstatp.com/obj/temai/FsGHuJPeXXC2hZUEqF2IIVSgSliewww790-631" style="max-width:100%;"><img src="https://sf6-ttcdn-tos.pstatp.com/obj/temai/Fu5Eo52Rn-_OOwwObbNhqAnzbfWTwww790-638" style="max-width:100%;"><img src="https://sf1-ttcdn-tos.pstatp.com/obj/temai/Fmr_FKrGYYk-5EP6dY_QDXtjoMQowww790-1116" style="max-width:100%;"><img src="https://sf1-ttcdn-tos.pstatp.com/obj/temai/Flu_zeXubD-Rh8VjgE-IvrNlHRyywww790-933" style="max-width:100%;"><img src="https://sf1-ttcdn-tos.pstatp.com/obj/temai/Fu5KdC7lF_Kp3dnfzzScI55JyMAhwww790-943" style="max-width:100%;"><img src="https://sf3-ttcdn-tos.pstatp.com/obj/temai/Fq0i10TYPtuEA2N-2oIw608ixcDmwww790-1121" style="max-width:100%;"><img src="https://sf6-ttcdn-tos.pstatp.com/obj/temai/FjFgJRLX0-Qi_YZdcZhBSLuZ5tpowww790-1024" style="max-width:100%;"></p></div>',
      goods_active: 0,
      counsel_active: 1,
      serverPop_show: false,
      parametersPop_show: false,
      buyPop_show: false,
      goodNum: 1,
      // 评论
      comment: {
        tot: 666,
        items: [
          { text: '味道很好(5)' },
          { text: '寄价钱特便宜(6)' },
          { text: '寄上身能够合适' }
        ],
        list: [
          {
            username: '请看我的话',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            desc: '十分好吃，还会继续买',
            img: [
              'http://p0.pstatp.com/origin/3796/2975850990',
              'https://sf3-ttcdn-tos.pstatp.com/img/temai/07c4b56…www1080-1440~240x0.image'
            ]
          },
          {
            username: '寄价钱特便宜',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            desc:
              '非常感谢九妹能做这件事，一来我们可以吃到这么好的鸡！二来也帮助了乡亲们赚多一些钱！这本就是件很好的事，非要有人说个是非对错，无非就是九妹忽悠大家，赚黑心钱！我在这里说一句，你们这些人太黑暗了！就我今天收到的这只鸡，在我心里就是无价的，就为了客服妹子给我电话说抱歉弄破了鸡内脏！就为了九妹到处宣传为了帮大家致富！难道做好事就不能赚钱吗？这只鸡九妹抛头去尾都未必能赚到50元吧！说风凉话的这些人们啊，看人挑担不累啊！九妹加油！我们这些真爱粉都会挺你到底！',
            img: [
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990'
            ]
          },
          {
            username: '寄价钱特便宜',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            desc:
              '就为了九妹到处宣传为了帮大家致富！难道做好事就不能赚钱吗？这只鸡九妹抛头去尾都未必能赚到50元吧！说风凉话的这些人们啊，看人挑担不累啊！九妹加油！我们这些真爱粉都会挺你到底！',
            img: []
          }
        ]
      },
      // 计算后价格
      ComputerPrice1:null,
      tot:1
    }
  },
  computed:{
    ComputedPrice:function(){
      let spec_idx = this.spec_idx;
      let spec = this.spec;
      let price;
      price = spec_idx == null ? this.price : spec.items[spec_idx]["price"];

  
      return price
    }
  },
  filters: {
    // 评论用户名格式化
    formatName: function(name) {
      name = name.toString()
      return name.substr(0, 1) + '**' + name.substr(3, 1)
    }
  },
  methods: {
    serverPopShow() {
      this.serverPop_show = true
    },
    serverPopClose() {
      this.serverPop_show = false
    },
    parametersPopShow() {
      this.parametersPop_show = true
    },
    parametersPopClose() {
      this.parametersPop_show = false
    },
    buyPopShow() {
      this.buyPop_show = true
    },
    buyPopClose() {
      this.buyPop_show = false
    },
    getSpecIdx(e) {
      let spec_idx = e.target.getAttribute('data-idx')
      if (this.spec_idx != null && this.spec_idx == spec_idx) {
        this.spec_idx = null
      } else {
        this.spec_idx = spec_idx
      }
    },
    gotoPay() {
      if (this.spec_idx == null) {
        Toast('请选择' + this.spec.title)
      } else {
        location.assign('../pay.html')
      }
    },
    gotoComment() {
      location.assign('../comment.html')
    }
  }
}
</script>

<style lang="scss" scope>
.g-activity {
  .act_l {
    .price {
      font-size: 40px;
    }
  }
}

.g-info {
  .good_name {
    font-size: 32px;
  }
  .recommend {
    font-size: 30px;
  }
  .price{
    font-size: 32px;
  }
  .logistics {
    .key {
      font-size: 30px;
      line-height: 2.4;
    }
    .val {
      font-size: 26px;
    }
  }
  .serve {
    height: 130px;
    .key {
      font-size: 30px;
      margin-top: 10px;
    }
    .val {
      font-size: 26px;
      height: 100%;
      .middle {
        margin-top: 10px;
        .icon {
          width: 28px;
          height: 28px;
          background: url(../../../assets/images/icon_true_red.png) 50%
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .parameters {
    .key {
      font-size: 32px;
    }
  }
}

.g-shop {
  .shop-top {
    .left {
      .logo {
        width: 80px;
        height: 80px;
      }
      .info {
        .name {
          font-size: 30px;
          line-height: 1;
        }
        .des {
          font-size: 26px;
          // line-height: 1;
        }
      }
    }
    .right {
      .toSee {
        font-size: 24px;
        padding: 10px;
      }
    }
  }
  .shop-data {
    .goods_tot,
    .attention_tot {
      font-size: 32px;
    }
    .text {
      font-size: 28px;
      // line-height: 1;
    }
  }
  .goods {
    overflow: hidden;
    overflow-x: scroll;
    scroll-behavior: smooth;
    ul {
      height: 2.4rem;
      white-space: nowrap;
      li {
        width: 2.4rem;
      }
    }
  }
}

.g-goodInfo {
  .top {
    font-size: 26px;
    span {
      line-height: 2;
    }
  }
  .html {
    .tt {
      span {
        line-height: 3;
      }
    }
  }
}

.g-counsel {
  .issue .van-cell:before {
    position: absolute;
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e95560;
    top: 0.55rem;
    left: 0.15rem;
  }
}

.tabbar .van-goods-action {
  z-index: 1100;
}

.serverPopC {
  .tt {
    font-size: 32px;
  }
  li {
    .pay,
    .service,
    .gift {
      width: 40px;
      height: 40px;
    }
    .pay {
      background: url(https://tms3.pstatp.com/foreground/static/img/product/compensate_icon@3x.png)
        no-repeat;
      background-size: 100% 100%;
    }
    .service {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAgVBMVEUAAAD5Wlr5WVn4WVn5Wlr6W1v7XFz/XFz/bW35Wlr5WVn5Wlr5Wlr6Wlr5Wlr5W1v/gID5Wlr/XFz5WVn5Wlr5WVn5WVn5Wlr5Wlr/YmL5Wlr4Wlr7W1v/Zmb5Wlr5Wlr6Wlr/X1/5WVn5WVn5Wlr5Wlr5WVn6WVn7W1v5Wlr4WVnQipclAAAAKnRSTlMA6vjlooIyHAnw3niHX5RaBHsh89fUz8RXDa9xQwe4smwXv7qpTaaLP8ZYoCIyAAAClElEQVRIx7VX6ZqqMAwVBGTfRERBZBR1bt//AW8KStqGZebjm/xRaA45Wdtu/kZ2VdB4XhNUu18CLa/es0H2tWf9FPmVZIxIlnz9hG2o9+ra0Qh9PzSOWv+sh0v8bbODOkYgaO4Cw+ngpj3rq8uV8ogo2VHOV9wZ3wudK0Tji5HLjRdTWJMTLi9Ty5eSkzfH3T3D0iGd8yo9gMp5zHGOvZ7m43m6cvQ4Zz9eSmTsjzEvOHaEzvamvOHoQsmRDpxH7B7ZQbUNzHVLCpYLsUJ/JTDxG6Lm2rLDTkq0irB1Nff5quTspY7kdgqkSwX6qHVsq1biWQJxrN4QiMhft25v3OcLT4HYBZwMhx4EDbkmva6Qw0dqb05pYWjc+kOoVPjop0MT6AWpDg3ewFGM8Sw5PEGNHJ8yxXALmq9YDt65R6Pp7O0fhFoMfQKkkKPoyfDWhoBbn9eGoFWpJYTp3A9RA8e87s+dsUCoIPRHkVYwEjB27/7AnORZw9d5PD4YP1xBdkDj/asJKlB835txaQTTGljsfTwKxQZFPtnNe+bEQ9GzqudpSKVXUhiGqcK/QU8mxPUr+kUF7JhY0U2fKV+sHf0yPZmRpA+5IuAtY9tpYawWwIQ2W5BcoE0CpiniOPLzTQiYnCoqCV3DVJEiWQZjkZDyJN2gjF6lPDc10F8E04zXpCWXwKQlcRgsgukwwDFExYe2RZHGEB2AFFzjAxmAZPQugHH00qGPYn3z5ReClaGPWRvZbjLmdVFtCRa3m8mN7sz+wTR0+wamG938FltAGQQ4GsgWO7+5PxkIlg/Z3GePFXGT6ZmHHyTHihUHmhVHqRWHuBXHx9UH1/VH5vWH9fXXhPUXFLwa3cWr0d2zVlzK/kL+A+PhbRdVlKvkAAAAAElFTkSuQmCC)
        no-repeat;
      background-size: 100% 100%;
    }
    .gift {
      background: url(https://tms3.pstatp.com/foreground/static/img/product/gift_icon@3x.png)
        no-repeat;
      background-size: 100% 100%;
    }
    .text_desc {
      .tt {
        font-size: 26px;
      }
    }
    p.desc {
      font-size: 24px;
      color: #999;
    }
  }
}

.parametersPopC {
  .tt {
    font-size: 32px;
  }
  ul {
    min-height: 650px;
    li {
      .tt {
        color: #999;
        font-size: 28px;
      }
      .desc {
        font-size: 28px;
      }
    }
  }
}

.buyPopC {
  min-height: 850px;
  .good-info {
    .desc {
      .price {
        font-size: 28px;
      }
      .spec {
        font-size: 26px;
      }
    }
  }

  .good-spec {
    .specAction {
      background-color: #e95560 !important;
      color: white !important;
    }
    .colorDef {
      color: #505050;
    }
  }

  .count {
    .text {
      font-size: 28px;
    }
  }
}

.g-comment {
  .top {
    .tt {
      font-size: 32px;
    }
    .tot {
      font-size: 26px;
    }
  }

  .com-items {
    .text {
      color: #505050;
      padding: 0.5em 0.7em;
    }
  }

  .com-list {
    .item:after {
      position: absolute;
      height: 2px;
      left: 0;
      right: 0;
      z-index: 1;
      content: '';
      background: #e8e8e8;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .name{
      font-size: 26px;
    }
    .desc {
      font-size: 28px;
      color: #222;
      line-height: 0.56rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .img {
      img {
        box-sizing: border-box;
        padding: 3px;
      }
    }

  }


}
</style>
