<template>
	<view class="wrap">
		<view class="each-order" v-for="(order,i) in orderList" :key="i">
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
					合计：¥{{order.total}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	let assetsHost = config.domain.assetsHost
	export default {
		name: 'orderList',
		data(){
			return {
				orderList: [],
				assetsHost: assetsHost
			}
		},
		onShow(){
			this.getOrderList()
		},
		methods: {
			getOrderList(){
				httpApi.orderController.orderList().then(res => {
					console.log(res);
					if(res.success){
						this.orderList = res.data
					}
				}).catch(e => {
					console.log(e);
				})
			},
			orderStatus(status){
				if(status === 0){
					return '待付款'
				}
				if(status === 1){
					return '交易完成'
				}
				if(status === 2){
					return '交易关闭'
				}
				if(status === 3){
					return '待收货'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		.each-order{
			margin: 20upx;
			padding: 20upx;
			border-radius: 14upx;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
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
	}
</style>
