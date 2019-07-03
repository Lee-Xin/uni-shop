<template>
	<view class="popup" :class="showPopup" @touchmove.stop.prevent="discard" @tap.stop="hidePopup">
		<!-- 遮罩层 -->
		<view class="mask"></view>
		<view class="layer" @tap.stop="discard">
			<view class="content">
				<slot></slot>
			</view>
			<view class="btn"><view class="button" @tap="hidePopup">完成</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'popup',
		props: {
			showPopup: {
				type: String,
				default: 'none'
			}
		},
		methods: {
			discard(){},
			hidePopup(){
				this.$emit('update:showPopup', 'hide')
				setTimeout(() => {
					this.$emit('update:showPopup', 'none')
				}, 200)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.content {
				width: 100%;
				padding: 20upx 0;
				overflow-y: auto;
				max-height: calc(100% - 200upx);
			}
			.btn {
				width: 100%;
				height: 100upx;
				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		&.service {
			.row {
				margin: 30upx 0;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
		&.actives {
			.row {
				margin: 30upx 0;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
