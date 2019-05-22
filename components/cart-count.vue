<template>
	<view>
		<view class="sub" @click="sub">
			<view class="icon jian"></view>
		</view>
		<view class="input">
			<input type="number" v-model="countNum" @change="triggerChange" />
		</view>
		<view class="add" @click="add">
			<view class="icon jia"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CartCount',
		props: ['count', 'pid'],
		data(){
			return {
				countNum: this.count || 0
			}
		},
		methods: {
			add(){
				this.countNum ++
				this.triggerChange()
			},
			sub(){
				if(this.countNum <= 1){
					// 提示继续减少，将会从购物车移除
					uni.showModal({
						title: '系统提示',
						content: '是否从购物车移除？',
						showCancel: true,
						cancelText: '否',
						confirmText: '是',
						success: res => {
							if(res.confirm){
								this.countNum = 0
								this.triggerChange()
							}
						},
						fail: () => {},
						complete: () => {}
					})
				} else {
					this.countNum --;
					this.triggerChange()
				}
			},
			triggerChange(){
				this.$emit('countChange', {pid: this.pid, count: parseInt(this.countNum)})
				this.$emit('update:count', parseInt(this.countNum))
			}
		}
	}
</script>

<style scoped lang="scss">
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');}
	.icon {
		font-family:"HMfont-home" !important;
		font-size:60upx;
		font-style:normal;
		color:#000000;
		&.jia {
			&:before{content:"\e641";}
		}
		&.jian {
			&:before{content:"\e643";}
		}
		&.shanchu {
			&:before{content:"\e6a4";}
		}
		
	}
	.input{
		width: 60upx;
		height: 60upx;
		margin: 0 10upx;
		background-color: #f3f3f3;
		input{
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 26upx;
		}
	}
	.sub ,.add{
		width: 45upx;
		height: 45upx;
		background-color: #f3f3f3;
		border-radius: 5upx;
		.icon{
			font-size: 22upx;
			width: 45upx;
			height: 45upx;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
	}
</style>
