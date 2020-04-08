<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">
        index i am index
      </div>
      <a class="nav-link" @click="gogogo('about/index')" href="javascript:;">About</a>
      <a class="nav-link" @click="gogogo('about/company')" href="javascript:;">Company</a>
    </el-card>
  </div>
</template>

<script>

    import goto from '@/goto.js'

    const axios = require('axios');

export default {
  data() {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },
  methods: {
    gogogo(page) {
      goto(page, {'name': 'jory'})
    },
    tototo() {
      location.assign('../user/login.html')
    }
  }
}
</script>

<style lang="postcss">
.index-card {
  width: 800px;
  margin: 100px auto;
}
</style>
