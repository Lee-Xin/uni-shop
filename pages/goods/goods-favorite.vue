<template>
	<view>
		<view @tap="toGoods(item.id)" v-for="(item ,i) in goodsList" :key="i" class="each-spu">
			<view class="img">
				<img :src="assetsHost+item.img">
			</view>
			<view class="content">
				<view class="name">
					{{item.name}}
				</view>
				<view class="des">
					{{item.des}}
				</view>
				<view class="actives">
					<view class="active" v-for="(active, j) in item.actives" :key="j">
						{{active.name}}
					</view>
				</view>
				<view class="sales">
					销量: {{item.sales}}
				</view>
				<view class="handle-line">
					<view class="price">
						¥{{item.price}}
					</view>
					<view @tap.stop="remove(item.id)" class="remove">
						移除
					</view>
					<view @tap.stop="toCart(item.id)" class="toCart">
						拼团
					</view>
				</view>
			</view>
		</view>
		<view class="empty" v-if="goodsList.length === 0">
			空空如也~
		</view>
		<view class="recommand">
			<recommend v-if="likeCates.length > 0" :cates="likeCates"></recommend>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import Recommend from '@/components/recommend.vue'
	let assetsHost = config.domain.assetsHost
	export default {
		components: {Recommend},
		data() {
			return {
				assetsHost: assetsHost,
				goodsList: [],
			};
		},
		onShow(){
			this.loadFavorities()
		},
		computed: {
			likeCates(){
				let parentId = []
				this.goodsList.forEach(t => {
					if(t.parentid){
						parentId.push(t.parentid)
					}
				})
				let set = new Set(parentId)
				return Array.from(set)
			}
		},
		methods: {
			loadFavorities(){
				httpApi.getFavorities().then(res => {
					if(res.success){
						this.goodsList = res.data.filter(data => data.isFavorite === 1)
					}
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			},
			toGoods(spu_id) {
				uni.navigateTo({
					url: '../goods/goods?pid='+spu_id
				});
			},
			toCart(spu_id){
				httpApi.toCart({pid: spu_id}).then(res => {
					if(res.success){
						uni.showToast({
							title: res.message,
							mask: false,
							icon: 'none',
							duration: 1500
						});
					} else {
						uni.showModal({
							title: '系统提示',
							content: '该商品已加入购物车，是否前往查看？',
							showCancel: true,
							cancelText: '取消',
							confirmText: '确定',
							success: res => {
								if(res.confirm){
									uni.switchTab({
										url: '/pages/tabBar/cart'
									})
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}).catch(e => {
					console.log(e.message);
					if(e.callback){
						e.callback()
					}
				})
			},
			remove(spu_id){
				httpApi.disKeep({pid: spu_id}).then(res => {
					if(res.success){
						this.loadFavorities()
					}
				}).catch(e => {
					console.log(e);
				})
			}
		}
	}
</script>

<style lang="scss">
	.each-spu{
		margin: 20upx;
		display: flex;
		.img{
			width: 280upx;
			height: 280upx;
			border-radius: 10upx;
			overflow: hidden;
			border: solid 2upx #f5f5f5;
			img{
				width: 100%;
				max-height: 100%;
			}
		}
		.content{
			flex: 1;
			position: relative;
			margin-left: 20upx;
			font-size: 28upx;
			line-height: 42upx;
			padding: 10upx 0 52upx;
			.name{
				border: 0px solid black;
				position: relative;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				color: #333333;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.des{
				color: #999999;
			}
			.actives{
				&:after{
					content: '';
					display: block;
					clear: both;
				}
				.active{
					float: left;
					margin: 10upx 10upx 10upx 0;
					font-size: 24upx;
					line-height: 24upx;
					padding: 8upx;
					background-color: #f06c7a;
					color: #fff;
				}
			}
			.sales{
				color: #999999;
				font-size: 24upx;
			}
			.handle-line{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				.price{
					float: left;
					color: #f06c7a;
					height: 50upx;
					line-height: 50upx;
				}
				.remove{
					height: 50upx;
					line-height: 50upx;
					padding: 0 30upx 0 20upx;
					border-top-right-radius: 30upx;
					border-bottom-right-radius: 30upx;
					float: right;
					font-size: 24upx;
					color: #fff;
					background-color: #999999;
				}
				.toCart{
					height: 50upx;
					line-height: 50upx;
					padding: 0 20upx 0 30upx;
					border-top-left-radius: 30upx;
					border-bottom-left-radius: 30upx;
					float: right;
					font-size: 24upx;
					color: #fff;
					background-color: #f47925;
				}
			}
		}
	}
	.empty{
		margin: 20upx 0;
		font-size: 28upx;
		text-align: center;
	}
</style>
