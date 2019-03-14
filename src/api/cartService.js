import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
import common from '@/util/common';
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	addCart(productId, quantity, shopId) {
		return axios.put(`${prefix}/app/sales/addCart?productId=${productId}&quantity=${quantity}&shopId=${shopId}`).catch(errorHandler);
	},
	cartList(params) {
		if (common.isEmpty(params)) {
			return axios.post(`${prefix}/app/sales/cartList`, {}).catch(errorHandler);
		} else {
			return axios.post(`${prefix}/app/sales/cartList`, params).catch(errorHandler);
		}

	},
	removeCart(productId, quantity) {
		return axios.delete(`${prefix}/app/sales/removeCart?productId=${productId}&quantity=${quantity}`).catch(errorHandler);
	},
	submit(params) {
		return axios.post(`${prefix}/app/sales/submitCarts`, params).catch(errorHandler);
	}
}