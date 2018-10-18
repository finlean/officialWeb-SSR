/** 2017/11/15
 * 作者:c.k
 * 功能: 状态码统一管理
 */

import Cookies from 'js-cookie'
import dateForm from '../plugins/date'

export default {
  alertModule(_this, content) {
    _this.$message.error(content)
  },
  showTipOfStatuCode(error, _this) {
    const _errorCode = error.response.data.errorCode
    if (_errorCode === 99 || error.response.data.status === 90040006) {
      // 单点登录控制
      Cookies.remove('user')
      Cookies.remove('sid')
      this.alertModule(_this, '登录超时，请重新登录')
    } else if (_errorCode === 11004) {
      this.alertModule(_this, error.response.data.errMsg)
    } else if (_errorCode === -999) {
      this.alertModule(_this, '系统异常，请稍后重试')
    } else {
      let _msg = '网络异常,请稍后重试'
      if (error.response.data.errMsg) {
        _msg = error.response.data.errMsg
      } else if (error.response.data.message) {
        _msg = error.response.data.message
      }
      this.alertModule(_this, _msg)
    }
  }
}
