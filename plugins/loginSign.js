/**
 * Created by 陈伟
 * 2017/11/21.
 * 登录所有传参数接口验签
 */
import validator from './validator';
import md5 from 'blueimp-md5';

export default {
	signForFormDataOrUrl (datas, isUrl, loginSessionID) {
        if (validator.checkValEmpty(loginSessionID)) {   // 判断登录的sessionId
			return datas;
		}
		let params = {};
        if (datas === null || datas === '') {  // 如果参数为空 ，那就对sessinoId md5
			params.jttechSign = md5 (loginSessionID);
			return params;
		}
		let keySort = [];
		params = datas;
        if (params) {   // 将参数中的 key 取出来放入到一个新数组里
			for (let key in params) {
				keySort[keySort.length] = key;
			}
		}
        if (isUrl) {  // 如果为 post 请求 就 进行 sort 排序
			keySort.sort ();
		}
		// 普通参数的值（非空、非空字符串、非数组）
		let ordinaryParamVal = '';
		for (let index in keySort) {
			for (let param in params) {
				if (param === keySort[index] && params[param] !== null && !Array.isArray (params[param])) {
					if (params[param] instanceof String) {
						if (params[param].toString ().replace (/(^\s*)|(\s*$)/g, '') !== '') {
							ordinaryParamVal += params[param];
						}
					} else {
						ordinaryParamVal += params[param];
					}
				}
			}
		}
		if (!validator.checkValEmpty (loginSessionID)) {
			ordinaryParamVal = md5 (ordinaryParamVal + loginSessionID);
		}
		params.jttechSign = ordinaryParamVal;
		return params;
	}
};
