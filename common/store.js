import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const storeInstance = new Vuex.Store({
	state: {
		ut: null
	},
	mutations: {
		SET_UT(state, ut){
			state.ut = ut
		}
	},
	getters: {
		ut: (state) => {
			return state.ut;
		}
	},
	actions: {
		setUserToken({commit}, ut){
			commit('SET_UT', ut)
		}
	}
})

export default storeInstance