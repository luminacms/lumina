<template>
  <div class="app">
    <van-skeleton :title="false" avatar :row="5" :loading="loading" :row-width="sw" />

    <div class="my" v-show="!loading">
      <div class="userInfo border-b-8 border-gray-200 border-t-8 ">
        <img
          src="https://mirror-gold-cdn.xitu.io/168e08d7e9f39f1a490?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
          alt class="avatar inline-block align-middle" />

        <div class="spec-info inline-block align-middle ml-1">
          <div class="name text-gray-600">
            张迪
          </div>
          <div class="amendBtn text-gray-600  " @click="toEdite">修改资料</div>
        </div>
      </div>

      <!-- 订单 -->
      <div class="order">
        <van-cell-group>
          <van-cell title="我的订单" class="text-gray-700" />
        </van-cell-group>

        <!-- <van-divider /> -->
        <div class="flex bg-white py-2 border-b-8 border-gray-200">
          <div class="flex-1 text-center" @click="toOrder($event)" data-kind="0">
            <van-icon name="orders-o" size="30" color="#aaa" />
            <p class="text-gray-700">全部订单</p>
          </div>
          <div class="flex-1 text-center" @click="toOrder($event)" data-kind="1">
            <van-icon name="pending-payment" size="30" color="#aaa" info="2" />
            <p class="gtext-gray-700">代付款</p>
          </div>
          <div class="flex-1 text-center" @click="toOrder($event)" data-kind="2">
            <van-icon name="paid" size="30" color="#aaa" />
            <p class="text-gray-700">已付款</p>
          </div>
        </div>
      </div>

      <!-- 收藏 -->
      <van-cell-group>
        <van-cell title="商店首页" icon="home-o" color="#aaa" is-link @click="toHome" />
        <van-cell title="我的收藏" icon="star-o" color="#aaa" is-link @click="toList" />
      </van-cell-group>
    </div>


    <!-- <xTabbar :tabbarActive=3></xTabbar> -->
  </div>



</template>

<script>
  import {
    Icon,
    Cell,
    Divider,
    CellGroup,
    Skeleton
  } from 'vant'
  import xTabbar from '../components/tabbar'
  export default {
    components: {
      [Icon.name]: Icon,
      [Skeleton.name]: Skeleton,
      [Cell.name]: Cell,
      [Divider.name]: Divider,
      [CellGroup.name]: CellGroup,
      xTabbar
    },

    data() {
      return {
        loading:false,
        sw:["30%","100%"]
      }
    },
    methods: {
      toOrder(e) {
        console.log("order")
        let orderKind = e.currentTarget.dataset.kind;
        location.assign('../order.html?kind=' + orderKind);
      },
      toEdite() {
        location.assign('../my/edit.html');
      },
      toList() {
        location.assign('../list.html');
      },
      toHome() {
        location.assign('../index.html');
      }

    }
  }
</script>

<style lang="scss" scope>
  html,
  body {
    background: #f0f0f0;
  }

  .userInfo {
    padding: 20px 44px;
    background: white;

    //   border-bottom: 10px solid #e4e5e6;
    //   border-top: 10px solid #e4e5e6;
    img {
      width: 20%;
      border-radius: 50%;
    }
  }

  .order {
    background: white;

    .tt {
      padding: 0 44px;
      height: 70px;
      line-height: 70px;
      color: #456;
      // border-bottom: 2px solid #e4e5e6;
    }
  }
</style>