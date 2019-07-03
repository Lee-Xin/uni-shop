<template>
	<view class="wrap">
		<view class="text">优惠</view>
		<view class="content">
			<view class="activeItem">
				<p>1</p>
				<p>2</p>
				<p>3</p>
			</view>
		</view>
		<view class="arrow"><view class="icon xiangyou"></view></view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	export default {
		name: 'discount',
		props: {
			pid: {
				type: String || Number
			}
		},
		mounted(){
			this.getDiscountInfo()
		},
		data(){
			return {
				
			}
		},
		methods: {
			async getDiscountInfo(){
				let res = await httpApi.productController.productTickets({pid: this.pid})
				console.log(res);
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		width: 92%;
		padding: 20upx 4%;
		margin: 20upx 0;
		display: flex;
		align-items: flex-start;
		background-color: #ffffff;
		.text{
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content{
			flex: 1;
		}
		.arrow .icon {
			color: #ccc;
		}
	}
</style>
