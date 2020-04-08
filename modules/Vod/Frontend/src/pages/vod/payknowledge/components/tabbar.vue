<template>
    <div class="tabbar">
          <van-tabbar v-model="idx" active-color="#FDD424">
            <van-tabbar-item icon="home-o" @click="toHome">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="kind">分类</van-tabbar-item>
            <van-tabbar-item icon="shop"  to="cart">专栏</van-tabbar-item>
            <van-tabbar-item icon="contact" @click="toMy">我的</van-tabbar-item>
          </van-tabbar>
    </div>
</template>

<script>
import {Tabbar, TabbarItem, } from 'vant';

export default {
   components: {
       [Tabbar.name]:Tabbar,
       [TabbarItem.name]:TabbarItem
   },
   data() {
     return {
       idx:this.tabbarActive
     }
   },
   props: ['tabbarActive'],
    methods: {
    toHome(){
        location.assign('../index.html')
    },
    toMy(){
        location.assign('../my.html')
    }
},

}
</script>

<style lang="sass" scoped>

</style>
