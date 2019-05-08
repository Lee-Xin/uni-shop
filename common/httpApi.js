import config from '@/common/config.js'
import http from '@/common/http.js'
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
	}
}