<template>
  <div class="app py-2">
    <div class="g-top border-gray-200 px-1 border-b-8 pb-2">
      <div class="text aligin-middle inline-block mr-1">评分</div>
      <div class="align-middle inline-block">
        <van-rate v-model="comment.comLevel" readonly gutter="15px" size="25px" />
      </div>

      <div class="comKind">
        <van-tag
          round
          :class="{'comKindSel' :index == comKind_idx}"
          color="#f4f5f6"
          class="mt-1 ml-1"
          v-for="(item ,index) in comment.comKind"
          :key="index"
          :data-idx="index"
          @click="getComKindIdx($event)"
        >{{item}}</van-tag>
        <!-- <van-collapse v-model="activeNames">
                            <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
                            <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
                            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
        </van-collapse>-->
      </div>
    </div>
    <!-- List -->
    <div class="comList">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in comment.list" :key="index">
          <div
            class="item border-gray-200 pb-1 px-1 border-b-8"
            v-for="(item, index) in comment.list"
            :key="index"
          >
            <!-- userinfo -->
            <div class="user py-1">
              <div class="w-1/2 inline-block">
                <img :src="item.headImg " alt class="w-4 rounded-full inline-block align-middle" />
                <div class="des inline-block align-middle ml-1">
                  <p class="name">{{ item.username |formatName}}</p>
                  <p class="text-gray-500">{{item.time}}</p>
                </div>
              </div>
              <div class="w-1/2 inline-block text-right">
                <van-rate
                  v-model="comment.comLevel"
                  readonly
                  gutter="1px"
                  size="5px"
                  class="inline-block"
                />
              </div>
            </div>

            <!-- des -->
            <div class="des" v-if="item.desc">{{item.desc}}</div>
        
           <div class="des" v-else>此用户没有填写评价</div>
         
            <!-- img -->
            <div class="img">
              <ul>
                <li class="w-1/4 inline-block" v-for="(items ,index) in item.img" :key="index">
                  <img :src="items" alt class="w-full" />
                </li>
              </ul>
            </div>
            <!-- sku -->
            <div class="sku text-gray-500 truncate">{{item.sku}}</div>
            <!-- 商家回复 -->
            <div class="reply py-1 px-1 bg-green-100 text-gray-600">{{ "商家回复: " + item.reply}}</div>

            <!-- 点赞 -->

            <div class="like border border-gray-100 h-4 w-8 text-center pt-1 mt-1" @click="hitLike">
              <van-icon name="thumb-circle-o" size="20px" class="inline-block align-middle" />
              <span class="inline-block aligin-middle pl-1">{{item.like}}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
    import {Collapse, CollapseItem, Icon, List, Rate, Tag, Toast} from 'vant'

    export default {
  components: {
    [Icon.name]: Icon,
    [Rate.name]: Rate,
    [Toast.name]: Toast,
    [Tag.name]: Tag,
    [List.name]: List,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  filters: {
    // 评论用户名格式化
    formatName: function(name) {
      name = name.toString()
      return name.substr(0, 1) + '**' + name.substr(3, 1)
    }
  },
  data() {
    return {
      comment: {
        comLevel: 5,
        comKind: [
          '全部(666)',
          '好评(566)',
          '有图(215)',
          '追评(52)',
          '味道好(10)',
          '便宜(20)'
        ],
        list: [
          {
            username: '请看我的话',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            desc: '十分好吃，还会继续买',
            time: '5月25日 下午1:01',
            sku: '荔乡阉鸡 300天自家散养 9妹力荐:宰杀后净重4-4.5斤：198元/只',
            img: [
              'http://p0.pstatp.com/origin/3796/2975850990',
              'https://sf3-ttcdn-tos.pstatp.com/img/temai/07c4b56…www1080-1440~240x0.image'
            ],
            reply:
              '商家回复：感谢大家对9妹的支持与认可！9妹会不忘初心，砥砺前行，做好自己！且行且珍惜！也希望大家收到9妹家的荔乡阉鸡，吃得放心，吃得开心！',
            like: 15
          },
          {
            username: '寄价钱特便宜',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            sku: '荔乡阉鸡 300天自家散养 9妹力荐:宰杀后净重4-4.5斤：198元/只',
            desc:
              '非常感谢九妹能做这件事，一来我们可以吃到这么好的鸡！二来也帮助了乡亲们赚多一些钱！这本就是件很好的事，非要有人说个是非对错，无非就是九妹忽悠大家，赚黑心钱！我在这里说一句，你们这些人太黑暗了！就我今天收到的这只鸡，在我心里就是无价的，就为了客服妹子给我电话说抱歉弄破了鸡内脏！就为了九妹到处宣传为了帮大家致富！难道做好事就不能赚钱吗？这只鸡九妹抛头去尾都未必能赚到50元吧！说风凉话的这些人们啊，看人挑担不累啊！九妹加油！我们这些真爱粉都会挺你到底！',
            time: '5月25日 下午1:01',
            img: [
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990'
            ],
            like: 15,
            reply:
              '感谢您对9妹的信任和支持！9妹家的阉鸡都是9妹自己家散养300天以上的，吃的都是玉米或者自己在野外觅食。收到阉鸡请即时打开食用或放入冰箱冰冻保存，不要在久置常温。9妹给大家分享些家常鸡做法哦，1.两广的朋友非常喜欢的水蒸鸡和白切鸡 2.江苏，重庆等地区的朋友们是不是更喜欢做荷叶鸡和辣子鸡呢，鸡的做法9妹会多在视频分享给大家，或者是跟着9妹携带的温馨提示做法来试试哦。希望您喜欢9妹家的大阉鸡，收到鸡有什么问题，请签收后第一时间联系9妹处理。感谢您的支持，在此祝您生活愉快 ~ '
          },
          {
            username: '寄价钱特便宜',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            sku: '荔乡阉鸡 300天自家散养 9妹力荐:宰杀后净重4-4.5斤：198元/只',
            desc:
              '就为了九妹到处宣传为了帮大家致富！难道做好事就不能赚钱吗？这只鸡九妹抛头去尾都未必能赚到50元吧！说风凉话的这些人们啊，看人挑担不累啊！九妹加油！我们这些真爱粉都会挺你到底！',
            time: '5月25日 下午1:01',
            img: [],
            like: 15,
            reply:
              '商家回复：感谢大家对9妹的支持与认可！9妹会不忘初心，砥砺前行，做好自己！且行且珍惜！也希望大家收到9妹家的荔乡阉鸡，吃得放心，吃得开心！'
          }
        ]
      },
      comKind_idx: 0,
      activeNames: ['1'],
      loading: false,
      finished: false
    }
  },

  methods: {
    getComKindIdx(e) {
      this.comKind_idx = e.target.getAttribute('data-idx')
    },
    hitLike() {
      Toast('点赞成功!')
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          let obj = {
            username: '寄价钱特便宜',
            headImg: ' http://p0.pstatp.com/origin/3796/2975850990',
            sku: '荔乡阉鸡 300天自家散养 9妹力荐:宰杀后净重4-4.5斤：198元/只',
            desc:
              '非常感谢九妹能做这件事，一来我们可以吃到这么好的鸡！二来也帮助了乡亲们赚多一些钱！这本就是件很好的事，非要有人说个是非对错，无非就是九妹忽悠大家，赚黑心钱！我在这里说一句，你们这些人太黑暗了！就我今天收到的这只鸡，在我心里就是无价的，就为了客服妹子给我电话说抱歉弄破了鸡内脏！就为了九妹到处宣传为了帮大家致富！难道做好事就不能赚钱吗？这只鸡九妹抛头去尾都未必能赚到50元吧！说风凉话的这些人们啊，看人挑担不累啊！九妹加油！我们这些真爱粉都会挺你到底！',
            time: '5月25日 下午1:01',
            img: [
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990',
              'http://p0.pstatp.com/origin/3796/2975850990'
            ],
            like: 15,
            reply:
              '感谢您对9妹的信任和支持！9妹家的阉鸡都是9妹自己家散养300天以上的，吃的都是玉米或者自己在野外觅食。收到阉鸡请即时打开食用或放入冰箱冰冻保存，不要在久置常温。9妹给大家分享些家常鸡做法哦，1.两广的朋友非常喜欢的水蒸鸡和白切鸡 2.江苏，重庆等地区的朋友们是不是更喜欢做荷叶鸡和辣子鸡呢，鸡的做法9妹会多在视频分享给大家，或者是跟着9妹携带的温馨提示做法来试试哦。希望您喜欢9妹家的大阉鸡，收到鸡有什么问题，请签收后第一时间联系9妹处理。感谢您的支持，在此祝您生活愉快 ~ '
          }
          this.comment.list.push(obj)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.comment.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="scss" scope>
.g-top {
  .text {
    font-size: 30px;
  }
  .comKind {
    span {
      padding: 10px 20px;
      color: #505050;
      border-radius: 40px;
    }
  }
  .comKindSel {
    background: #f85959 !important;
    color: white !important;
  }
}

.comList {
  .user {
    img {
      width: 50px;
      height: 50px;
    }
  }
  .img {
    img {
      box-sizing: border-box;
      padding: 3px;
    }
  }
  .like span {
    font-size: 26px;
  }
}
</style>

