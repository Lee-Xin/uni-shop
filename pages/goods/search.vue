<template>
	<view>
		<view class="search-input">
			<input v-model="searchContent" focus ref="searchInput" :placeholder="searchTip" type="text" confirm-type="search">
			<button class="search-btn" type="warn" size="mini" @tap="doSearch">搜索</button>
		</view>
		<view class="history">
			<view class="title">
				最近搜索
				<span @tap="clearHistory" class="clear">清空</span>
			</view>
			<search-content class="each-search" @clickFn="fastDoSearch(content)" v-for="(content, index) in historyList" :key="index" :content="content"></search-content>
		</view>
		<view class="recommand">
			<view class="title">
				热门搜索
			</view>
			<search-content class="each-search" @clickFn="fastDoSearch(content)" v-for="(content, index) in recommandList" :key="index" :content="content"></search-content>
		</view>
	</view>
</template>

<script>
	import SearchContent from '@/components/search-content.vue'
	import http from '@/common/http.js'
	import httpApi from '@/common/httpApi.js'
	export default {
		components:{SearchContent},
		data() {
			return {
				searchTip: '搜索喜欢的物品',
				searchContent: '',
				historyList: [],
				recommandList: ['油烟机', '集成灶', '燃气灶', '热水器', '花洒' , '浴室柜', '龙头', '马桶', '水箱', '淘菜盆']
			};
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 200);
		},
		onShow(){
			uni.getStorage({
				key: 'search_keywords',
				success: (res) => {
					this.historyList = JSON.parse(res.data)
				}
			})
		},
		methods: {
			async doSearch(){
				/* // 调用搜索接口
				let res = await httpApi.search({keywords: this.searchContent}) */
				uni.navigateTo({
					url: '/pages/goods/goods-list?keywords=' + this.searchContent
				});
			},
			fastDoSearch(content){
				uni.navigateTo({
					url: '/pages/goods/goods-list?keywords=' + content
				});
			},
			clearHistory(){
				uni.showModal({
					title: '系统提示',
					content: '确定要清空吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm){
							uni.clearStorage();
							this.historyList = []
						}
					},
					fail: () => {},
					complete: () => {}
				});
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
	.history,.recommand{
		padding: 20upx;
		.title{
			font-size: 30upx;
			margin: 14upx 0;
			.clear{
				font-size: 24upx;
				float: right;
			}
		}
		.each-search{
			font-size: 24upx;
			margin-bottom: 10upx;
		}
	}
</style>
