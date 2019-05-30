<template>
	<view class="wrap">
		<view class="status">
			<view class="text">
				{{orderDetail.orderDes.status | statusText}}
			</view>
			<view class="img">
				<img :src="`/static/img/status${orderDetail.orderDes.status}.webp`">
			</view>
		</view>
		<view class="each-order">
			<view class="order-header">
				<view class="brand">
					厂家品牌：青岛欧派
				</view>
			</view>
			<view class="goods-wrap">
				<view class="each-goods" v-for="(spu,j) in orderDetail.orderInfo" :key="j">
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
			</view>
			<view class="order-info">
				<view class="each-line">
					<view class="title">
						运费
					</view>
					<view>
						¥ {{orderDetail.orderDes.deliver | toFix(2)}}
					</view>
				</view>
				<view class="each-line">
					<view class="title">
						实付款（含运费）
					</view>
					<view class="sum">
						¥ {{orderDetail.orderDes.total | toFix(2)}}
					</view>
				</view>
			</view>
		</view>
		<view class="order-detail">
			<view class="each-line">
				<view class="title">
					订单编号
				</view>
				<view>
					{{orderDetail.orderDes.orderNo}}
				</view>
			</view>
			<view class="each-line">
				<view class="title">
					创建时间
				</view>
				<view>
					{{dateFormat(orderDetail.orderDes.time * 1000, 'YYYY-MM-DD HH:mm:ss')}}
				</view>
			</view>
			<view class="each-line">
				<view class="title">
					订单状态
				</view>
				<view>
					{{orderDetail.orderDes.status | statusText}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import {dateFormat} from '@/common/lib/commonFunc.js'
	let assetsHost = config.domain.assetsHost
	export default {
		name: 'OrderDetail',
		filters: {
			statusText: function(value) {
				if(value === 0){
					return '待发货'
				}
				if(value === 1){
					return '待收货'
				}
				if(value === 2){
					return '待评价'
				}
				if(value === 3){
					return '退换货'
				}
				return '待发货'
			},
			toFix(val, arg){
				if(val !== undefined){
					return val.toFixed(arg)
				}
				return ''
			}
		},
		data(){
			return {
				assetsHost: assetsHost,
				dateFormat: dateFormat,
				orderDetail: {
					orderDes: {},
					orderInfo: {}
				}
			}
		},
		onLoad(option){
			if(option.orderNo){
				this.getOrderDetail(option.orderNo)
			} else {
				uni.showToast({
					title: '缺少订单编号',
					mask: false,
					duration: 1500,
					icon: 'none'
				});
			}
		},
		methods: {
			getOrderDetail(orderNo){
				httpApi.orderController.getOrderDetail({orderNo: orderNo}).then(res => {
					this.orderDetail = res.data
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		color: #333333;
		background-color: #f2f2f2;
		.status{
			display: flex;
			align-items: center;
			background: linear-gradient(to right, rgb(255, 44, 116), rgb(254, 55, 53)) center center / cover no-repeat;
			padding: 0 60upx;
			.text{
				flex: 1;
				color: #ffffff;
				font-size: 32upx;
			}
			.img{
				font-size: 0;
				img{
					width: 280upx;
				}
			}
		}
		.each-order{
			margin: 20upx 0;
			padding: 20upx;
			background-color: #ffffff;
			.order-header{
				display: flex;
				font-size: 26upx;
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
				
			}
			.order-info{
				.each-line{
					margin: 20upx 0;
					display: flex;
					align-items: center;
					font-size: 28upx;
					.title{
						flex: 1;
					}
					.sum{
						text-align: right;
						font-size: 34upx;
						color: #f06c7a;
					}
				}
			}
		}
		.order-detail{
			padding: 20upx;
			background-color: #ffffff;
			font-size: 26upx;
			.each-line{
				margin: 10upx 0;
				display: flex;
				align-items: center;
				.title{
					flex: 1;
				}
			}
		}
	}
</style>
