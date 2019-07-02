<template>
	<view class="wrap">
		<view class="status-wrap">
			<view class="statu" v-for="(statu,i) in statuEnum" :class="{'active': statuType - statu.type == 0}" @tap="checkStatu(statu)" :key="i">
				{{statu.name}}
			</view>
		</view>
		<view @tap="toDetail(order.orderNo)" class="each-order" v-for="(order,i) in orderList" :key="i">
			<view class="order-header">
				<view class="brand">
					厂家品牌：青岛欧派
				</view>
				<view class="status">
					{{orderStatus(order.status)}}
				</view>
			</view>
			<view class="goods-wrap">
				<view class="each-goods" v-for="(spu,j) in order.orderInfo" :key="j">
					<view class="img">
						<img :src="assetsHost + spu.img">
					</view>
					<view class="spu-info">
						<view class="name">
							{{spu.name}}
						</view>
					</view>
					<view class="price">
						¥{{spu.avgPrice}}
						<view class="count">
							× {{spu.count}}
						</view>
					</view>
				</view>
				<view class="sum">
					合计：¥{{order.total - order.ticketsDis}}
				</view>
			</view>
		</view>
		<view v-show="orderList.length === 0" class="empty-block">
			<view class="img">
				<image src="/static/img/empty.png" mode="aspectFit"></image>
			</view>
			<view class="tip">
				您还没有相关的订单
			</view>
			<view class="sub-tip">
				可以去看看有哪些想买的
			</view>
			<view @tap="toHome" class="empty-btn">
				随便逛逛
			</view>
			<recommend v-if="showRecommend" :cates="[1,2,3]"></recommend>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import Recommend from '@/components/recommend.vue'
	let assetsHost = config.domain.assetsHost
	export default {
		name: 'orderList',
		components: {Recommend},
		data(){
			return {
				orderList: [{}],
				assetsHost: assetsHost,
				statuType: null,
				statuEnum: [
					{
						type: -1,
						name: '全部'
					},
					{
						type: 0,
						name: '待发货'
					},
					{
						type: 1,
						name: '待收货'
					},
					{
						type: 2,
						name: '待评价'
					},
					{
						type: 3,
						name: '退换货'
					}
				],
				showRecommend: false
			}
		},
		onLoad(option){
			this.statuType = option.tabCode || -1
		},
		methods: {
			getOrderList(){
				httpApi.orderController.orderList({statu: this.statuType}).then(res => {
					if(res.success){
						if(res.data.length === 0){
							this.showRecommend = true
						}
						this.orderList = res.data
					}
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			},
			orderStatus(status){
				if(status === 0){
					return '待发货'
				}
				if(status === 1){
					return '待收货'
				}
				if(status === 2){
					return '待评价'
				}
				if(status === 3){
					return '退换货'
				}
			},
			toDetail(orderNo){
				if(!orderNo){
					uni.showToast({
						title: '缺少订单编号',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return
				}
				uni.navigateTo({
					url: '/pages/order/order?orderNo='+orderNo
				});
			},
			toHome(){
				uni.switchTab({
					url: '/pages/tabBar/home'
				})
			},
			checkStatu(statu){
				this.statuType = statu.type
			}
		},
		watch:{
			statuType(val){
				this.getOrderList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		min-height: 100vh;
		background-color: #f5f5f5;
		box-sizing: border-box;
		.status-wrap{
			display: flex;
			background-color: #ffffff;
			.statu{
				margin: 0 30upx;
				padding: 20upx 0;
				flex: 1;
				text-align: center;
				font-size: 28upx;
				border-bottom: solid 2upx transparent;
				&.active{
					color: #f47925;
					border-color: #f47925;
				}
			}
		}
		.each-order{
			margin: 20upx;
			padding: 20upx;
			border-radius: 14upx;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
			background-color: #ffffff;
			.order-header{
				display: flex;
				font-size: 24upx;
				padding: 10upx;
				.brand{
					flex: 1;
				}
				.status{
					color: #f06c7a;
				}
			}
			.goods-wrap{
				.each-goods{
					display: flex;
					padding: 10upx;
					font-size: 26upx;
					.img{
						width: 180upx;
						height: 180upx;
						font-size: 0;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.spu-info{
						flex: 1;
						padding: 10upx 20upx;
						line-height: 1.3;
						.actives{
							.each-active{
								display: inline-block;
								margin: 10upx 10upx 10upx 0;
								padding: 6upx 10upx;
								color: #ffffff;
								background-color: #f06c7a;
							}
						}
						.actived-info{
							font-size: 24upx;
							text-overflow: ellipsis;
							color: #999;
						}
					}
					.price{
						padding: 10upx 0;
						width: 100upx;
						text-align: right;
						.count{
							color: #999;
						}
					}
				}
				.ext-info{
					.cell{
						margin: 20upx 0;
						display: flex;
						align-items: center;
						font-size: 28upx;
						.content{
							padding: 0 20upx;
							flex: 1;
							color: #999;
						}
					}
				}
				.sum{
					text-align: right;
					font-size: 26upx;
					margin: 20upx 0;
				}
			}
		}
		.empty-block{
			padding-top: 180upx;
			text-align: center;
			.img{
				width: 160upx;
				height: 160upx;
				margin: 20upx auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.tip{
				 margin: 12upx 0;
				color: #333333;
				font-size: 32upx;
			}
			.sub-tip{
				color: #999999;
				font-size: 24upx;
			}
			.empty-btn{
				display: inline-block;
				font-size: 26upx;
				line-height: 64upx;
				padding: 0 46upx;
				height: 64upx;
				color: #ffffff;
				background-image: -webkit-linear-gradient(left, #fd9126, #ff5000);
				background-image: linear-gradient(to right, #fd9126, #ff5000);
				border-radius: 32upx;
				margin-top: 70upx;
			}
		}
	}
</style>
