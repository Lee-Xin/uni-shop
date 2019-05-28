<template>
	<view class="wrap">
		<addr-label class="addr-label" v-if="addr" :addr="addr"></addr-label>
		<view v-else @tap="addAddr" class="add-addr">添加收货地址</view>
		<view class="goods-list">
			<view class="brand">
				厂家品牌：青岛欧派
			</view>
			<view class="goods-wrap">
				<view class="each-goods" v-for="(spu,i) in goodsList" :key="i">
					<view class="img">
						<img :src="assetsHost + spu.img">
					</view>
					<view class="spu-info">
						<view class="name">
							{{spu.detail}}
						</view>
						<view class="actives">
							<view class="each-active" v-for="(active, j) in spu.actives" :key="j">
								{{active.des}}
							</view>
						</view>
						<view class="actived-info">
							<view class="each-actived" v-for="(active, j) in spu.activedInfo" :key="j">
								{{active}}
							</view>
						</view>
					</view>
					<view class="price">
						¥{{spu.price}}
						<view class="count">
							× {{spu.count}}
						</view>
					</view>
				</view>
				<view class="ext-info">
					<view class="cell">
						<view>配送方式</view>
						<view class="content">普通配送</view>
						<view>快递 免邮</view>
						<view class="arrow"><view class="icon xiangyou"></view></view>
					</view>
					<view class="cell">
						<view>订单备注</view>
						<view class="content">
							<input v-model="remark" type="text" placeholder="选填, 订单备注">
						</view>
					</view>
				</view>
				<view class="sum">
					<view class="count">
						共{{allSpuInfo.count}}件
					</view>
					小计：
					<view class="price">
						¥{{allSpuInfo.price}}
					</view>
					<view v-if="allSpuInfo.prePrice !== allSpuInfo.price" class="pre-price">
						¥{{allSpuInfo.prePrice}}
					</view>
				</view>
			</view>
		</view>
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{allSpuInfo.price}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AddrLabel from '@/components/addr-label.vue'
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	let assetsHost = config.domain.assetsHost
	export default {
		components: {AddrLabel},
		data() {
			return {
				addr: null,
				remark: '',
				addrList: [], // 收货地址列表
				goodsList: [],
				allSpuInfo: {},
				spuInfo: null,
				assetsHost: assetsHost,
			};
		},
		onLoad(option){
			if(option.spuInfo){
				this.spuInfo = option.spuInfo.split(',')
			}
		},
		onShow() {
			this.getAddr()
			this.getSpus()
		},
		methods: {
			toPay(){
				let paramGoods = []
				this.goodsList.forEach(t => {
					paramGoods.push({
						pid: t.pid,
						count: t.count
					})
				})
				httpApi.orderController.newOrder({goods: paramGoods, remark: this.remark}).then(res => {
					if(res.success){
						uni.navigateTo({
							url: '/pages/user/order_list/order_list'
						});
					} else {
						uni.showToast({
							title: res.message || '生成订单失败',
							mask: false,
							duration: 1500,
							icon: 'none'
						});
					}
				}).catch(e => {
					uni.showToast({
						title: e.message || '系统错误',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
				})
			},
			getAddr(){
				httpApi.userController.getAddr().then(res => {
					if(res.success){
						if(res.data.length > 0){
							this.addrList = res.data
							let defaultAddr = res.data.filter(t => t.is_default === 1)
							if(defaultAddr[0]){
								this.addr = defaultAddr[0]
							} else {
								this.addr = res.data[0]
							}
						}
					} else {
						uni.showToast({
							title: '查询收货地址失败',
							mask: false,
							duration: 1500,
							icon: 'none'
						});
					}
				}).catch(e => {
					console.log(e);
				})
			},
			addAddr(){
				uni.navigateTo({
					url: '/pages/user/address/edit'
				});
			},
			async getSpus(){
				if(!this.spuInfo){
					uni.showToast({
						title: '缺少商品信息参数',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let res = await httpApi.chooseCartSpu({spu_arr: this.spuInfo})
				if(res.success){
					this.goodsList = res.data.allSpu
					this.allSpuInfo = res.data.allSpuInfo
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		color: #333333;
		.addr-label{
			margin: 20upx 30upx;
		}
		.add-addr{
			padding: 20upx;
			margin: 20upx;
			box-shadow: 0px 4upx 20upx rgba(0, 0, 0, 0.1);
			font-size: 32upx;
			text-align: center;
		}
		.goods-list{
			padding: 20upx;
			margin: 30upx;
			box-shadow: 0px 4upx 20upx rgba(0, 0, 0, 0.1);
			.brand{
				font-size: 28upx;
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
					font-size: 28upx;
					view{
						display: inline-block;
					}
					.count{
						margin-right: 10upx;
						color: #999999;
						font-size: 24upx;
					}
					.price{
						color: #f47925;
					}
					.pre-price{
						margin-left: 10upx;
						font-size: 26upx;
						text-decoration: line-through;
						color: #999999;
					}
				}
			}
		}
	}

	.blck{
		width: 100%;
		height: 100upx;
	}
	.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 20upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.money{
					color: #f06c7a;
					font-size: 34upx;
					vertical-align: baseline;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
</style>
