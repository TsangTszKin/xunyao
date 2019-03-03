import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getAddressList() {
		return axios.get(`${prefix}/app/my/receiver/list`).catch(errorHandler);
	},
	saveAddress(params) {
		return axios.put(`${prefix}/app/my/receiver/save`, params).catch(errorHandler);
	},
	getAddressInfo(id) {
		return axios.get(`${prefix}/app/my/receiver/info?id=${id}`).catch(errorHandler);
	},
	submitFeedback(params) {
		return axios.put(`${prefix}/app/other/submitSuggest`, params).catch(errorHandler);
	},
	getDefaultAddress() {
		return axios.get(`${prefix}/app/sales/getDefaultAddress`).catch(errorHandler)
	},
	getMyFootPrint() {
		return axios.get(`${prefix}/app/other/myLogList`).catch(errorHandler)
	},
	addMyFootPrint(shopId, productId) {
		return axios.put(`${prefix}/app/other/addLog?shopId=${shopId}&productId=${productId}`).catch(errorHandler)
	},
	addFavorite(type, id) {//1店铺，2药品
		return axios.put(`${prefix}/app/other/addFavorite?shopId=${id}&productId=${id}&type=${type}`).catch(errorHandler)
	},
	addFriend(phone) {
		return axios.put(`${prefix}/app/my/friend/add?phone=${phone}`).catch(errorHandler)
	},
	getMyInfo(shopId) {
		return axios.post(`${prefix}/app/my/index?shopId=${shopId}`).catch(errorHandler)
	},
	getMyOrder(type, page) {
		return axios.post(`${prefix}/app/my/orderList?type=${type}&page=${page}&limit=10`).catch(errorHandler)
	},
	getOrderList(orderStatus, page) {//orderStatus:-1所有，0待确认， 1待收货，2已完成，3已取消
		return axios.get(`${prefix}/app/my/orderList?orderStatus=${orderStatus}&page=${page}&limit=100`).catch(errorHandler);
	},
	cancelOrder(orderId) {
		return axios.post(`${prefix}/app/my/cancelOrder?orderId=${orderId}`).catch(errorHandler);
	},
	getMyCouponList() {
		return axios.get(`${prefix}/app/my/couponList`).catch(errorHandler)
	},
	getMyFriendList() {
		return axios.get(`${prefix}/app/my/friends?page=1&limit=100`).catch(errorHandler)
	},
	deleteFriend(friendId) {
		return axios.delete(`${prefix}/app/my/friend/delete?friendId=${friendId}`).catch(errorHandler)
	},
	receiverOrder(orderId) {
		return axios.post(`${prefix}/app/my/receiverOrder?orderId=${orderId}`).catch(errorHandler);
	},
	confirmOrder(orderId) {
		return axios.post(`${prefix}/app/my/confirmOrder?orderId=${orderId}`).catch(errorHandler);
	},
	removeFavorite(favoriteId) {
		return axios.delete(`${prefix}/app/other/cancelFavorite?favoriteId=${favoriteId}`).catch(errorHandler)
	},
	getMyFavoriteList(type, pageno) {//type: 1店铺，2商品
		return axios.get(`${prefix}/app/other/myFavoriteList?type=${type}&pageno=${pageno}&size=15`).catch(errorHandler)
	},
	getMyHomeInfo() {
		return axios.post(`${prefix}/app/my/index`).catch(errorHandler)
	},
	getMyMoney() {
		return axios.get(`${prefix}/app/my/purse`).catch(errorHandler)
	},
	reCharge(money) {
		return axios.post(`${prefix}/app/my/recharge?money=${money}`).catch(errorHandler)
	},
	updateUser(phone, nickname, headimgurl) {
		return axios.post(`${prefix}/app/my/updateUser?phone=${phone}&nickname=${nickname}&headimgurl=${headimgurl}`).catch(errorHandler)
	}
}