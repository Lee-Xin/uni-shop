import config from '@/common/config.js'
import http from '@/common/http.js'
const domain = config.domain
export default {
	loadActives (param){
		return http.get(domain.requestHost + '/indexActives', param)
	}
}