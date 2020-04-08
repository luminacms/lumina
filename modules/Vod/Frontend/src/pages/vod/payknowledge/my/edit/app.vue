<template>
  <div class="app">
    <van-cell-group >
     <div class="avatar">
          <van-cell title="头像" class="align-middle">
        <van-uploader class="align-middle">   
          <van-icon :name="info.avatar" size="40"/>
          
        </van-uploader>
         <van-icon name="arrow" class="align-middle"/>
      </van-cell>
     </div>

      <van-cell-group>
        <van-field v-model="info.username" required clearable label="呢称" placeholder="请输入用户名" />
        <van-field v-model="info.username" required clearable label="真实姓名" placeholder="请输入真实姓名" class="border-gray-200 border-b-8" />
        <van-field v-model="info.username" required clearable label="手机号" placeholder="请输入真实姓名" />
        <van-field v-model="info.address" required clearable label="地址"  placeholder="请输入真实姓名" class="border-gray-200 border-b-8" />
        <van-field v-model="info.username" required clearable label="性别"  placeholder="请输入性别" />
        <van-field v-model="info.username" required clearable label="生日" placeholder="请输入生日" />
      </van-cell-group>
    </van-cell-group>


    <div class="save fixed bottom-0 left-0 w-full" @click="saveUserInfo">
            <van-button type="primary" class="w-full">保存</van-button>
    </div>

  </div>
</template>

<script>
import { Icon, Cell, Divider, CellGroup, Field, Uploader ,Button, Toast} from 'vant'

export default {
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [Divider.name]: Divider,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast
  },

  data() {
    return {
      info: {
        avatar:
          'https://mirror-gold-cdn.xitu.io/168e08d7e9f39f1a490?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
        name: 'deyou',
        username: '得有',
        mobile: '13149102636',
        sex: 1,
        bir: '95-4-6'
      }
    }
  },
  methods: {
      saveUserInfo() {
          Toast("保存成功");
          location.assign('../../index.html');
      }
  }
}
</script>

<style lang="scss" scope>
html,
body {
  background: #f0f0f0;
}
.avatar{
     .van-cell__title{
    padding-top: 20px;
    }
}
   


.van-field__control{
    text-align: right;
}
</style>
