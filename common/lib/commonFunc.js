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
