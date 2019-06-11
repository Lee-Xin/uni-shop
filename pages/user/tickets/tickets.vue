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
						{{ticket.cate_id}} 
					</view>
					<view>
						{{dateFormat(ticket.begin_time, 'YYYY.MM.DD')}}-{{dateFormat(ticket.end_time, 'YYYY.MM.DD')}}
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
		}
	}
</style>
