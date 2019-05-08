let {getToken} = require('@/common/lib/commonFunc.js')

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
					resolve(res.data)
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
				success: res => {
					resolve(res.data)
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
					resolve(res.data)
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