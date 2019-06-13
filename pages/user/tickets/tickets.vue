<template>
	<view>
		<view class="each-ticket" v-if="tickets" v-for="(ticket, i) in tickets" :key="i">
			<view class="ticket-wrap">
				<view class="base-info">
					<view class="price">
						<view class="rmb">
							¥
						</view>
						<view class="discount">
							{{ticket.discount}}
						</view>
					</view>
					<view>
						满{{ticket.limit}}元可用
					</view>
				</view>
				<view class="text">
					<view>
						{{ticket.name}}
					</view>
					<view>
						{{ticket.cate_id === null ? '所有商品' : ticket.cate_name + '类'}} 
					</view>
					<view class="time">
						{{dateFormat(ticket.begin_time, 'YYYY.MM.DD')}}-{{dateFormat(ticket.end_time, 'YYYY.MM.DD')}}
					</view>
				</view>
				<view class="btn">
					<view class="jump" @tap="toCate({cate_parent: ticket.cate_parent, cate_id: ticket.cate_id, cate_name: ticket.cate_name})">
						去使用
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import {dateFormat} from '@/common/lib/commonFunc.js'
	export default {
		data() {
			return {
				tickets: [],
				dateFormat: dateFormat
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
	.each-ticket{
		.ticket-wrap{
			display: flex;
			align-items: center;
			font-size: 26upx;
			padding: 20upx;
			.base-info{
				padding: 20upx;
				text-align: center;
				.price{
					.rmb{
						display: inline-block;
						margin-right: 10upx;
					}
					.discount{
						display: inline-block;
						font-size: 60upx;
						font-weight: 600;
					}
				}
			}
			.text{
				flex: 1;
				line-height: 1.8;
				.time{
					font-size: 24upx;
					color: #999999;
				}
			}
			.btn{
				padding: 10upx 20upx;
				background-color: #f06c7a;
				border-radius: 40upx;
				color: #ffffff;
				.jump{
					line-height: 0;
					line-height: 30upx;
				}
			}
		}
	}
</style>
