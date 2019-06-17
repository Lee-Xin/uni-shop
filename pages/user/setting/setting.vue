<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" @tap="jump({type: 'navigateTo', url: '/pages/user/address/address'})">
					<view class="title">收货地址管理</view>
					<view class="right"><view class="tis">编辑</view><view class="icon jiantou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
					<image :src="assetsHost + user.avatar" mode="widthFix"></image>
					</view><view class="icon jiantou"></view></view>
				</view>
				<view class="row" @tap="showEdit = true; choosenItem = {key: 'username', value: user.username, label: '昵称'}">
					<view class="title">昵称</view>
					<view class="right"><view class="tis">{{user.username}}</view><view class="icon jiantou"></view></view>
				</view>
				<view class="row">
					<view class="title">个性签名</view>
					<view class="right"><view class="tis">{{user.signature}}</view><view class="icon jiantou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">通知提醒</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
				<view class="row">
					<view class="title">支付设置</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
				<view class="row">
					<view class="title">通用</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.0</view><view class="icon jiantou"></view></view>
				</view>
				<view class="row">
					<view class="title">问题反馈</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
				<view class="row">
					<view class="title">关于商城</view>
					<view class="right"><view class="tis"></view><view class="icon jiantou"></view></view>
				</view>
			</view>
			<view @tap="logout" class="list logout">
				退出登录
			</view>
		</view>
		<popup :show="showEdit" position="bottom" mode="insert" @hidePopup="updateInfo">
			<view class="edit-body">
				<label>
					<view class="label-text">
						{{choosenItem.label}}
					</view>
					<input type="text" v-model="choosenItem.value"/>
				</label>
			</view>
		</popup>
	</view>
</template>

<script>
	import httpApi from '@/common/httpApi.js'
	import config from '@/common/config.js'
	import popup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
	let assetsHost = config.domain.assetsHost
	export default {
		components: {popup},
		data() {
			return {
				assetsHost: assetsHost,
				showEdit: false,
				choosenItem: {
					key: '',
					value: ''
				}
			};
		},
		computed: {
			user(){
				return this.$store.getters.userInfo || {}
			}
		},
		onShow(){
			if(!this.$store.getters.userInfo){
				httpApi.profile()
			}
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			logout(){
				this.$store.dispatch('setUserToken', null)
				uni.removeStorage({
					key: 'token',
					success: function (res) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				});
			},
			jump({type, url}){
				try{
					uni[type].call(this, {url: url})
				} catch (e) {
					if(type === 'navigateTo'){
						uni.navigateTo({
							url: url
						});
					} else if(type === ''){
						uni.switchTab({
							url: url
						})
					}
				}
			},
			updateInfo(){
				console.log(this.user[this.choosenItem.key]);
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}
@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKQAAsAAAAABjwAAAJFAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApIXAE2AiQDCAsGAAQgBYRtBy4bgAUR1Ys/sq+wcQ0AKCMxzO7s4dbxlywA4w2+QAIrUAAAAABA8Hzt9zt3d9//+00Taomhi1gSkUZTzUynEiJMh45HsUimByZ4/unc4gMVRqR1SoYZi0pw3aFbm/4hO4VNh2bJ2umnZ+Q3hAuhQ3jVPHGMDgCfuHf6W0CBzAeU4160xqAuoC4OpEDHGhRZCWXcMHaBSzgOAbykUYLUXFp6sBiscQLIvJsaweacGAyLWARXzVKDnCsHqw6SWzgLvy/fpWJB4WisnI7J2nEq3tgxrP/X+31CuUBAqx1AAyWAAempDbahEUbXeIOGLNhXpsCb9w3IXrUI++usdD8AKZB3T3x3LAKAAritnkSA5KjrQSJz++JfybXOMS/f0eF7B4itVLl1SnvltSIO9qACqdWN/RMBBLqPPHZo3Z8lA8D9FYUS09MNdg8mgT/BR01GF1p6ZVR+bbsicoYKL17gH1ujvI5VJU4bFSyJEWY3qSk0lhySoZXAwUcZXFjK4aWY+tU+YqyiEeMBitgBEMJcQRHkGpowdyRDe4FDkl+4CIuGlz5xSx95YrnZkbESbKH+gWuo145RZlHmDc0UK84KQ8YLeXQeKNK8GLlijzzHjPFtShENmqmDCzgNYyQYmDw2klqR4ZBluu5NaUOdmlHNWAm2UP/ANdRrv7PMSp+/oZlixS0NNe4X8uj6hyLNe5Cusr5Xw728Mr5NKaJBM3VwAYMwRoKhfpDHRlI7wj8cMruV7itL11d0X7cLpWZY6kTsQo1Zo6lQCgA=')
		format('woff2');
}
.icon {
	font-family: 'HMfont-home' !important;
	font-size: 35upx;
	font-style: normal;
	color: #000000;
	&.jiantou {
		&:before {
			content: '\e627';
		}
	}
}
.content{
	padding-bottom: 20upx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		&.logout{
			padding: 20upx 0;
			width: 100%;
			text-align: center;
			font-size: 32upx;
			color: #f06c7a;
		}
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
	}
}
.edit-body{
	line-height: 28upx;
	text-align: left;
	font-size: 28upx;
	padding: 20upx;
	label{
		display: flex;
		align-items: center;
		.label-text{
			width: 140upx;
		}
		input{
			flex: 1;
			line-height: 1;
			padding: 4upx 10upx;
			color: #999;
			border-bottom: solid 2upx #999;
		}
	}
}
</style>
