<template>
	<view class="swiper-box">
		<swiper circular="true" autoplay="true" @change="swiperChange">
			<swiper-item v-for="swiper in swiperList" :key="swiper.id">
				<img :src="assetsHost+swiper.imgpath" @tap="$emit('clickFn',swiper)"/>
			</swiper-item>
		</swiper>
		<view class="indicator">
			<view
				class="dots"
				v-for="(swiper, index) in swiperList"
				:class="[currentSwiper >= index ? 'on' : '']"
				:key="index"
			></view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		props: {
			swiperList: {
				type: Array
			}
		},
		data() {
			return {
				currentSwiper: 0,
				assetsHost: config.domain.assetsHost
			};
		},
		methods: {
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			}
		}
	}
</script>

<style lang="scss">
.swiper-box {
	width: 100%;
	height: 22vh;
	overflow: hidden;
	position: relative;
	//兼容ios，微信小程序
	z-index: 1;
	swiper {
		width: 100%;
		height: 100%;
		swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.indicator {
		position: absolute;
		bottom: 20upx;
		left: 20upx;
		background-color: rgba(255, 255, 255, 0.4);
		width: 150upx;
		height: 5upx;
		border-radius: 3upx;
		overflow: hidden;
		display: flex;
		.dots {
			width: 100%;
			&.on {
				background-color: rgba(255, 255, 255, 1);
			}
		}
	}
}
</style>
