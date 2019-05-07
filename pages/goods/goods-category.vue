<template>
	<view>
		<view class="header" :style="{position:headerPosition,top:headerTop}"></view> 
		<view>
			<view v-for="(cate, index) in cates" :key="index">
				{{cate[0].cate_name}}
				<view v-for="(prod, p_index) in cate" :key="p_index">
					{{prod}}
				</view>
			</view>
			<wuc-tab :tab-list="tabList2" :tabCur="TabCur2" @change="tabChange2" tab-class="text-center text-black bg-white" select-class="text-blue text-xl"></wuc-tab>
			<swiper :current="TabCur2" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange2">
			  <swiper-item v-for="(item,index) in tabList2" :key="index">
			    <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
			  </swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab'
	export default {
		components: { WucTab },
		data() {
			return {
				headerPosition: 'fixed',
				headerTop:null,
				statusTop:null,
				afterHeaderOpacity: 1,//不透明度
				headerBackground: 'unset',
				pageName: '',
				cates: [],
				tabList2: [{ name: '精选' }, { name: '订阅' }],
				TabCur2: 0,
			};
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
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
			productCates({parentId}){
				uni.request({
					url: 'http://localhost:3000/getProductsByParent',
					method: 'GET',
					data: {parentId},
					success: res => {
						this.cates = res.data.data
						let cates = res.data.data
						Object.keys(cates).forEach(cate => {
							this.tabList2.push({name: cates[cate[0]][0].cate_name})
						})
					},
					fail: () => {},
					complete: () => {}
				});
			},
			swiperChange2(e) {
			    let { current } = e.target;
			    this.TabCur2 = current;
			},
			tabChange2(index) {
			    this.TabCur2 = index;
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
</style>
