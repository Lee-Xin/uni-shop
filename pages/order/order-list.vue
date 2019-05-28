<template>
	<view>
		<view v-for="(order,i) in orderList" :key="i">
			{{order}}
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	export default {
		name: 'orderList',
		data(){
			return {
				orderList: []
			}
		},
		onShow(){
			this.getOrderList()
		},
		methods: {
			getOrderList(){
				httpApi.orderController.orderList().then(res => {
					console.log(res);
				}).catch(e => {
					console.log(e);
				})
			}
		}
	}
</script>

<style>
</style>
