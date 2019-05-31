<template>
	<view class="wrap">
		<view @tap="addAddr" class="add">
			添加新地址
		</view>
		<view @tap="clickAddr(addr)" class="each-addr" :class="{'manageOn': showManage}" v-for="(addr,i) in addrList" :key="i">
			<view class="checkbox" :class="{on: addr.selected}" @tap.stop="select(i)">
				<view class="inner"></view>
			</view>
			<addr-label :addr="addr"></addr-label>
		</view>
		
		<view v-if="addrList.length > 0 && !isChoose" class="handles">
			<view @tap="showManage=!showManage">
				{{showManage ? '完成' : '管理'}}
			</view>
			<view class="btns">
				<view @tap="delAddr" class="btn">
					删除
				</view>
				<view @tap="setDefault" class="btn set-default" v-show="showDel">
					设为默认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import AddrLabel from '@/components/addr-label.vue'
	export default {
		components: {AddrLabel},
		data() {
			return {
				addrList: [],
				showManage: false,
				isChoose: false,
				backUrl: ''
			};
		},
		computed:{
			showDel(){
				let selected = this.addrList.filter(t => t.selected)
				if(selected.length === 1 && selected[0].is_default == 0){
					return true
				}
				return false
			}
		},
		onShow(){
			this.getAddr()
		},
		onLoad(option){
			if(option.choose){
				this.isChoose = true
				uni.setNavigationBarTitle({
					title: '选择地址'
				})
			}
			if(option.backUrl){
				this.backUrl = option.backUrl
			}
		},
		methods: {
			async getAddr(){
				let res = await httpApi.userController.getAddr().then(res => {
					if(res.success){
						this.addrList = res.data
					} else {
						uni.showToast({
							title: res.message,
							mask: false,
							duration: 1500,
							icon: 'none'
						});
					}
				}).catch(e => {
					if(e.callback){
						e.callback()
					}
				})
			},
			select(index){
				this.addrList[index].selected = !this.addrList[index].selected
				let addrList = JSON.parse(JSON.stringify(this.addrList))
				this.addrList = null
				this.addrList = addrList
			},
			async setDefault(){
				let checked = this.addrList.filter(t => t.selected)
				if(checked.length !== 1 && checked[0].is_default != 0){
					uni.showToast({
						title: '请选择一个地址',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let res = await httpApi.userController.setDefaultAddr({addressId: checked[0].id})
				if(res.success){
					this.showManage = false
					this.getAddr()
				} else {
					uni.showToast({
						title: res.message,
						mask: false,
						duration: 1500,
						icon: 'none'
					});
				}
			},
			clickAddr(address){
				if(!this.isChoose){
					uni.navigateTo({
						url: `/pages/user/address/edit${address ? '?addressId=' + address.id : ''}`
					});
				} else {
					this.$store.dispatch('setChoosenAddr', address)
					if(this.backUrl){
						uni.navigateTo({
							url: this.backUrl,
							fail() {
								uni.switchTab({
									url: '/pages/tabBar/home'
								})
							}
						});
					} else {
						uni.navigateBack()
					}
				}
			},
			addAddr(){
				uni.navigateTo({
					url: '/pages/user/address/edit'
				})
			},
			async delAddr(){
				let selected = this.addrList.filter(t => t.selected)
				if(selected.length === 0){
					uni.showToast({
						title: '请选择要删除的地址',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let res = await httpApi.userController.delAddr({addrs: selected.map(t => t.id)})
				if(res.success){
					this.showManage = false
					this.getAddr()
				} else {
					uni.showToast({
						title: res.message,
						mask: false,
						duration: 1500,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		padding-bottom: 100upx;
		.add{
			padding: 20upx;
			margin: 20upx 40upx;
			font-size: 28upx;
			text-align: center;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		}
		.each-addr{
			padding: 0 20upx;
			position: relative;
			&.manageOn{
				.addr-wrap{
					margin-left: 50upx;
				}
				.checkbox{
					display: inline-block;
				}
			}
			.addr-wrap{
				margin-left: 20upx;
			}
			.checkbox{
				display: none;
				position: absolute;
				width: 36upx;
				height: 36upx;
				line-height: 36upx;
				top: 50%;
				margin-top: -18upx;
				border: solid 2upx #999999;
				border-radius: 50%;
				text-align: center;
				&.on{
					border-color: #f06c7a;
					.inner{
						width: 28upx;
						height: 28upx;
						margin-top: 4upx;
						margin-left: 4upx;
						background-color: #f06c7a;
						border-radius: 50%;
					}
				}
			}
		}
		.handles{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 20upx;
			display: flex;
			align-items: center;
			font-size: 32upx;
			background-color: #fbfbfb;
			box-sizing: border-box;
			.btns{
				flex: 1;
				text-align: right;
				.btn{
					float: right;
					margin-left: 10upx;	
					padding: 10upx 30upx;
					font-size: 28upx;
					border-radius: 30upx;
					border: solid 2upx #999999;
					&.set-default{
						background-color: #f06c7a;
						color: #ffffff;
						border-color: #f06c7a;
					}
				}
			}
		}
	}
</style>
