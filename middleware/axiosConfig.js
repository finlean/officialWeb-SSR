import axios from 'axios'
import Cookies from 'js-cookie'
import sign from '../plugins/loginSign'
import qs from 'qs'
// const ajaxUrl = env === 'development'
//     ? 'http://127.0.0.1:3000'
//     : env === 'production'
//     ? 'https://www.url.com'
//     : 'https://debug.url.com';
// 创建实例
const Instance = axios.create({
  // baseURL: ajaxUrl,
  timeout: 1000 * 30, // 6秒超时
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  // transformRequest: [function (data) {
  //     return JSON.stringify(data);
  // }]
})
// 全局拦截器设置
Instance.interceptors.request.use(
  config => {
    //  ================begin ===================
    //	store.commit('isLoading',{showLoading:true});
    if (config.method === 'post') {
      // post 封装数据
      if (typeof config.data !== 'object') {
        config.data = {}
      }
      config.data.chanNo = 100
      config.data.areaCode = window.sessionStorage.getItem('position')
    } else if (config.method === 'get') {
      // get 封装数据
      if (config.params === undefined) {
        config.params = {}
      }
      config.params.chanNo = 100
      config.params.areaCode = window.sessionStorage.getItem('position')
    }
    let sessionID = Cookies.get('sid')
    // 验签 用于所有没有登录并传递有电话号码的接口验签
    if (sessionID === null) {
    } else {
      // 参数签名
      // 必须由http或https开头的请求，才会进行自动签名组装
      if (config.params) {
        config.params = sign.signForFormDataOrUrl(
          config.params,
          true,
          sessionID
        )
      } else if (config.data) {
        config.data = sign.signForFormDataOrUrl(config.data, false, sessionID)
      } else {
        if (config.method === 'GET') {
          config.params = sign.signForFormDataOrUrl(
            config.data,
            false,
            sessionID
          )
        } else {
          config.data = sign.signForFormDataOrUrl(config.data, false, sessionID)
        }
      }
    }
    //将参数转换为form表单形式
    //        config.data = qs.stringify(config.data);
    //  ================end   ===================
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response统一处理操作
Instance.interceptors.response.use(
  res => {
    if (
      res.headers &&
      res.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8'
    ) {
      downloadUrl(res.request.responseURL)
    }
    return res.data
  },
  error => {
    // codeManger.$Message.error(error.response.data.errMsg);
    return Promise.reject(error)
  }
)
export default Instance
