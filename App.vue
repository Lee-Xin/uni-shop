<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
			format('woff2');
	}
	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 26upx;
		font-style: normal;
		&.fenxiang {
			&:before {
				content: '\e642';
			}
		}
		&.xiangqian {
			&:before {
				content: '\e634';
			}
		}
		&.xiangyou {
			&:before {
				content: '\e637';
			}
		}
		&.shoucangsel {
			&:before {
				content: '\e62c';
			}
		}
		&.shoucang {
			&:before {
				content: '\e62e';
			}
		}
		&.tongzhi {
			&:before {
				content: '\e729';
			}
		}
		&.kefu {
			&:before {
				content: '\e61e';
			}
		}
		&.cart {
			&:before {
				content: '\e614';
			}
		}
		&.jia {
			&:before{content:"\e641";}
		}
		&.jian {
			&:before{content:"\e643";}
		}
	}
	/*每个页面公共css */
	.guess-like{
		height: 40upx;
		margin: 20upx 0;
		background-image: url('data:image/png;base64,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');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}
	
</style>
