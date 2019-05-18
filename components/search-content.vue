<template>
	<view @tap="$emit('clickFn')" class="search-content">
		{{content}}
	</view>
</template>

<script>
	export default {
		props: {
			content: {
				type: String
			}
		}
	}
</script>

<style lang="scss">
.search-content{
	display: inline-block;
	padding: 8upx 20upx;
	margin-right: 20upx;
	margin-bottom: 20upx;
	background-color: #f3f3f3;
	color: #2d2d2d;
	font-size: 28upx;
}
</style>
