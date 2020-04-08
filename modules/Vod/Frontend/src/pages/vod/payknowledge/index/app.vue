<template>
    <div id="app">

        <van-skeleton title :row="6" :loading="loading" />

        <div class="p-one-c">
            <van-nav-bar title="博晤文化">
                <van-icon name="contact" slot="right" size="20" color="#fff" @click="toMy" />
            </van-nav-bar>

            <van-swipe :autoplay="3000" indicator-color="white" class="swiper">
                <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                    <img :src="item" alt />
                </van-swipe-item>
            </van-swipe>
            <!-- 好字在 -->
            <div class="g-hzz">


                <div class="cell_tt">好字在</div>
                <div class="cell_value" @click="getMore($event)" data-kind="1">
                    <span class="more">更多推荐</span>
                    <van-icon slot="right-icon" name="https://cdn.sxmgcm.cn/2019/07/bowu/jiantou.png"
                        style="line-height: inherit; marginLeft:5px;" />
                </div>

                <div class="hzzList">
                    <van-row gutter="24">
                        <van-col span="12" v-for="( item, index ) in hzzList" :key="index" class="item_box">
                            <div class="item shadow-md" @click="goto('/vod/payknowledge/course/lesson', {'id': item.id, 'oid': item.oid})" :data-id="item.id">
                                <p class="tag" v-if="item.isnew">上新</p>
                                <div class="item_desc">
                                    <p class="tt truncate">{{item.title}}</p>
                                    <p class="price">{{item.price}}</p>
                                </div>
                                <img :src="item.thumb" alt class="item_img"/>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <!-- 吴晓波频道 -->
            <div class="g-wxb">


                <div class="cell_tt">吴晓波频道</div>
                <div class="cell_value" @click="getMore($event)" data-kind="2">
                    <span class="more">更多推荐</span>
                    <van-icon slot="right-icon" name="https://cdn.sxmgcm.cn/2019/07/bowu/jiantou.png"
                        style="line-height: inherit; marginLeft:5px;" />
                </div>

                <div class="wxbList">
                    <van-row>
                        <van-col span="24" v-for="( item, index ) in wxbList" :key="index" class="item_box">
                            <div class="item shadow-md" @click="goto('/vod/payknowledge/course/lesson', {'id': item.id})" :data-id="item.id">
                                <div class="item_desc">
                                    <div class="desc_left">
                                        <p class="tt truncate">{{item.title}}</p>
                                        <p class="desc truncate">{{item.description}}</p>
                                    </div>
                                    <div class="desc_right">
                                        <p class="price">{{'￥'+ item.price }}</p>
                                        <p class="spec">规格可选</p>
                                    </div>
                                </div>

                                <img :src="item.thumb" alt />
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <!-- 专栏精选 -->
            <div class="g-zl" v-if="zlbList.length>0">

                <div class="cell_tt">专栏精选</div>
                <div class="cell_value" @click="getMore($event)" data-kind="3">
                    <span class="more">更多推荐</span>
                    <van-icon slot="right-icon" name="https://cdn.sxmgcm.cn/2019/07/bowu/jiantou.png"
                        style="line-height: inherit; marginLeft:5px;" />
                </div>

                <div class="zlList">
                    <van-row>
                        <van-col span="24" v-for="( item, index ) in zlbList" :key="index" class="item_box">
                            <div class="item" @click="toGoodInfo($event)" :data-id="item.id">
                                <img :src="item.img" alt />
                                <div class="item_desc">
                                    <p class="tt truncate">{{item.title}}</p>
                                    <p class="desc truncate">{{item.description}}</p>
                                    <p class="price">{{'￥'+ item.price }}</p>
                                </div>
                            </div>
                            <van-divider style="margin-bottom:0;" />
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

        <!-- <xTabbar :tabbarActive=0></xTabbar> -->
    </div>
</template>

<script>
    import {
        Swipe,
        SwipeItem,
        Cell,
        CellGroup,
        Icon,
        Divider,
        NavBar,
        Skeleton
    } from 'vant'

    import {
        lessonApi
    } from '@/api'

    import xTabbar from '../components/tabbar'
    export default {
        components: {
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [Swipe.name]: Swipe,
            [Divider.name]: Divider,
            [SwipeItem.name]: SwipeItem,
            [CellGroup.name]: CellGroup,
            [NavBar.name]: NavBar,
            xTabbar,
            [Skeleton.name]: Skeleton
        },
        data() {
            return {
                indexGet: {},
                bannerList: [
                    'https://cdn.sxmgcm.cn/2019/07/bowu/banner1.png',
                    'https://cdn.sxmgcm.cn/2019/07/bowu/banner1.png'
                ],
                hzzList: [],
                wxbList: [],
                zlbList: [],
                loading: false
            }
        },
        mounted: function () {
            //   $ajax.courses.GetAll({}).then(res => {
            //   this.indexGet = res
            //   console.log(res.errcode)
            // })
            //  $ajax.courses.Get(2,{}).then(res => {
            //   this.indexGet = res
            //   console.log(res.errcode)
            // })
            // console.log($ajax)
        },
        created() {
            let self = this
            lessonApi.list(2, {
                'limit': 4
            }).then((res) => {
                self.hzzList = res.data
            })
            lessonApi.list(3, {
                'limit': 4
            }).then((res) => {
                self.wxbList = res.data
            })
        },
        computed: {},
        methods: {
            getIndex() {
                axios.get('/api/index', {}).then(function (response) {
                    console.log(response)
                })
            },

            toLicenses() {
                location.assign('../customer/home.html')
            },
            getMore(e) {
                let kind = e.currentTarget.dataset.kind
                location.assign('../list.html')
                console.log(e)
            },
            toMy() {
                location.assign('../my.html')
            }
        }
    }

</script>

<style lang="postcss" scope>
    .high {
        @apply bg-red-500 text-white;
    }

    .textRed {
        @apply text-red-500;
    }

</style>
<style lang="scss" scope>
    body,
    html {
        background: rgba(246, 245, 245, 1);
        padding-bottom: 20px;
    }

    .cell_tt {
        width: 70%;
        height: 44px;
        font-size: 35px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(12, 12, 12, 1);
        line-height: 44px;
        vertical-align: middle;
        display: inline-block;
        padding-left: 44px;
    }

    .cell_value {
        width: 30%;
        vertical-align: middle;
        display: inline-block;
        padding-right: 44px;
        text-align: right;
    }

    .more {
        display: inline-block;

        height: 35px;
        line-height: 1;
        vertical-align: middle;
    }

    .g-header {
        background: #fdd424;

        .tt {
            width: 150px;
            padding-top: 30px;
            height: 88px;
            font-size: 36px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(31, 31, 31, 1);
            line-height: 88px;
        }

        .swiper {
            top: 30px;

            img {
                width: 100%;
                height: 304px;
            }
        }
    }

    .g-hzz {
        margin-top: 52px;

        .van-cell {
            background: none;
        }

        .hzzList {
            margin-top: 10px;
            padding: 0 44px;
        }

        .item_box {
            margin: 10px 0 33px 0;
        }

        .item {
            width: 309px;
            // height:330px;
            background: rgba(255, 255, 255, 1);
            // box-shadow:1px 1px 4px 4px rgba(187,187,187,0.59);
            border-radius: 9px;

            .tag {
                width: 80px;
                height: 26px;
                background: rgba(21, 125, 241, 1);
                border-radius: 9px 0;
                font-size: 20px;
                font-family: PingFang-SC-Bold;
                // font-weight:bold;
                color: rgba(255, 255, 255, 1);
                line-height: 26px;
                text-align: center;
            }

            .item_desc {
                margin-left: 22px;

                .tt {
                    width: 100%;
                    height: 30px;
                    font-size: 28px;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(31, 31, 31, 1);
                    line-height: 30px;
                    margin-top: 23px;
                }

                .price {
                    color: #aaaaaa;
                    font-size: 22px;
                    line-height: 30px;
                    height: 30px;
                }
            }

            .item_img {
                height: 25vw;
                width: 100%;
                margin-top: 15px;
            }
        }
    }

    .g-wxb {
        .van-cell {
            background: none;
        }

        .wxbList {
            padding: 0 44px;
            margin-top: 10px;

            .item_box {
                margin-bottom: 34px;

                .item {
                    width: 664px;
                    // height:330px;
                    background: rgba(255, 255, 255, 1);
                    // box-shadow:1px 1px 8px 1px rgba(187,187,187,0.09);
                    border-radius: 9px;
                }

                .item_desc {
                    padding: 28px 22px 24px 22px;

                    .desc_left {
                        width: 60%;
                        display: inline-block;
                    }

                    .tt {
                        font-size: 30px;
                        line-height: 40px;
                        color: #1f1f1f;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                    }

                    .desc {
                        font-size: 24px;
                        line-height: 42px;
                        color: #a8a8aa;
                    }
                }

                .desc_right {
                    width: 40%;
                    text-align: right;
                    display: inline-block;

                    .price {
                        height: 30px;
                        font-size: 28px;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(225, 43, 68, 1);
                        line-height: 22px;
                    }

                    .spec {
                        width: 110px;
                        height: 34px;
                        display: inline-block;
                        text-align: center;
                        line-height: 32px;
                        font-size: 22px;
                        border: 2px solid rgba(21, 125, 241, 1);
                        border-radius: 5px;
                        color: #157df1;
                    }
                }
            }
        }
    }

    .g-zl {
        .van-cell {
            background: none;
        }

        .zlList {
            padding: 0 44px;
            margin-top: 10px;

            .van-row {
                background: rgba(255, 255, 255, 1);
                // box-shadow:1px 1px 8px 1px rgba(187,187,187,0.09);
                border-radius: 9px;
            }

            .item_box {
                padding: 27px 0 0 0;

                .item {
                    img {
                        width: 261px;
                        // height:179px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 60px;
                    }

                    .item_desc {
                        display: inline-block;
                        height: 179px;
                        vertical-align: middle;

                        .tt {
                            font-size: 30px;
                            font-family: PingFang-SC-Bold;
                            font-weight: bold;
                            color: rgba(31, 31, 31, 1);
                            line-height: 42px;
                            height: 42px;
                        }

                        .desc {
                            font-size: 24px;
                            color: #787878;
                            height: 42px;
                            line-height: 42px;
                        }

                        .price {
                            height: 27px;
                            font-size: 28px;
                            font-family: PingFang-SC-Bold;
                            font-weight: bold;
                            color: rgba(225, 43, 68, 1);
                            line-height: 39px;
                            margin-top: 60px;
                        }
                    }
                }
            }
        }
    }

    .van-nav-bar {
        background: #fdd424;
    }

    .g-hzz,
    .g-wxb,
    .g-zl {
        background: #fff;
        margin-top: 20px;
        padding-top: 20px;

        .item {
            border: 2px solid #eee;
        }
    }

    .g-zl {
        .item {
            border: none;
        }
    }

    .g-hzz {
        margin-top: 0;
    }

    .swiper {
        img {
            width: 100%;
            height: 400px;
        }
    }

    .van-skeleton__content {
        div:nth-child(2) {
            height: 400px;
        }

        div:nth-child(3) {
            height: 300px;
        }

        div:nth-child(4) {
            height: 300px;
        }

        div:nth-child(5) {
            height: 300px;
        }

        div:nth-child(6) {
            height: 300px;
        }
    }

</style>
