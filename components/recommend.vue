<template>
	<view>
		<view class="guess-like"></view>
		<goods-list :goodsList="goodsList"></goods-list>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import GoodsList from '@/components/goods-list.vue'
	export default {
		components: {GoodsList},
		props: {
			cates: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data(){
			return {
				goodsList: []
			}
		},
		mounted(){
			if(this.cates.length > 0){
				this.getGoodsByCates(this.cates)
			}
		},
		methods: {
			async getGoodsByCates(cates){
				this.goodsList = []
				for(let i = cates.length- 1; i >= 0; i--){
					let res = await httpApi.getProductsByParent({parentId: cates[i]})
					let goodsArr = []
					Object.keys(res.data).forEach(t => {
						goodsArr = goodsArr.concat(res.data[t])
					})
					this.goodsList = this.goodsList.concat(goodsArr)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.guess-like{
		margin-top: 60upx;
	}
</style>
