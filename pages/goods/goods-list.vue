<template>
	<view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="target" v-for="(target,index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected?'on':'']">
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view> 
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<goods-list :goodsList="goodsList"></goods-list>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import GoodsList from '@/components/goods-list.vue'
	export default {
		components:{GoodsList},
		data() {
			return {
				goodsList:[],
				loadingText:"正在加载...",
				headerTop:"0px",
				headerPosition:"fixed",
				orderbyList:[
					{text:"销量",selected:true,orderbyicon:false,orderby:0},
					{text:"价格",selected:false,orderbyicon:['sheng','jiang'],orderby:0},
					{text:"好评",selected:false,orderbyicon:false,orderby:0}
				],
				orderby:"sheng",
				queryProdParam: {
					page: 1,
					pageSize: 4
				},
				domain: config.domain
			};
		},
		onLoad (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.cid); //打印出上个页面传递的参数。
			uni.setNavigationBarTitle({
				title: option.name
			});
			this.loadProds({category_id: option.cid})
			//兼容H5下排序栏位置
			// #ifdef H5
				if(document.getElementsByTagName('uni-page-head')[0]){
					this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
				} else {
					this.headerTop = '44px';
				}
			// #endif
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			/* if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			} */
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(()=>{
				this.reload();
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom(){
			uni.showToast({title: '触发上拉加载'});
			let len = this.goodsList.length;
			if(len>=40){
				this.loadingText="到底了";
				return false;
			}else{
				this.loadingText="正在加载...";
			}
		},
		methods:{
			reload(){
				this.goodsList = [];
				
			},
			loadProds(param){
				httpApi.loadProd(param).then(res => {
					this.goodsList = this.goodsList.concat(res.data)
					if(res.data.length < this.queryProdParam.pageSize){
						this.loadingText = '到底了';
						this.stopLoadProd = true;
					}
					this.queryProdParam.page++;
				}).catch(e => {
					console.log(e);
				})
			},
			//商品跳转
			toGoods(e){
				uni.navigateTo({
					url: '../goods/goods?pid='+e.pid
				});
			},
			//排序类型
			select(index){
				let tmpTis = this.orderbyList[index].text+"排序 "
				if(this.orderbyList[index].orderbyicon){
					let type = this.orderbyList[index].orderby==0?'升序':'降序';
					if(this.orderbyList[index].selected){
						type = this.orderbyList[index].orderby==0?'降序':'升序';
						this.orderbyList[index].orderby = this.orderbyList[index].orderby==0?1:0;
					}
					tmpTis+=type
				}
				this.orderbyList[index].selected = true;
				let len = this.orderbyList.length;
				for(let i=0;i<len;i++){
					if(i!=index){
						this.orderbyList[i].selected = false;
					}
				}
				uni.showToast({title:tmpTis,icon:"none"});
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
	.target{
		width: 20%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-bottom: -2upx;
		color: #aaa;
		&.on{
			color: #555;
			border-bottom: 4upx solid #f06c7a;
			font-weight: 600;
			font-size: 30upx;
		}
	}
}
.place{
	background-color: #ffffff;
	height: 100upx;
}
.goods-list{
	.loading-text{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
}
</style>
