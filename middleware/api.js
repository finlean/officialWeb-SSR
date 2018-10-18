/**
 * 统一接口管理
 */
import Instance from './axiosConfig'

export default {
  //获取定位城市
  getCity(data) {
    return Instance.get(
      '/json/finlean_ow/finlean_wallet_ow_area.json?' + new Date(),
      data
    )
  },
  //首页图片
  getimg(data) {
    return Instance.post('/ow/image/list', data)
  },
  //产品列表
  prodList(data) {
    return Instance.post('/ow/prod/list', data)
  },
  //产品详情
  prodDetail(data) {
    return Instance.post('/ow/prod/detail', data)
  },
  // 新闻列表
  newsList(data) {
    return Instance.post('/ow/news/list', data)
  },
  //找顾问
  FindAdvisor(data) {
    return Instance.post('/ow/advisor/findAdvisor', data)
  },
  //   按条件查询顾问
  getQueryCondition(data) {
    return Instance.post('/ow/advisor/getQueryCondition', data)
  },
  //新闻详情
  newsDetails(data) {
    return Instance.post('/ow/news/detail', data)
  },
  //  新闻类型
  newsType(data) {
    return Instance.post('/ow/news/getNewsCategory', data)
  },
  //咨询顾问
  consultManager(data) {
    return Instance.post('/ow/advisor/findAdvisor', data)
  },
  //获取验证码
  getVerCode(data) {
    return Instance.post('/ow/user/getVerCode', data)
  },
  //获取定位
  getPosition(data) {
    return Instance.post('/ow/position/getPosition', data)
  },
  //咨询顾问筛选初始化
  initFilter(data) {
    return Instance.post('/ow/advisor/getQueryCondition', data)
  },
  //咨询顾问初始化
  initAdvisor(data) {
    return Instance.post('/ow/advisor/list', data)
  }
}
