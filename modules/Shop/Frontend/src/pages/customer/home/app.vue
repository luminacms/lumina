<template>
  <div id="app">
      <div class="tab" ref="tab">
            <ul ref="tabWrapper" class="ultab">
                <li :class="{red: item.id === active}" v-for="item in tabList" :key="item.id" @click="clickTab(item.id)" ref="tabitem">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
  mounted() {
     this.$nextTick(() => {
                this.InitTabScroll();
                let a = document.querySelector(".ultab .red")
                console.log(a);
                this.scroll.scrollToElement(a, 0, 0)
            });

  },
  data() {
    return {
      msg: 'Use Vue 2.0 Today!', 
      tabList: [{
                    id: '',
                    name: "全部"
                },
                {
                    id: 0,
                    name: "待接单"
                },
                {
                    id: 1,
                    name: "待发货"
                },
                {
                    id: 2,
                    name: "待收货"
                },
                {
                    id: 3,
                    name: "已完成"
                },
                {
                    id: 4,
                    name: "已取消"
                },
            ],

    }
  },

  methods: {
    startHacking() {
      this.$notify({
        title: 'It Works',
        message:
          "We have laid the groundwork for you. Now it's your time to build something epic!",
        duration: 6000
      })
    },
    InitTabScroll() {
                let width = 0
                for (let i = 0; i < this.tabList.length; i++) {
                    width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
                }
                this.$refs.tabWrapper.style.width = width + 'px';
                this.scroll = new BScroll(this.$refs.tab, {
                    startX: 0,
                    click: true,
                    scrollX: true,
                    scrollY: false,
                    bounce: false,
                    eventPassthrough: 'vertical'
                });
            },
  }
}
</script>

<style lang="postcss">
body {
  background-color: #f5f5f5;
}
:root h1 {
  --color: red;
  display: flex;
  color: var(--color);
}
</style>
