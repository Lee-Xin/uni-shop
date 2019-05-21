<template>
	<view>
		
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			httpApi.getFavorities().then(res => {
				console.log(res);
			}).catch(e => {
				if(e.callback){
					e.callback()
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
