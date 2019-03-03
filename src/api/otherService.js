import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	// Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	getNoReadMessageCount() {
		return axios.get(`${prefix}/app/other/getNoReadMessageCount`).catch(errorHandler);
	},
	getNoReadMessageCount2() {
		return axios.get(`${prefix}/app/other/getNoReadMessageCount2`).catch(errorHandler);
	},
	getMessageList(type, pageno) {
		return axios.get(`${prefix}/app/other/getMessageList?type=${type}&pageno=${pageno}&size=20`).catch(errorHandler);
	},
	updateMessage(messageId) {
		return axios.post(`${prefix}/app/other/updateMessage?messageId=${messageId}`).catch(errorHandler);
	},
	getMessageList(type, pageno) {
		return axios.get(`${prefix}/app/other/getMessageList?type=${type}&pageno=${pageno}&size=100`).catch(errorHandler);
	},
	updateMessage(messageId) {
		return axios.post(`${prefix}/app/other/updateMessage?messageId=${messageId}`).catch(errorHandler);
	},
	deleteMessage(messageId) {
		return axios.delete(`${prefix}/app/other/deleteMessage?messageId=${messageId}`).catch(errorHandler);
	}
}