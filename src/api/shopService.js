import { Toast } from 'mint-ui';
import axios from '@/http/api.js'
const prefix = axios.defaults.baseURL;

const errorHandler = error => {
	Toast("操作失败，请稍候再试！");
	console.log(error);
};

export default {
	fileUpload(e, type) {
		let file = e.target.files[0];
		let param = new FormData(); //创建form对象
		param.append("file", file, file.name); //通过append向form对象添加数据
		//param.append("chunk", "0"); //添加form表单中其他数据
		//console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
		// param.append("uploadType", "pic");
		let config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}; //添加请求头
		return axios.post(`${prefix}/app/other/uploadFile`, param, config).catch(errorHandler);
	},
	shopApply(params) {
		return axios.post(`${prefix}/app/shop/shopEnterApply?shopName=${params.shopName}&shopLogo=${params.shopLogo}&address=${params.address}&telephone=${params.telephone}&realName=${params.realName}&cardId1=${params.cardId1}&cardId2=${params.cardId2}&drugBusinessCert=${params.drugBusinessCert}&businessLicense=${params.businessLicense}&foodBusinessCert=${params.foodBusinessCert}&drugQualityCert=${params.drugQualityCert}&openAccountCert=${params.openAccountCert}&drugRegisterCert=${params.drugRegisterCert}&longitude=${params.longitude}&latitude=${params.latitude}`).catch(errorHandler)
	}
}