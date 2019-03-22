import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
import common from '@/util/common';
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getAdvertList() {
		return axios.get(`${prefix}/app/index/advertList`).catch(errorHandler);
	},
	getNearShopList(lng, lat, page, filterParams) {
		let filterParamsString = '';
		if (!common.isEmpty(filterParams)) {
			filterParamsString = `&fp=${filterParams.fp}&yb=${filterParams.yb}&xh=${filterParams.sm}`
		}
		return axios.get(`${prefix}/app/index/nearbyShopList?longitude=${lng}&latitude=${lat}&pageno=${page ? page : 1}&size=10${filterParamsString}`).catch(errorHandler);
	},
	getRecommendProductionList(page) {
		return axios.get(`${prefix}/app/index/recommendProductList?pageno=${page}&size=8`).catch(errorHandler);
	},
	getChanelList() {
		return axios.get(`${prefix}/app/other/getChannelList`).catch(errorHandler);
	},
}