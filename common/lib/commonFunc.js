import Vue from 'vue'

exports.getToken = () => {
	// 优先从store取token
	if(Vue.prototype.$store && Vue.prototype.$store.getters.ut){
		return Vue.prototype.$store.getters.ut
	} else {
		try{
			let token = uni.getStorageSync('token')
			return token
		}catch(e){
			return null
		}

	}
}
