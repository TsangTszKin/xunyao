import api from '@/http/api.js'       //http请求

const prefix = api.defaults.baseURL;
export default {
	goWxOauth2() {
		var returnUrl = location.href;
		var index = returnUrl.indexOf("?");
		if(index>=0){
			returnUrl = returnUrl.substr(0,index);
		}
		var url = prefix+"/app/auth/goWxOauth2?returnUrl="+encodeURIComponent(returnUrl);
		//alert(url);
		location.href = url;
	}


}