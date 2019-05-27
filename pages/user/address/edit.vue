<template>
	<view>
		<view class="input-wrap">
			<view>收件人姓名</view>
			<input type="text" placeholder="请输入收件人姓名" v-model="addressInfo.receiver">
		</view>
		<view class="input-wrap">
			<view>手机号</view>
			<input type="text" placeholder="请输入收件人手机号" v-model="addressInfo.tel">
		</view>
		<view class="input-wrap">
			<view>选择地区</view>
			<view @tap="showRegion" style="flex: 1; text-align: right;height: 50upx;">
				{{regionResult}}
				<view v-show="!regionResult" class="placeholder">请选择</view>
			</view>
		</view>
		<view class="input-wrap">
			<view>详细地址</view>
			<input type="text" v-model="addressInfo.detail" placeholder="请输入详细地址">
		</view>
		<view class="input-wrap">
			<view>是否默认</view>
			<view style="flex: 1; text-align: right;">
				<switch :checked="addressInfo.is_default === 1" color="#f06c7a" @change="checkDefault" />
			</view>
		</view>
		<view>
			<button @tap="submit" class="submit">确定</button>
		</view>
		<w-picker mode="region" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import wPicker from '@/components/w-picker/w-picker.vue'
	export default {
		components: {wPicker},
		data() {
			return {
				addressId: '',
				addressInfo: {
					receiver: '',
					detail: '',
					tel: '',
					province: '',
					city: '',
					district: '',
					is_default: 0
				},
				regionResult: '',
				defaultVal: [21,0,2], //初始化 重庆市渝中区
			};
		},
		onLoad(option){
			if(option.addressId){
				this.getAddr(option.addressId)
			}
		},
		methods: {
			async getAddr(addressId){
				let res = await httpApi.userController.getAddr({addressId})
				if(res.success){
					if(res.data.length > 0) {
						this.addressInfo = res.data[0]
						this.regionResult = `${this.addressInfo.province}${this.addressInfo.city}${this.addressInfo.district}`
					}
				} else{
					uni.showToast({
						title: res.message || '获取地址信息失败',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
				}
			},
			onConfirm(val){
				this.addressInfo.province = val.checkArr[0]
				this.addressInfo.city = val.checkArr[1]
				this.addressInfo.district = val.checkArr[2]
				this.regionResult = val.result
			},
			showRegion(){
				this.$refs.picker.show()
			},
			checkDefault(val){
				this.addressInfo.is_default = val.detail.value ? 1 : 0
			},
			async submit(){
				for(let key in this.addressInfo){
					if(this.addressInfo[key] === ''){
						uni.showToast({
							title: '请完善地址信息',
							mask: false,
							duration: 1500,
							icon: 'none'
						});
						return
					}
				}
				// 编辑
				if(this.addressInfo.id){
					let res = await httpApi.userController.editAddr(this.addressInfo)
					if(res.success){
						uni.navigateBack();
					} else {
						uni.showToast({
							title: res.message,
							mask: false,
							duration: 1500,
							icon: 'none'
						});
					}
				}
				// 新增
				else {
					let res = await httpApi.userController.newAddr(this.addressInfo)
					if(res.success){
						uni.navigateBack();
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
	}
</script>

<style lang="scss">
	.input-wrap{
		display: flex;
		align-items: center;
		padding: 20upx 0;
		margin: 0 30upx;
		font-size: 30upx;
		border-bottom: solid 2upx #dddddd;
		&:first-child{
			border-top: solid 2upx #dddddd;
		}
		uni-input{
			flex: 1;
			text-align: right;
		}
		.placeholder{
			color: #7d7d7d;
		}
	}
	.submit{
		margin: 30upx;
		background-color: #f06c7a;
		color: #ffffff;
	}
</style>
