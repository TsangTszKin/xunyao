import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getGoodsList(shopId, classId) {
		return axios.get(`${prefix}/app/product/shopProductList?shopId=${shopId}&classId=${classId}&pageno=1&size=100`).catch(errorHandler);
	},
	getGoodsInfo(id) {
		return axios.get(`${prefix}/app/product/productInfo?id=${id}`).catch(errorHandler);
	},
	searchShopGoodsList(shopId, keyword, pageno) {
		return axios.post(`${prefix}/app/product/shopProductSearch?shopId=${shopId}&keyword=${keyword}&pageno=${pageno}&size=10`).catch(errorHandler);
	},
	searchGoodsList(keyword, pageno) {
		return axios.post(`${prefix}/app/product/productSearch?keyword=${keyword}&pageno=${pageno}&size=10`).catch(errorHandler);
	},
	deleteGoods(id) {
		return axios.get(`${prefix}/app/product/productDelete?id=${id}`).catch(errorHandler)
	},
	changeGoodsStock(id, stock) {
		return axios.post(`${prefix}/app/product/productStock?id=${id}&stock=${stock}`).catch(errorHandler)
	},
	getGoodsListByClass(classId) {
		return axios.get(`${prefix}/app/product/productList?classId=${classId}&pageno=1&size=100`)
	},
	getProductBaseInfo(lng, lat, id) {
		return axios.get(`${prefix}/app/product/productBaseInfo?longitude=${lng}&latitude=${lat}&id=${id}&pageno=1&size=100`)
	},
}