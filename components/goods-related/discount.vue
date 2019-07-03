<template>
	<view v-if="tickets.length > 0" @tap="showPopup = 'show'" class="wrap">
		<view class="text">优惠</view>
		<view class="content">
			<view class="tickets">优惠券</view>
		</view>
		<view class="arrow"><view class="icon xiangyou"></view></view>
		<popup :showPopup.sync="showPopup">
			<ticket v-for="item in tickets" :ticket="item" :fetch="true" :key="item.id" @handleClick="fetchTicket(item)"></ticket>
		</popup>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import ticket from '@/components/goods-related/ticket.vue'
	import popup from '@/components/popup.vue'
	export default {
		name: 'discount',
		components: {ticket, popup},
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
				tickets: [],
				showPopup: 'none'
			}
		},
		methods: {
			async getDiscountInfo(){
				let res = await httpApi.productController.productTickets({pid: this.pid})
				this.tickets = res.data
			},
			fetchTicket(ticket){
				httpApi.userController.fetchTicket({ticketId: ticket.id})
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
			font-size: 0;
		}
		.arrow .icon {
			color: #ccc;
		}
		.tickets{
			position: relative;
			display: inline-block;
			margin: 0 17upx 0 18upx;
			padding: 0 11upx 0 6upx;
			border-top: 1px solid #e4393c;
			border-bottom: 1px solid #e4393c;
			height: 32upx;
			line-height: 28upx;
			color: #fff;
			background-color: #e4393c;
			font-size: 24upx;
			vertical-align: top;
			&:before {
				content: "";
				position: absolute;
				top: -1px;
				left: -9px;
				height: 18px;
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAAAAXNSR0IArs4c6QAAAc9JREFUSA3tV8FKw0AQndnGH1BCqeg3ePGmaYvSo/6Bn1EFQQ0IgvYvevKsx6LQRm8e/AehpQT9AZusM7EbIk022QTBggthN7vvvdmZ3cluEKi8t9sbwSzoAWBLStngvqKl/uwhY6c7jlQcRJxQu2836ufWe7O5OfsMXqljFSDGKGypej7JE38yBRGE8uZbvJSWniTlkeCw6FHlRyke66JMzFXci5gmD363LL8ByzRAyf1ehLv8Ifp7HnAOGOWBEJRtKA4R0CuyaEUwrMWakbbteRP7aXhvd/ba9Fm8KiKgw7AGa0WapB2vAbpuaHf2z6p4wtxIg7TUJKJvuXrh2t9tHYQyvEv26dpqPTg/OCw88yQ+9iDuxPAlbps2UriLBkxFc/CLBqTYzuFkD6dwfxiQrsvnQzdbAUCXB8xljSQ/fuEBf/BwKUE6SYBJm7mRRsKI5TtOA8g1f/DYpSOutLiaCGmckpZDu7EHtOhWGMIYIN62ClepZk8oXA5fUv7Pg9xQxrsoF1kSYGxAlwdpczA2kCai61t+Axbf5U3upyXuRXKoi2GVMTrNxqIm8JhEPqoIZXIR+2JtNHqzVmpbiHA7//XJxBcdYB16rukX6uILoFakBSZBhI8AAAAASUVORK5CYII=);
				background-size: 15px 18px;
				background-repeat: no-repeat;
				width: 9px;
			}
			&:after {
				content: "";
				position: absolute;
				top: -1px;
				right: -3.5px;
				height: 18px;
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAAAAXNSR0IArs4c6QAAAc9JREFUSA3tV8FKw0AQndnGH1BCqeg3ePGmaYvSo/6Bn1EFQQ0IgvYvevKsx6LQRm8e/AehpQT9AZusM7EbIk022QTBggthN7vvvdmZ3cluEKi8t9sbwSzoAWBLStngvqKl/uwhY6c7jlQcRJxQu2836ufWe7O5OfsMXqljFSDGKGypej7JE38yBRGE8uZbvJSWniTlkeCw6FHlRyke66JMzFXci5gmD363LL8ByzRAyf1ehLv8Ifp7HnAOGOWBEJRtKA4R0CuyaEUwrMWakbbteRP7aXhvd/ba9Fm8KiKgw7AGa0WapB2vAbpuaHf2z6p4wtxIg7TUJKJvuXrh2t9tHYQyvEv26dpqPTg/OCw88yQ+9iDuxPAlbps2UriLBkxFc/CLBqTYzuFkD6dwfxiQrsvnQzdbAUCXB8xljSQ/fuEBf/BwKUE6SYBJm7mRRsKI5TtOA8g1f/DYpSOutLiaCGmckpZDu7EHtOhWGMIYIN62ClepZk8oXA5fUv7Pg9xQxrsoF1kSYGxAlwdpczA2kCai61t+Axbf5U3upyXuRXKoi2GVMTrNxqIm8JhEPqoIZXIR+2JtNHqzVmpbiHA7//XJxBcdYB16rukX6uILoFakBSZBhI8AAAAASUVORK5CYII=);
				background-size: 15px 18px;
				background-repeat: no-repeat;
				width: 4.5px;
				background-position: -11px 0;
			}
		}
	}
</style>
