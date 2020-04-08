<template>
    <div class="app">
        <!-- <div class="tip">
      <div class="tt text-center">绑定手机</div>
      <div class="des text-center">登录及找回密码的途径</div>
    </div>-->
        <van-cell-group class="mt-2">
            <van-field v-model="ruleForm.mobile" required clearable type="tel" label="手机号" placeholder="请输入手机号"
                @input="iphoneRule" />

            <van-field v-model="ruleForm.code" center clearable required label="验证码" placeholder="点击填写">
                <van-button v-if="codeShow" slot="button" size="small" plain :type="type" :disabled="!can_code"
                    @click="getCode">获取验证码</van-button>
                <van-button v-else slot="button" size="small" plain type="default" :disabled="can_code">
                    {{count +"s 重新获取"}}</van-button>
            </van-field>
        </van-cell-group>

        <div class="loginBtn mt-8 px-2">
            <van-button type="primary" @click="login" class="w-full">登录</van-button>
        </div>
    </div>
</template>

<script>
    import { userApi } from '@/api'
    import store from '../../store'

    export default {
        data() {
            return {
                ruleForm: {
                    mobile: '',
                    code: '',
                    xcode: ''
                },
                type: 'default',
                disabled: false,

                timer: null,
                codeShow: true,
                count: '',
                can_code: false
            }
        },
        created(){
            userApi.userinfo().then((res) =>{
                console.log(res)
            })
        },
        methods: {
            login() {
                let self = this
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (this.ruleForm.mobile == ' ') {
                    this.$toast('手机号不能为空')
                    return false
                } else if (!reg.test(this.ruleForm.mobile)) {
                    this.$toast('手机号格式不正确')
                    return false
                } else {
                    userApi.loginWithMobile(this.ruleForm).then((res) => {
                        if(res.errcode != 0) {
                            self.$toast(res.msg)
                        }else{
                            store.setData('token', res.data.token)
                            store.setData('token_expired_at', res.data.expired_at)
                        }
                    })
                }
            },
            iphoneRule() {
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                this.can_code = reg.test(this.ruleForm.mobile)
                if (this.can_code) {
                    this.type = 'danger'
                } else {
                    this.type = 'default'
                }
            },
            getCode() {
                let self = this
                const TIME_COUNT = 60
                userApi.sendSmsCode(this.ruleForm.mobile).then((res) => {
                    self.ruleForm.xcode = res.data.xcode
                })
                if (!this.timer) {
                    this.count = TIME_COUNT
                    this.codeShow = false
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--
                        } else {
                            this.codeShow = true
                            clearInterval(this.timer)
                            this.timer = null
                        }
                    }, 1000)
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    body,
    html {
        background: #f0f0f0;
    }

    .tip {
        .tt {
            color: #333333;
            font-size: 1.4rem;
            font-weight: normal;
        }

        .des {
            color: #cccccc;
            font-size: 0.85rem;
        }
    }

</style>
