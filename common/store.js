import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const storeInstance = new Vuex.Store({
	state: {
		ut: null,
		userInfo: null
	},
	mutations: {
		SET_UT(state, ut){
			state.ut = ut
		},
		SET_USERINFO(state, user){
			state.userInfo = user
		}
	},
	getters: {
		ut: (state) => {
			return state.ut;
		},
		userInfo: (state) => {
			return state.userInfo
		}
	},
	actions: {
		setUserToken({commit}, ut){
			commit('SET_UT', ut)
		},
		setUserInfo({commit}, user){
			commit('SET_USERINFO', JSON.parse(JSON.stringify(user)))
		}
	}
})

export default storeInstance