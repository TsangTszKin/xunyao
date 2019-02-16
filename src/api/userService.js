import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getAddressList() {
		return axios.get(`${prefix}/app/my/receiver/list`).catch(errorHandler);
	},
	saveAddress(params) {
		return axios.put(`${prefix}/app/my/receiver/save`, params).catch(errorHandler);
	},
	saveAddressInfo(id) {
		return axios.put(`${prefix}/app/my/receiver/info?id=${id}`).catch(errorHandler);
	}
}