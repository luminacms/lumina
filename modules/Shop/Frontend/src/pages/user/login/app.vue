<template>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        phone: '',
        password: ''
      }
    }
  },

  methods: {
    login() {
      // location.assign('../goodInfo.html')
    }
  }
}
</script>

<style>
.login-card {
  width: 800px;
  margin: 100px auto;
}
.login {
  display: block;
  width: 400px;
  margin: 100px auto;
}
.logo-img {
  width: 90px;
}
.logo-text {
  margin-left: 20px;
}
</style>
