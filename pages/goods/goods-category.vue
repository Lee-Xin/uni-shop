<template>
	<view>
		<view class="cate-area">
			<view class="each-area" v-for="(cate, index) in tabList" :key="index">
				<view class="cate-name">{{cate.name}}</view>
				<goods-list :goodsList="tabGoodsList[index]"></goods-list>
			</view>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab'
	import GoodsList from '@/components/goods-list'
	import httpApi from '@/common/httpApi.js'
	export default {
		components: { WucTab, GoodsList},
		data() {
			return {
				tabList: [],
				tabGoodsList: [],
			};
		},
		onPageScroll(e){
			
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.name ? option.name + '专区' : '分类'
			});
			// #ifdef APP-PLUS
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			this.productCates({parentId: option.parentId})
		},
		methods: {
			async productCates({parentId}){
				let res = await httpApi.getProductsByParent({parentId: parentId})
				if(res.success){
					let cates = res.data
					Object.keys(cates).forEach(cate => {
						this.tabList.push({name: cates[cate][0].cate_name})
						this.tabGoodsList.push(cates[cate])
					})
				}
			},
			swiperChange2(e) {
			    let { current } = e.target;
			    this.TabCur = current;
			},
			tabChange2(index) {
			    this.TabCur = index;
			}
		}
	}
</script>

<style lang="scss">
@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAAB3gAAALAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCfgqCXII4ATYCJAMMCwgABCAFhG0HQxuDBsiemjxBRCmUAtQ2VRCBG4ig2u+zZ3c/ortTgBIoQOVPBYSJYkUggWRSPqyjY2yEQyPe5FzmkfXucrOArBAKSdt/TjNmNTZyfrOTKAwgNQXmqbkEBgj2eS6nNz3A+YFyXHs9P2raURxQgHtR7yiyEknMW4bXLsaDeEygbVEkxYXiyhqgV+BVgbgmCQzQ55xKS2doCvWag0W8o9FMz9M24G34/fgvPvQktQxvPL5axIPc38m/U/JI9VSLIKjm80M7RsYWoBAXa4PHVHFxi0rbKaotAfuaFfxOqSp+Jwvlbv/wCImow+1dsAaGdEcqZnRrKhAggQzqaOI24Bmw02JRZmZ88bS/fq2vH6Y1yywb576F7tn3l1/5e7zm6Ze2+cW37DBXjFEftC+6U7vil0/zOvXIl3lf7cx/3DkeysBDV/tDQ5N7tli9AzsiHDgcO55136FS8LLTzBygm4Q9u6bCp1zAy0lh7v/L+PnQ0P71YAZeG0pE3eWwRIIOANX5dz4JQCX8hQLB+5z/hXZb5ofeVMCvjc0fKFEp+rs1bzkU/H5Vz67iarArF1vJlH4oO8g0SGi7EVU4OnY43jzr3U5omqVIGhaQNS2Rhd1CTcc26ppOo21TyfGOCUIlSgsbJhHC0DqSvp/IhnbIwh6gZu4BdcNQoe1iuC7sWAnJWEAQQxEP2V4ocQE/ph5qjDqrkNDpZUhWE4rrEJGlDIyLji1WSpAfkTm2yF1CPKUYYhLwwWL0HPJ6AzBIAm7E0WiR0mB6TAyue1M0F/ABo/MIhEEhPIjVC5JwAvywGE8ZS5+vggg6eTFIC6ejWAchZNL0UJxosT3IEqO/F+dehMi6COJRFAZhRIAPVIz8iJcUA6Bg/Tw3hENFE0fkg9LFSP1wX2P0+mbf952ANvxUjhQ5is4tRurpjHJLjF9IRbKIHAAA') format('woff2');}
.icon {
	font-family:"HMfont-home" !important;
	font-size:26upx;
	font-style:normal;
	&.sheng {
		&:before{content:"\e737";}
	}
	&.jiang {
		&:before{content:"\e736";}
	}
	
}
.header{
	width: 92%;
	padding: 0 4%;
	height: 79upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;
	border-bottom: solid 1upx #eee;
}
.place{
	background-color: #ffffff;
	height: 100upx;
}
.cate-area{
	.each-area{
		.cate-name{
			margin-top: 10upx;
			height: 80upx;
			text-align: center;
			color: #f47825;
			font-size: 30upx;
		}
	}
}
</style>
