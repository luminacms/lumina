<template>
	<div id="app" class="pb-8">
		<div class="g-pay">
			<div class="tt">
				<van-cell :title="good.shopNmae" icon="shop-o" />
			</div>
			<!--商品详情  -->
			<div class="good py-1 ">
				<img src="https://sf6-ttcdn-tos.pstatp.com/obj/temai/FmYvPfVBZJqukxgM30sJVzk84N2Pwww800-800"
					class="sku__img inline-block w-10 w-1/4 align-middle" />
				<div class="info w-3/4 inline-block pl-1 align-middle">
					<div class="sku_good_name">{{ good.skuName }}</div>
					<div class="sku_des text-gray-500 truncate">{{ good.skuDes }}</div>
					<!-- <div class="price"> 
                        <span class="text-red-500 inline-block">{{"¥ " + good.price }}</span>    
          </div>-->
					<van-cell :title="'¥'+ good.totPrice " title-class="text-red-500" :value="'x '+good.num" />
				</div>
			</div>
			<van-divider :style="{margin:0,}" />


			<!-- 支付 -->
			<div class="pay_env  py-1">
				<div class="pay_tt py-1 h-5 leading-loose">支付方式</div>
				<van-cell title="微信支付" :icon="is_weixin" class="px-1">
					<van-icon slot="right-icon" name="checked" style="line-height: inherit;" color="red" />
				</van-cell>
			</div>

			<!-- 收货表单 -->
			<van-cell-group>
				<van-field v-model="formData.consignee" type="text" label="收货人" placeholder="点击填写" clearable />
				<van-field v-model="formData.moblie" label="联系方式" type="tel" placeholder="点击填写" @input="iphoneRule" />

				<van-field v-model="formData.code" center clearable label="验证码" placeholder="点击填写">
					<van-button v-if="codeShow" slot="button" size="small" plain type="danger" :disabled="!can_code"
						@click="getCode">发送验证码</van-button>
					<van-button v-else slot="button" size="small" plain type="default" :disabled="can_code">
						{{count +"s 重新获取"}}
					</van-button>
				</van-field>

				<van-field v-model="Area" label="所在地区" type="text" placeholder="点击填写" @click="areaPopShow" />

				<van-field v-model="formData.address_full" label="详细地址" type="textarea" rows="2" autosize
					placeholder="如街道、小区、乡镇、村、寨" />

				<van-cell is-link @click="is_ShopCoupon">
					<template slot="title">
						<span class="custom-title">店铺卷</span>
						<span class="text-gray-500 "> (暂无可用)</span>
					</template>
				</van-cell>

				<van-cell is-link @click="is_PlatformCoupon">
					<template slot="title">
						<span class="custom-title">平台卷</span>
						<span class="text-gray-500 "> (暂无可用)</span>
					</template>
				</van-cell>

				<van-cell title="运费" value="包邮" />

				<van-collapse v-model="activeNames" class="money">
					<van-collapse-item title="实付款" name=" 1" :value=" '¥'+ good.totPrice" value-class="text_red"
						right-icon="arrow">
						<div class="text-right">
							<ul class="inline-block w-2/3">
								<li class=" "><span class="w-2/3 inline-block text-left">商品金额</span><span
										class="w-1/3 inline-block">{{'¥'+ good.totPrice}}</span></li>
								<li class=""><span class="w-2/3 inline-block text-left">店铺卷</span><span
										class="w-1/3 inline-block">-0元</span></li>
								<li class=" "><span class="w-2/3 inline-block text-left">平台卷</span><span
										class="w-1/3 inline-block">-0元</span></li>
								<li class=""><span class="w-2/3 inline-block text-left">运费</span><span
										class="w-1/3 inline-block">+0元</span></li>
							</ul>
						</div>
					</van-collapse-item>

				</van-collapse>
				<van-field label="买家留言" type="text" placeholder="选填：对快递等的特殊要求" />



			</van-cell-group>
			<p class="notice text-gray-500">提示：您选择购买商品即视为您同意本网站服务协议，详细协议请查看</p>
			<van-submit-bar :price="fomatPrice" button-text="立即购买" @submit="onSubmit" />
		</div>
		<!-- 地区选择弹层 -->
		<van-popup v-model="shopCoupon_show" position="bottom">
			<van-area :area-list="areaList" @confirm="getArea" @cancel="cancelArea" />
		</van-popup>
		<!-- 商铺优惠券弹层 -->
		<van-popup v-model="shopCoupon_show" round position="bottom" :style="{ height: '70%' }">
			<div class="shopCouponC">
				<div class="tt text-center py-1">店铺卷</div>

				<div class="coupon text-center">
					<img src="https://tms3.pstatp.com/foreground/static/img/no-coupon@3x.png" alt=""
						class="w-8 inline-block">
					<div class="text-center text-gray-500 pt-1">抱歉～暂无店铺券可用</div>
				</div>
			</div>
			<van-button type="danger" class="w-full" @click="not_ShopCoupon">不使用商铺优惠卷</van-button>
		</van-popup>
		<!-- 平台优惠卷碳层 -->
		<van-popup v-model="platformCoupon_show" round position="bottom" :style="{ height: '70%' }">
			<div class="shopCouponC">
				<div class="tt text-center py-1">平台卷</div>

				<div class="coupon text-center">
					<img src="https://tms3.pstatp.com/foreground/static/img/no-coupon@3x.png" alt=""
						class="w-8 inline-block">
					<div class="text-center text-gray-500 pt-1">抱歉～暂无平台券可用</div>
				</div>
			</div>
			<van-button type="danger" class="w-full" @click="not_PlatformCoupon">不使用平台优惠卷</van-button>
		</van-popup>


	</div>
</template>

<script>
    import {Area, Button, Cell, CellGroup, Collapse, CollapseItem, Divider, Field, Icon, Popup, SubmitBar} from 'vant'
    import areaList from '../../utils/area'

    export default {
		components: {
			[Cell.name]: Cell,
			[Divider.name]: Divider,
			[Icon.name]: Icon,
			[Field.name]: Field,
			[CellGroup.name]: CellGroup,
			[SubmitBar.name]: SubmitBar,
			[Button.name]: Button,
			[Area.name]: Area,
			[Popup.name]: Popup,
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem
		},
		computed: {
			is_weixin() {
				var ua = navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return 'https://tms3.pstatp.com/foreground/static/img/product/weixin@3x.png'
				} else {
					return 'https://tms3.pstatp.com/foreground/static/img/product/zhifubao@3x.png'
				}
			},

			fomatPrice() {
				return this.good.totPrice * 100
			},

			Area() {
				let area = this.formData.address.province + this.formData.address.city + this.formData.address.area == "" ?
					"请选择" : this.formData.address.province + "  " + this.formData.address.city + "  " + this.formData
					.address.area
				return area
			}
		},
		data() {
			return {
				good: {
					shopNmae: '巧妇9妹鲜货旗舰店',
					skuName: '巧妇9妹 秘制螺蛳粉 广西特产  即煮即吃 速食方便面包邮',
					skuDes: '9妹秘制螺蛳粉：袋装螺蛳粉（煮粉型）：【1袋】 ',
					totPrice: 20.8,
					num: 1
				},
				formData: {
					consignee: '', //收货人
					moblie: '',
					code: '',
					address: {
						province: "",
						city: "",
						area: "",
					},
					address_full: ""
				},
				areaList: areaList,
				area_show: false,
				shopCoupon_show: false,
				platformCoupon_show: false,
				activeNames: ['1'],
				timer: null,
				codeShow: true,
				count: "",
				can_code: false,

			}
		},
		methods: {
			onSubmit() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				if (this.formData.consignee == '') {
					this.$toast('收货人不能为空')
					return false
				} else if (this.formData.moblie == '') {
					this.$toast('手机号不能为空')
					return false
				} else if (!reg.test(this.formData.moblie)) {
					this.$toast('手机号格式不正确')
				}
			},
			iphoneRule() {
				var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				this.can_code = reg.test(this.formData.moblie)

			},

			areaPopShow() {
				this.area_show = true;
			},
			getArea(e) {
				this.formData.address.province = e[0]["name"];
				this.formData.address.city = e[1]["name"];
				this.formData.address.area = e[2]["name"];
				this.area_show = false;
			},
			cancelArea() {
				this.area_show = false;
			},
			is_ShopCoupon() {
				this.shopCoupon_show = true;
			},
			not_ShopCoupon() {
				this.shopCoupon_show = false;
			},
			is_PlatformCoupon() {
				this.platformCoupon_show = true;
			},
			not_PlatformCoupon() {
				this.platformCoupon_show = false;
			},
			getCode() {

				const TIME_COUNT = 60;

				if (!this.timer) {

					this.count = TIME_COUNT;

					this.codeShow = false;

					this.timer = setInterval(() => {

						if (this.count > 0 && this.count <= TIME_COUNT) {

							this.count--;

						} else {


							this.codeShow = true;
							clearInterval(this.timer);

							this.timer = null;

						}

					}, 1000)

				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.g-pay {
		.good {
			padding: 0 .4rem;

			.info {
				.sku_good_name {
					font-size: 26px;
				}

				.sku_des {
					padding: 10px 0;
				}

				//   .price{
				//       font-size: 26px;
				//   }
				.van-cell {
					padding: 0;
				}
			}
		}

		.pay_env {
			padding-left: .4rem;
			padding-right: .4rem;

			.pay_tt {
				font-size: 28px;
			}

			.van-cell {
				padding: 0;
			}
		}


	}

	.shopCouponC {
		background: #f4f5f6;
		height: calc(100% - 88px);
	}

	.van-collapse {
		.van-cell__value {
			span {
				color: #f85959 !important;
			}

		}

	}


	.text_red {
		color: #f85959 !important;
	}

	.notice {
		padding: 0 .4rem;
	}
</style>