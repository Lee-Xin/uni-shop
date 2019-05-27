<template>
	<view :class="{default: parseInt(addr.is_default) === 1}" class="addr-wrap">
		<view class="info">
			<view class="user-info">
				<view class="name">
					{{addr.receiver}}
				</view>
				<view class="tel">
					{{addr.tel}}
				</view>
			</view>
			<view class="addr-info">
				{{addr.province}}{{addr.city}}{{addr.district}}{{addr.detail}}
			</view>
		</view>
		<view class="default">默认</view>
		<view class="arrow"><view class="icon xiangyou"></view></view>
	</view>
</template>

<script>
	export default {
		props: {
			addr: {
				type: Object,
				default(){
					return {
						
					}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.addr-wrap{
		display: flex;
		align-items: center;
		padding: 20upx;
		margin: 20upx;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		&.default{
			background-color: #f06c7a;
			color: #ffffff;
			.tel{
				color: #d8d8d8!important;
			}
			.default{
				display: block;
			}
		}
		.info{
			flex: 1;
		}
		.user-info{
			&:after{
				content: '';
				display: block;
				clear: both;
			}
			.name{
				display: inline-block;
				font-size: 32upx;
			}
			.tel{
				display: inline-block;
				margin-left: 10upx;
				font-size: 26upx;
				color: #999999;
				vertical-align: bottom;
			}
		}
		.addr-info{
			margin-top: 10upx;
			line-height: 32upx;
			font-size: 26upx;
		}
		.default{
			display: none;
			font-size: 26upx;
			line-height: 26upx;
			margin-bottom: 6upx;
		}
	}
</style>
