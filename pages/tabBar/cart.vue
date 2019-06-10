<template>
	<view class="wrap">
		<view class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">购物车</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
			<view v-else-if="showGoodList" class="row" v-for="(row,index) in goodsList" :key="index" >
				<view class="goods-wrap">
					<!-- 商品 -->
					<view class="carrier">
						<view class="checkbox-box" @tap="select(row)">
							<view class="checkbox">
								<view :class="row.selected ? 'on' : ''"></view>
							</view>
						</view>
						<!-- 商品信息 -->
						<view class="goods-info" @tap="toGoods(row)">
							<view class="img">
								<image :src="assetsHost+row.img"></image>
							</view>
							<view class="info">
								<view class="title">{{row.detail}}</view>
								<view class="actives">
									<view class="active" v-for="(active,i) in row.actives" :key="i">
										{{active.name}}
									</view>
								</view>
								<view class="price-number" @click.stop="() => {}">
									<view class="price">￥{{row.price}}</view>
									<cart-count class="number" :count.sync="row.count" :pid="row.pid" @countChange="countChange"></cart-count>
								</view>
							</view>
						</view>
					</view>
					<view v-if="row.activedInfo && row.activedInfo.length > 0" class="actived-info">
						<view v-for="(info, i) in row.activedInfo" :key="i">
							{{info}}
						</view>
					</view>
				</view>
			</view>
        </view>
		<!-- 底部菜单 -->
		<view class="footer" :style="{bottom:footerbottom}">
			<view class="checkbox-box" @tap="selectAll">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="settlement">
				<view class="sum">
					合计:
					<view class="money">
						￥{{allSpuInfo.price}}
					</view>
					<view v-if="allSpuInfo.prePrice !== allSpuInfo.price" class="pre-price">
						￥{{allSpuInfo.prePrice}}
					</view>
				</view>
				<view @tap="toOrder" class="btn" :class="{disabled: activedGoodsList.length === 0}">下单({{allSpuInfo.count}})</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<recommend :cates="[1,2,3]"></recommend>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import CartCount from '@/components/cart-count.vue'
	import Recommend from '@/components/recommend.vue'
	export default {
		components: {CartCount, Recommend},
		data() {
			return {
				showGoodList: true,
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				goodsList:[], // 用于展示
				activedGoodsList: [],
				checkedSpus: [], // 选中的商品 pid 数组
				allSpuInfo: {
					price: 0,
					prePrice: 0,
					count: 0
				}, // 选中的商品总信息
				assetsHost: config.domain.assetsHost
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onShow(){
			this.checkedSpus = []
			this.loadAllProds()
		},
		onLoad() {
			//兼容H5下结算条位置
			// #ifdef H5
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
			// #endif
			// #ifdef APP-PLUS
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		computed:{
			isAllselected () {
				if(this.checkedSpus.length === this.goodsList.length){
					return true
				}
				return false
			}
		},
		methods: {
			// 加载所有商品
			loadAllProds(){
				httpApi.loadCart().then(res => {
					if(res.success){
						this.goodsList = JSON.parse(JSON.stringify(res.data))
						this.goodsList.forEach(t => {
							if(t.selected){
								this.checkedSpus.push(t.pid)
							}
						})
					}
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			},
			//商品跳转
			toGoods(e){
				uni.navigateTo({
					url: '/pages/goods/goods?pid=' + e.pid 
				});
			},
			// 选择或取消选择商品
			select(spu){
				spu.selected = !spu.selected
				// 选中
				if(spu.selected){
					let index = this.checkedSpus.indexOf(spu.pid)
					if(index === -1){
						this.checkedSpus.push(spu.pid)
					}
				}
				// 取消选中
				else {
					let index = this.checkedSpus.indexOf(spu.pid)
					if(index !== -1){
						this.checkedSpus.splice(index, 1)
					}
				}
			},
			// 重置商品列表信息（根据已选中的商品计算： activedInfo）
			computeGoodsList(){
				for(let i = this.goodsList.length - 1; i >= 0; i--){
					this.goodsList[i].activedInfo = []
					for(let j = this.activedGoodsList.length - 1; j >= 0; j--){
						if(this.activedGoodsList[j].pid === this.goodsList[i].pid){
							this.goodsList[i].activedInfo = this.activedGoodsList[j].activedInfo
						}
					}
				}
			},
			// 选择商品，计算总价、活动信息等
			async chooseCartSpu(){
				let res = await httpApi.chooseCartSpu({spu_arr: this.checkedSpus})
				if(res.success){
					this.activedGoodsList = res.data.allSpu
					this.allSpuInfo = res.data.allSpuInfo
					this.computeGoodsList()
					
					// 触发视图更新
					this.showGoodList = false
					this.$nextTick(() => {
						this.showGoodList = true
					})
				}
			},
			async countChange(param){
				let res = await httpApi.updateCart(param)
				
				if(param.count == 0){
					// 从选中列表中移除
					let index = this.checkedSpus.indexOf(param.pid)
					if(index !== -1){
						this.checkedSpus.splice(index, 1)
					}
					// 从购物车列表中移除
					
					for(let i = this.goodsList.length - 1; i >= 0; i--){
						if(this.goodsList[i].pid === param.pid){
							this.goodsList.splice(i, 1)
							break
						}
					}
					
				}
				
				// 数量改变后，执行选计算购物车方法
				this.chooseCartSpu()
			},
			selectAll(){
				if(this.isAllselected){
					this.checkedSpus = []
				} else {
					this.goodsList.forEach(t => {
						if(this.checkedSpus.indexOf(t.pid) === -1){
							this.checkedSpus.push(t.pid)
						}
					})
				}
			},
			toOrder(){
				if(this.checkedSpus.length === 0){
					return
				}
				uni.navigateTo({
					url: '/pages/order/confirmation?spuInfo=' + this.checkedSpus.join(',')
				});
			}
		},
		watch:{
			checkedSpus: {
				handler(val){
					// 全部取消选中
					if(val.length === 0){
						this.goodsList.forEach(t => {
							t.selected = 0
						})
					} else {
						val.forEach(pid => {
							this.goodsList.forEach(t => {
								if(pid === t.pid){
									t.selected = 1
								}
							})
						})
					}
					this.chooseCartSpu()
				},
				deep: true
			}
		}
	}
</script>
<style lang="scss">
	page{position: relative;}
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');}
	.icon {
		font-family:"HMfont-home" !important;
		font-size:60upx;
		font-style:normal;
		color:#000000;
		&.jia {
			&:before{content:"\e641";}
		}
		&.jian {
			&:before{content:"\e643";}
		}
		&.shanchu {
			&:before{content:"\e6a4";}
		}
		
	}
	.wrap{
		padding-bottom: 80upx;
	}
	.checkbox-box{
		display: flex;
		align-items: center;
		margin-right: 20upx;
		.checkbox{
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}
		.text{
			font-size: 28upx;
			margin-left: 10upx;
		}
	}
.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title{
			font-size: 36upx;
		}
		
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.goods-list{
		width: 100%;
		padding: 20upx 0 20upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: calc(92%);
			margin: 20upx auto;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					// font-size: 25upx;
				}
				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}
			.carrier{
				width: 100%;
				padding: 20upx;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;
				background-color: #fff;

				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-30%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-30%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				/deep/.checkbox{
					.uni-checkbox-input{
						border-radius: 50%;
					}
					.uni-checkbox-input-checked{
						background-color: #f06c7a;
						color: #ffffff!important;
						border-color: #f06c7a;
					}
				}
				.goods-info{
					width: 100%;
					display: flex;
					padding-right: 20upx;
					align-items: center;
					.img{
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;
						image{
							width: 22vw;
							height: 22vw;
						}
					}
					.info{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						padding-right: 20upx;
						.title{
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}
						.spec{
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}
						.actives{
							&:after{
								content: '';
								display: block;
								clear: both;
							}
							.active{
								float: left;
								padding: 4upx 6upx;
								margin: 10upx 10upx 10upx 0;
								font-size: 24upx;
								background-color: #f06c7a;
								color: #ffffff;
							}
						}
						.price-number{
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							.price{
								color: #f47925;
							}
							.number{
								display: flex;
								justify-content: center;
								align-items: flex-end;
							}
						}
					}
				}
			}
			.actived-info{
				padding: 10upx 20upx;
				border-top: solid 1px #efefef;
				font-size: 24upx;
				color: #666666;
			}
		}
	}
	.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		.delBtn{
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement{
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				font-size: 28upx;
				margin-right: 10upx;
				line-height: 38upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
					margin-left: 10upx;
				}
				.pre-price{
					font-size: 24upx;
					text-decoration: line-through;
					vertical-align: middle;
					margin: 0 10upx;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 30upx;
				&.disabled{
					background-color: #a7a7a7;
				}
			}
		}
	}
</style>
