let {getToken, handleRes} = require('@/common/lib/commonFunc.js')

export default {
	get(url, data){
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'GET',
				data: data,
				header: {
					'Authorization': 'Bearer ' + getToken()
				},
				success: res => {
					// 这里转发res.data，因为get请求获取的数据格式和post不一样
					resolve(handleRes(res.data))
				},
				fail: res => {
					if(res.errMsg){
						uni.showToast({
							icon: 'none',
							title: res.errMsg
						})
					}
					reject(res)
				},
				complete: res => {
					resolve(res)
				}
			});
		})
	},
	post(url, data){
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'POST',
				data: data,
				header: {
					'Authorization': 'Bearer ' + getToken()
				},
				success: (res) => {
					// 返回handleRes处理后的promise对象
					// handleRes处理逻辑： 成功：转发res，失败：返回失败处理函数
					resolve(handleRes(res))
				},
				fail: res => {
					if(res.errMsg){
						uni.showToast({
							icon: 'none',
							title: res.errMsg
						})
					}
					reject(res)
				},
				complete: res => {
					resolve(res)
				}
			});
		})
	},
	postMutil(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: 'POST',
				data: data,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer ' + getToken()
				},
				success: res => {
					resolve(handleRes(res))
				},
				fail: res => {
					if(res.errMsg){
						uni.showToast({
							icon: 'none',
							title: res.errMsg
						})
					}
					reject(res)
				},
				complete: res => {
					resolve(res)
				}
			});
		})
	}
}