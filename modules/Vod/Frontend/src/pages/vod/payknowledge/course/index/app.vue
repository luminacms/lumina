<template>
    <div class="app">
        <van-skeleton :title="false" :row="4" :loading="loading" :row-width="sw" />


        <div class v-if="!loading">
            <div class="video">
                <div class="poster"><img :src="item.thumb" /></div>
            </div>

            <div class="videoInfo">
                <div class="desc">
                    <div class="tt">{{ item.title }}</div>
                    <div class="text">限时特惠</div>
                </div>
            </div>
            <!-- 订阅 -->
            <!-- <div class="take">71人订阅</div> -->

            <!-- tab -->
            <van-tabs v-model="active" sticky @click="onTabChange">
                <van-tab title="详情">
                    <div v-html="item.content" class="infoC"></div>
                </van-tab>
                <van-tab title="目录">
                    <div class="ml">
                        <van-cell-group class="mb-2">
                            <van-cell title="内容" title-class="ml_value">
                                <van-icon slot="right-icon" name="https://sxmgcm.cn/2019/07/bowu/order1.png" size="20"
                                    style="line-height: inherit;" @click="orderFun" v-if="isOrder" />
                                <van-icon slot="right-icon" name="https://sxmgcm.cn/2019/07/bowu/orderBy.png" size="20"
                                    style="line-height: inherit;" @click="orderFun" v-else />
                            </van-cell>
                        </van-cell-group>
                        <van-list v-model="classLoading" :finished="classFinished" finished-text="没有更多了"
                            @load="onLoadClass" :immediate-check=false class="list">
                            <!-- <van-cell   > -->
                            <!-- 课程列表 -->
                            <div :key="index" v-for="( item, index) in lessonItems">
                                <div class="left">
                                    <div class="icon"></div>
                                </div>
                                <div class="mid">
                                    <div class="tt text2">{{item.title}}</div>
                                    <div class="timer">{{item.updated_at}} | {{item.count}} 次学习</div>
                                </div>
                                <div class="right text-right">
                                    <van-icon name="https://sxmgcm.cn/2019/07/bowu/suo.png" size="20"
                                        v-if="item.isBuy" />
                                    <van-icon name="https://sxmgcm.cn/2019/07/bowu/start.png" size="20" v-else />
                                    <!-- <div class="seeBtn" v-else>去看</div> -->
                                </div>
                                <van-divider />
                            </div>

                            <!-- </van-cell> -->
                        </van-list>
                    </div>
                </van-tab>
                <van-tab title="评价">
                    <div class="tj">
                        <van-cell-group class="mb-1">
                            <van-cell title="精品课程" title-class="tj_value" />
                        </van-cell-group>

                        <van-list v-model="recomLoading" :finished="recomFinished" finished-text="没有更多了"
                            @load="onLoadRecom" class="list" :immediate-check=false>
                            <div class v-for="( item, index) in recomList" :key="index" @click="toGoodInfo">
                                <div class="mainImg align-middle">
                                    <img :src="item.thumbnail_pic_s" alt />
                                </div>
                                <div class="desc align-middle">
                                    <div class="tt text2">{{item.title}}</div>
                                    <div class="price">{{item.price}}</div>
                                </div>

                                <van-divider />
                            </div>
                        </van-list>
                    </div>
                </van-tab>
            </van-tabs>
            <!-- 立即购买 -->
            <van-goods-action>
                <van-goods-action-icon icon="home-o" text="首页" @click="goto('/index', {'oid': item.oid})" />
                <van-goods-action-icon :icon="like" text="收藏" @click="setLike" />

                <van-goods-action-button type="danger" :text="'立即购买 ￥' +price" @click="toBuy" />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
    import Player from 'xgplayer';
    import {
        courseApi,
        lessonApi
    } from '@/api'
    import {
        getParams
    } from '$libs/utils'
    // import xTabbar from '../../components/tabbar'

    export default {
        data() {
            return {
                item: {},
                loading: true,
                active: 0,
                lessonItems: [],
                lessonItemsMeta: {},

                price: 102.1,
                player: null,
                like: 'like-o',
                info: '<div class="main"><div><img class="columnist-head-pic" src="http://wechatapppro-1252524126.file.myqcloud.com/appius3sk4V4764/image/cmVzb3VyY2UtY291cnNlUGFja2FnZS02Mzk1MzYxNA.jpg" style="height: 360px;"></div> <div class="columnist-head-wrapper"><div class="columnist-head-info"><div class="t1 c2 columnist-head-title"><span>【2019暑】新2年级数学系统班</span></div> <div class="columnist-head-data"><div class="detailHeadData"><div class="t3 c2 columnist-head-desc"> 【抢】限时特惠！ </div> <div class="clearfix"><!----> <span class="columnist-subscriber t4 c3"> 72人订阅 </span></div></div></div> <!----></div></div> <div class="aside"><div class="description js-description"><div class="desc"><div><p><img width="100%" height="auto" title=".jpg" alt="（0625）2年级9天锻炼孩子数学思维详情页-0705新.jpg" src="http://wechatapppro-1252524126.file.myqcloud.com/appius3sk4V4764/image/ueditor/32034400_1562296809.jpg"></p><p><br></p><p><br></p><p><img width="100%" height="auto" title=".jpg" alt="7报名咨询-乐学小助手二维码.jpg" src="http://wechatapppro-1252524126.file.myqcloud.com/appius3sk4V4764/image/ueditor/3303300_1558701361.jpg"></p></div> </div></div></div> <!----> <!----> <div class="content-list"><!----> <!----></div></div>',
                order: 'https://sxmgcm.cn/2019/07/bowu/orderBy.png',
                isOrder: true,
                isBuy: false,
                classList: [],
                recomList: [],
                classLoading: false,
                classFinished: false,
                classPage: 1,

                recomLoading: false,
                recomFinished: false,
                recomPage: 1,


                sw: ['100%', '60%', '40%', '100%']
            }
        },
        created() {
            let self = this
            let _params = getParams()
            // 拉取详情
            courseApi.show(_params.id).then((res) => {
                self.item = res.data
                self.loading = false
            })
        },
        computed: {
            ComputedPrice: function () {
                let spec_idx = this.spec_idx
                let spec = this.spec
                let price
                price = spec_idx == null ? this.price : spec.items[spec_idx]['price']

                return price
            }
        },
        filters: {
            // 评论用户名格式化
            formatName: function (name) {
                name = name.toString()
                return name.substr(0, 1) + '**' + name.substr(3, 1)
            }
        },
        methods: {
            rebuildPlayer(src, poster) {
                var videoPlayer = new Player({
                    id: 'xgvideo',
                    fluid: true,
                    autoplay: false,
                    playsinline: true,
                    ignores: ['theme-default','cover','backward','forward','meta','next','prev', 'template'],
                    url: [{name:'',src:src,'poster': poster}]
                });
            },

            gotoComment() {
                location.assign('../comment.html')
            },
            setLike() {
                if (this.like != 'like') {
                    this.like = 'like'
                    Toast('收藏成功')
                } else {
                    this.like = 'like-o'
                    Toast('取消收藏')
                }
            },

            orderFun() {
                if (this.isOrder) {
                    this.isOrder = false
                } else {
                    this.isOrder = true
                }
            },
            toBuy() {
                Toast.loading({
                    mask: true,
                    message: '加载中...',
                    duration: 4000
                })
            },
            toHome() {
                location.assign('../../index.html')
            },

            toGoodInfo() {
                location.assign('../good/info.html')
            },

            tipBuy() {
                Toast("请先购买")
            },
            loadLessons() {
                let self = this
                lessonApi.list(this.item.id, {'orderBy': 'count', 'sortedBy': 'desc'}).then((res) => {
                    self.lessonItems = res.data
                    self.lessonItemsMeta = res.meta

                    console.log(res)
                })
            },
            loadRecommend() {

            },
            onTabChange(idx, title) {
                if(idx === 1) {
                    this.loadLessons()
                }
            }
        },
        watch: {

        }
    }

</script>

