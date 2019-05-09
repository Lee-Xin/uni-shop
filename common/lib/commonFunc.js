import Vue from 'vue'

exports.getToken = () => {
	// 优先从store取token
	if(Vue.prototype.$store && Vue.prototype.$store.getters.ut){
		return Vue.prototype.$store.getters.ut
	} 
	// 其次从缓存中取token
	try{
		let token = uni.getStorageSync('token')
		return token
	}catch(e){
		return null
	}
}

exports.handleRes = (res) => {
	return new Promise((resolve, reject) => {
		// reject错误处理函数。
		if(res.data.code === 'access_error'){
			reject({
				message: '没有权限，请尝试重新登录',
				callback: () => {
					uni.showModal({
						title: '系统提示',
						content: '登录状态失效，是否前往登录？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if(res.confirm){
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}
						},
						fail: () => {},
						complete: () => {}
					})
				}
			})
		} else {
			// resolve结果（相当于转发了一下）
			resolve(res.data)
		}
	})
}