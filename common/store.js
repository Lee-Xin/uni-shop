import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const storeInstance = new Vuex.Store({
	state: {
		ut: null,
		userInfo: null,
		choosenAddr: null
	},
	mutations: {
		SET_UT(state, ut){
			state.ut = ut
		},
		SET_USERINFO(state, user){
			state.userInfo = user
		},
		SET_CHOOSEN_ADDR(state, addr){
			state.choosenAddr = addr
		}
	},
	getters: {
		ut: (state) => {
			return state.ut;
		},
		userInfo: (state) => {
			return state.userInfo
		},
		choosenAddr: (state) => {
			return state.choosenAddr
		}
	},
	actions: {
		setUserToken({commit}, ut){
			commit('SET_UT', ut)
		},
		setUserInfo({commit}, user){
			commit('SET_USERINFO', JSON.parse(JSON.stringify(user)))
		},
		setChoosenAddr({commit}, addr){
			commit('SET_CHOOSEN_ADDR', JSON.parse(JSON.stringify(addr)))
		}
	}
})

export default storeInstance