import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getAdvertList() {
		return axios.get(`${prefix}/app/index/advertList`).catch(errorHandler);
	},
	getNearShopList(lng, lat) {
		return axios.get(`${prefix}/app/index/nearbyShopList?longitude=${lng}&latitude=${lat}&pageno=1&size=10`)
	},
	getRecommendProductionList(page) {
		return axios.get(`${prefix}/app/index/recommendProductList?pageno=${page}&size=8`)
	}
}