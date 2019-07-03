import config from '@/common/config.js'
import http from '@/common/http.js'
import Vue from 'vue'
const domain = config.domain
let {handleRes} = require('@/common/lib/commonFunc.js')
export default {
	xiaomiMsg(param){
		let qs = {
			Action: 'SendHttpMessage',
			VerifyCode: '728642',
			ID: '90000769',
			...param
		}
		return new Promise((resolve,reject) => {
			uni.request({
				url: 'http://a2.xiaomilaile.com:8011/msg',
				method: 'GET',
				data: qs,
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
	},
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
	isFavorite(param){
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
	},
	productController: {
		productTickets(param){
			return http.get(domain.requestHost + '/productTickets', param)
		}
	},
	orderController:{
		newOrder(param){
			return http.post(domain.requestHost + '/newOrder', param)
		},
		orderList(param){
			return http.get(domain.requestHost + '/orderList', param)
		},
		getOrderDetail(param){
			return http.get(domain.requestHost + '/orderDetail', param)
		},
		getTicketsByCate(param){
			return http.post(domain.requestHost + '/getTicketsByCate', param)
		}
	},
	userController: {
		getAddr(param){
			return http.get(domain.requestHost + '/getAddr', param)
		},
		setDefaultAddr(param){
			return http.post(domain.requestHost + '/setDefaultAddr', param)
		},
		newAddr(param){
			return http.post(domain.requestHost + '/newAddr', param)
		},
		editAddr(param){
			return http.post(domain.requestHost + '/editAddr', param)
		},
		delAddr(param){
			return http.post(domain.requestHost + '/delAddr', param)
		},
		getTickets(){
			return http.get(domain.requestHost + '/getTickets')
		},
		fetchTicket(param){
			return http.post(domain.requestHost + '/fetchTicket', param)
		}
	}
}