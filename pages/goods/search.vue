<template>
	<view>
		<view class="search-input">
			<input v-model="searchContent" focus ref="searchInput" @confirm="doSearch" :placeholder="searchTip" type="text" confirm-type="search">
			<button class="search-btn" type="warn" size="mini" @tap="doSearch">搜索</button>
		</view>
		<view class="history">
			<search-content class="each-search" @clickFn="fastDoSearch(content)" v-for="(content, index) in historyList" :key="`history${index}`" :content="content"></search-content>
		</view>
		<view>
			<a href="http://192.168.169.108/signInfo/viewDetail?ts=1555641631703&sign=kBmoCTbBKPfUq29yCkqqTI9ATvdLsnrA9rP1hyJ0kPk&signNo=SSN1115076319647371264&tokenKey=st&token=x-gJ7YHbBzhzTiagXL_OWo1nojP_JJLm0br36HdXKDUHu3Doc_ADSFdu-0oMHwEK-BhhFkyTeAEua2lvbn5sRQ">跳转</a>
		</view>
		<view style="height: 200vh">
			121
		</view>
	</view>
</template>

<script>
	import SearchContent from '@/components/search-content.vue'
	export default {
		components:{SearchContent},
		data() {
			return {
				searchTip: '集成灶',
				searchContent: '',
				historyList: ['油烟机','燃气灶']
			};
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 200);
		},
		methods: {
			doSearch(){
				uni.request({
					url: 'http://localhost:3000/test',
					method: 'GET'
				}).then(data => {
					let [error, res] = data
					console.log(res)
				})
				// 调用搜索接口
				console.log(this.searchContent);
			},
			fastDoSearch(content){
				console.log(content);
			},
			test(){
				console.log(this.$refs.searchInput.$refs)
			}
		}
	}
</script>

<style lang="scss">
	.search-input{
		margin: 0 20upx;
		display: flex;
		align-items: center;
		.search-btn{
			margin: 0 0 0 20upx;
		}
		input{
			position: relative;
			flex: 1;
			border-radius: 40upx;
			background-color: #ececec;
			font-size: 28upx;
			padding: 8upx 0 8upx 60upx;
			&::before{
				content: '';
				display: inline-block;
				width: 28upx;
				height: 28upx;
				position: absolute;
				left: 20upx;
				top: 50%;
				margin-top: -16upx;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAD60lEQVRYR82Y7VEUQRCGeyIQIhAiECMAIkAjUCKgNwIxgnuNQIhAiMAjAiECjwiECMZ6t6a3emdnv5Wiq/bH3e3MPdPfPUFeuYS5fKq6F0I4izF+EJE9ETlIj211LyK7EMI2xngHgJ8Xy2RAVT0RkQsRIdgcuQ8hYLPZXM9ZZO+OAqrqkYhsRISAa2QnIucAtnM2GQSsquoixoieDW9FpDZnevgaTc4D8eGB3hTWAkA1FbIXUFW/i8jnbKNHEbkUkRsAT2N/oqp0BxWR4+xdHux0yh5FQFX9kfnaM/8IwNUYVOl3VeVBaQmv0UmQHcCC5h6oybXRyOgXEfrfO3eIKwDnQ4duAaaT0rQmhDvxpkhmY9DsAJzO1aiq0gqf3LqKTtm3TwOYTvg7OTrfp1kPDC79TnhLMw8AGAyzpEeThwAYbB3xgPnJ3ptZ06Y/U3Su8kcSqCqTO33QfPIaQB6QNWwNmAD+OPzWAlX9leA6Jp+lPveyqjIbfHFfFbVogEwF9CuT5mW30T+Dc0qhFt+mP/0GgBwtMcAbETlLvzTaS6agX1Iaky/VWr5OVb1iGHSHHcCCeT8CIDBNb2bo9ZE1sKmM0n1MOkoIqQlgAJjsZ5HLUzITjFaOJbCqyug1M3dSDgEZPZb7FqWOJWC2RlWZvK0UfgVAqzVCQB9N7N/Wdi2DvFVVHW82mzsH6NNbJ1BeFNAFRWPKMQW9NKBZqzFlBngLoNUQvzSgmZOtVt24TvFBErO9qgXAaJe9NChUlTmVZc4XAqtS3LYYJFxgyfi/JOSkKQYf01mTKYZysCnBKglznBXuYslZqjUXrYQjJOeSuvHNUtwzAPaMLTFAH+rFkrMG0AXCIwBarBZVNWh+7AQIvzRA9nW+5Aw2kXNgMy35Fs5Mbts1mvX7+37QZ3SanI68uLwl/2I7ZR1KC8C1cORpabYPMD/RdmFLfxRCOI4xMufRpzoNbmHuKWqvMbHzCc4GvD0wmRQwycfYruUjAEsap8Hm+qMw9wyW13xoWjR5ZcmWszPbNU5srXuZwkVAa+4p+XZp7KQW6I9+huVn9om9Pkmf6/s9+SM79nzu4H6sKr0XTH2DewmSm9EFaPbJwaOqFiidHJc0Ngg5dPXBfEVT+UGbe3LDbQjhJsbI3NWCTddzDBKWULui89ajCzDv+oGpF3K07hamr5KrGGSflmwNr+AYNE+FYClCjgKmjE9tMm34G4E5+ZrRfJlfvU2BnATo0hBBzXT5jVUOzDGVwcV5pnhrkA7vRw5zoSZwZgHmBGng4tc0LZ8aZO4l5ZAmVwHOsfHYuyVIAPuvBrBkbjbPrwrQQdIvWYmu/gJcHRBH4CYmEwAAAABJRU5ErkJggg==');
				background-size: 100%;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
	.history{
		padding: 20upx;
	}
</style>
