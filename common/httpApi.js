import config from '@/common/config.js'
import http from '@/common/http.js'
import Vue from 'vue'
const domain = config.domain
export default {
	loadActives (param){
		return http.get(domain.requestHost + '/indexActives', param)
	},
	getProductsByParent (param){
		return http.get(domain.requestHost + '/getProductsByParent', param)
	},
	indexMenus(param){
		return http.get(domain.requestHost + '/indexMenus', param)
	},
	getCategory(param){
		return http.get(domain.requestHost + '/getCategoryByParentId', param)
	},
	loadProd(param){
		return http.get(domain.requestHost + '/getProducts', param)
	},
	productInfo(param){
		return http.get(domain.requestHost + '/productInfo', param)
	},
	productProperty(param){
		return http.get(domain.requestHost + '/productProperty', param)
	},
	async isFavorite(param){
		return http.post(domain.requestHost + '/isFavorite', param)
	},
	login(param){
		return http.post(domain.requestHost + '/login', param)
	},
	disKeep(param){
		return http.post(domain.requestHost + '/disFavorite', param)
	},
	addKeep(param){
		return http.post(domain.requestHost + '/addFavorite', param)
	},
	toCart(param){
		return http.post(domain.requestHost + '/toCart', param)
	},
	loadCart(){
		return http.post(domain.requestHost + '/loadCart')
	},
	chooseCartSpu(param){
		return http.post(domain.requestHost + '/chooseCartSpu', param)
	},
	updateCart(param){
		return http.post(domain.requestHost + '/updateCart', param)
	},
	profile(){
		http.post(domain.requestHost + '/profile').then(res => {
			if(res.success) {
				let userInfo = {
					username: res.data.name,
					avatar: res.data.avatar,
					signature: res.data.signature,
					account: res.data.account,
					moment: res.data.moment
				}
				Vue.prototype.$store.dispatch('setUserInfo', userInfo)
			}
		}).catch(e => {
			if(e.callback){
				e.callback()
			}
		})
	},
	getFavorities(){
		return http.get(domain.requestHost + '/getFavorities')
	},
	getSimilarity(param){
		return http.get(domain.requestHost + '/getSimilarity', param)
	}
}