<template>
	<view>
		<view class="each-ticket" v-if="tickets" v-for="(ticket, i) in tickets" :key="i">
			<ticket :ticket="ticket" @handleClick="toCate({cate_parent: ticket.cate_parent, cate_id: ticket.cate_id, cate_name: ticket.cate_name})"></ticket>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import ticket from '@/components/goods-related/ticket.vue'
	export default {
		components: {ticket},
		data() {
			return {
				tickets: []
			};
		},
		onLoad(){
			this.getTickets()
		},
		methods: {
			getTickets(){
				httpApi.userController.getTickets().then(res => {
					if(res.success){
						this.tickets = res.data
					}
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			},
			toCate(cate){
				uni.navigateTo({
					url: '/pages/goods/goods-list?cid=' + cate.cate_id + '&name=' + cate.cate_name
				});
			}
		}
	}
</script>

<style lang="scss">
</style>
