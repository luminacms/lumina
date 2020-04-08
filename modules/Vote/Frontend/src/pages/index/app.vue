<template>
    <div id="app" class="vote-page">
        <div class="wrap head">
            <h1>{{ vote.title }}</h1>
            <div class="desc">{{ vote.description }}</div>
        </div>
        <div class="wrap vote-bd">
            <section class="question" v-for="(item, index) in vote.subjects">
                <div class="question-head ">
                    <div class="question-title">
                        <span class="question-seq"><b>{{ addPan(index+1) }}</b></span><span class="text">{{ item.title }}</span><span class="question-required">*</span>
                    </div>
                </div>
                <div class="question-body ">
                    <div class="checkbox-option" v-for="(opt, idx) in item.options">
                        <div v-if="opt.type=='text'">
                            <el-radio v-model="item.id" :label="opt.value">{{ opt.value }}</el-radio>
                        </div>
                        <div v-if="opt.type=='image'">
                            <el-radio v-model="item.id" :label="opt.value">
                                <img :src="opt.value" width="160" />
                            </el-radio>
                        </div>

                    </div>
                </div>
            </section>

            <section class="question">
                <el-button type="primary" class="btn-submit">提交</el-button>
            </section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import $http from '$libs/http'
    import {getParams} from '$libs/utils'

    export default {
        name: 'app',
        data: function () {
            return {
                vote: {},
                form: {}
            }
        },
        created: function(){
            let params = getParams()
            let self = this
            $http.get('/interface/vote/'+params.id).then((res) => {
                self.vote = res.data
                console.log(res)
            })
        },
        methods: {
            addPan: function(num){
                return ('0'+num).slice(-10)
            }
        }
    }
</script>

<style>
    html,body{width: 100%;min-height: 100%;}
    body{background-color: rgba(242,242,242,1)}
    .wrap{
        width: 95%;
        max-width: 990px;
        margin: 0 auto;
    }
    .head{
        padding: 6% 0;
        text-align: center;
    }
    .head h1{
        margin-top: 0.1333rem;
        font-size: 15px;
        font-weight: 800;
    }
    .head .desc{
        margin-top: 8px;
        font-size: 12px;
    }
    .question {
        position: relative;
        margin-top: 0.6rem;
        padding: 10px 25px;
    }
    .question-title {
        font-size: 15px;
    }
    .question-body {
        padding-top: 15px;
    }
    .question-required {
        background-size: 100%;
        vertical-align: -2px;
        margin-right: 0.0533rem;
        color: #ef5350;
    }
    .question-seq {
        display: block;
        margin-right: 6px;
        font-size: 0.24rem;
        float: left;
        margin-top: 2px;
    }
    .vote-page{
        width: 100%;
        height: 100%;
    }
    .vote-bd{
        background-color: #fff;
        position: relative;
        margin: 0 auto;
        padding: 15px 0;
    }
    .vote-bd label{
        width: 100%;
        padding: 7px 14px;
        min-height: 36px;
        box-sizing: border-box;
        margin-right: -14px;
        margin-left: -14px;
        border-radius: 0.04rem;
        cursor: pointer;
        display: inline-block;
        position: relative;
    }
    .vote-bd label:hover {
        background-color: rgba(40, 99, 243, 0.1);
    }
    .btn-submit{
        background-color: rgba(40,99,243,1);
        width: 45%;
        margin: 1.0667rem auto 0;
        text-align: center;
        border-radius: 3px;
        display: block;
    }
</style>
