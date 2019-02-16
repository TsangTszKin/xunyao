import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	addCart(productId, quantity, shopId) {
		return axios.put(`${prefix}/app/sales/addCart?productId=${productId}&quantity=${quantity}&shopId=${shopId}`).catch(errorHandler);
	},
	cartList() {
		return axios.put(`${prefix}/app/sales/cartList`).catch(errorHandler);
	}
}