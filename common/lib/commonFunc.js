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
exports.dateFormat =function (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
