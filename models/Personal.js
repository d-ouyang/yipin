import { HTTP } from '../utils/http.js'

class PersonalModel extends HTTP {
  // 获取 七牛 uptoken
  getUptoken() {
    return this.request({
      url: '/common/qiniu/token'
    })
  }
}

export {
  PersonalModel
}