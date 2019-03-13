import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;
const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	goWxOauth2() {
		var returnUrl = location.href;
		var index = returnUrl.indexOf("?");
		if (index >= 0) {
			returnUrl = returnUrl.substr(0, index);
		}
		var url = prefix + "/app/auth/goWxOauth2?returnUrl=" + encodeURIComponent(returnUrl);
		location.href = url;
	},
	getMyInfo() {
		return axios.get(`${prefix}/app/auth/loginUser`).catch(errorHandler)
	},
	getWxConfig(url) {
		return axios.get(`${prefix}/app/auth/getJsapiSignature?url=${url}`).catch(errorHandler)
	}


}