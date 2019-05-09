<template>
	<view>
		<view class="container">
			<view class="bg-wrap">
				<view class="bg-img"></view>
			</view>
			{{page}}
			<view class="card-wrap" :class="{moving: isMoving}" :style="{transform: `translateX(${touchInfo.initTranslate}px)`}" ref="cardWrap">
				<view v-for="(card, index) in imgs" :key="index" class="card" :class="{'current': currentIndex === index}">
					<image :src="'http://localhost:3000'+card.src" mode="aspectFill"></image>
					<view class="name">
						{{card.name}}
					</view>
					<view class="des">
						{{card.des}}
					</view>
					<img class="shadow" width="100%" src="http://localhost:3000/images/shadow.png">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [
					{
						src: '/images/avatar.png',
						name: '名称',
						des: '描述'
					},
					{
						src: '/images/avatar.png',
						name: '名称',
						des: '描述'
					},
					{
						src: '/images/avatar.png',
						name: '名称',
						des: '描述'
					},
					{
						src: '/images/avatar.png',
						name: '名称',
						des: '描述'
					}
				],
				currentIndex: 0,
				touchInfo: {
					start: 0,
					end: 0,
					moved: 0,
					initTranslate: 0
				},
				isMoving: false,
				page: 0
			};
		},
		mounted(){
			this.addEvent()
		},
		methods: {
			addEvent(){
				let wrap = this.$refs.cardWrap.$el
				let init = 0
				wrap.addEventListener('touchstart', (e) => {
					this.touchInfo.start = e.targetTouches[0].clientX
					init = this.touchInfo.initTranslate
				})
				wrap.addEventListener('touchmove', (e) => {
					this.isMoving = true
					this.touchInfo.end = e.touches[0].clientX
					this.touchInfo.moved = this.touchInfo.end - this.touchInfo.start
					this.touchInfo.initTranslate = init + this.touchInfo.moved
				})
				wrap.addEventListener('touchend', (e) => {
					this.isMoving = false
					if(this.touchInfo.moved < -150){
						// 左滑
						if(this.page < this.imgs.length){
							this.page ++
						}
					} else if(this.touchInfo.moved > 150) {
						// 右滑
						if(this.page > 0){
							this.page -- 
						}
					}
					this.touchInfo.initTranslate = - 250 * this.page
				})
			}
		},
		watch: {
			page(val){
				this.touchInfo.initTranslate = - 250 * val
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: relative;
	white-space: nowrap;
	width: 100%;
	overflow-x: hidden;
	padding-bottom: 100%;
	.bg-wrap{
		position: absolute;
		width: 100%;
		height: 87%;
		overflow: hidden;
		.bg-img{
			height: 100%;
			background-image: url('http://localhost:3000/images/bg.webp');
			background-repeat: no-repeat;
			background-size: cover;
			background-position: top;
			filter: blur(16upx);
		}
	}
	.card-wrap{
		position: absolute;
		width: 100%;
		transition: all 300ms ease 0ms;
		&.moving{
			transition: all 0ms ease 0ms;
		}
		.card{
			position: relative;
			width: 60vw;
			height: 80%;
			transform: scaleY(0.8);
			margin-top: 10%;
			display: inline-block;
			margin-left: 25upx;
			border-radius: 24upx;
			overflow: hidden;
			background-color: #fff;
			&.current{
				width: 70vw;
				transform: scaleY(1);
			}
			uni-image{
				width: 100%;
			}
			.name{
				padding: 20upx 20upx 0 20upx;
				font-size: 36upx;
				white-space: nowrap;
				overflow-x: hidden;
				text-overflow: ellipsis;
			}
			.des{
				font-size: 26upx;
				padding: 0 20upx 20upx 20upx;
				white-space: nowrap;
				overflow-x: hidden;
				text-overflow: ellipsis;
			}
			.shadow{
				position: absolute;
				bottom: -10upx;
			}
		}
	}
}
</style>
