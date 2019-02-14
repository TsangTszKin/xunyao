import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getGoodsList(shopId, classId) {
		return axios.get(`${prefix}/app/product/shopProductList?shopId=${shopId}&classId=${classId}&pageno=1&size=100`).catch(errorHandler);
	},
	getGoodsInfo(id) {
		return axios.get(`${prefix}/app/product/productInfo?id=${id}`).catch(errorHandler);
	},
}