<template>
	<view class="goods-list">
		<view v-for="(item, index) in goodsList" :key="index" class="product" @tap="toGoods(item)">
			<image mode="widthFix" :src="assetsHost+''+item.img"></image>
			<view class="name">{{ item.name }}</view>
			<view class="info">
				<view class="price">{{ item.price}}</view>
				<active-flag :activeId="item.active_id"></active-flag>
			</view>
		</view>
	</view>
</template>

<script>
	import ActiveFlag from '@/components/active-flag.vue'
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				assetsHost: config.domain.assetsHost
			};
		},
		props: {
			goodsList: {
				type: Array
			}
		},
		components: {ActiveFlag},
		methods: {
			//商品跳转
			toGoods(product) {
				uni.navigateTo({
					url: '../goods/goods?pid='+product.pid
				});
			}
		}
	}
</script>

<style lang="scss">
.goods-list{
	width: 92%;
	padding: 0 4% 3vw 4%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	.product {
		width: 48%;
		border-radius: 20upx;
		background-color: #fff;
		margin: 0 0 15upx 0;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
		image {
			width: 100%;
			border-radius: 20upx 20upx 0 0;
		}
		.name {
			width: 92%;
			padding: 10upx 4%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			text-align: justify;
			overflow: hidden;
			font-size: 30upx;
		}
		.info {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			width: 92%;
			padding: 10upx 4% 10upx 4%;
	
			.price {
				color: #e65339;
				font-size: 30upx;
				font-weight: 600;
			}
		}
	}
}
</style>
