<template>
	<view class="ticket-wrap" >
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
			<view v-if="ticket.cate_name">
				{{ticket.cate_name + '类'}} 
			</view>
			<view class="time">
				{{dateFormat(ticket.begin_time, 'YYYY.MM.DD')}}-{{dateFormat(ticket.end_time, 'YYYY.MM.DD')}}
			</view>
		</view>
		<view class="btn" :class="{'disabled': !isBegin || isEnd}">
			<view class="jump" @tap="tapTicket">
				{{!isEnd && isBegin ? clickText : errorText}}
			</view>
		</view>
	</view>
</template>

<script>
	import {dateFormat} from '@/common/lib/commonFunc.js'
	export default {
		name: 'ticket',
		props: {
			ticket: {
				type: Object
			},
			clickText: {
				type: String,
				default: '去使用'
			}
		},
		data(){
			return {
				dateFormat: dateFormat,
				currentTs: new Date().getTime(),
			}
		},
		computed: {
			isBegin(){
				if(this.ticket.begin_time < this.currentTs) return true
				return false
			},
			isEnd(){
				if(this.ticket.end_time < this.currentTs) return true
				return false
			},
			errorText(){
				if(this.isEnd){
					return '已过期'
				}
				if(!this.isBegin){
					return '未开始'
				}
				return '不可用'
			}
		},
		methods: {
			tapTicket(){
				if(this.isBegin && !this.isEnd){
					this.$emit('handleClick')
					return
				}
				uni.showToast({
					title: '该优惠券' + this.errorText,
					icon: 'none'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
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
			&.disabled{
				background-color: #999999;
			}
			.jump{
				line-height: 0;
				line-height: 30upx;
			}
		}
	}
</style>
