import { HTTP } from '../utils/http.js'

class Male extends HTTP {
  // 男性历史发单列表
  lookHistoryTrysts(pageNum, pageSize) {
    return this.request({
      url: '/man/tryst/list',
      method: 'POST',
      data: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }

  // 男性发布新单 POST /api/yipin/man/tryst/newTryst
  creatNewtryst(title, content) {
    return this.request({
      url: '/man/tryst/newTryst',
      method: 'POST',
      data: {
        title: title,
        content: content
      }
    })
  }

  // 男性查看特定单的女性列表 POST /api/yipin/man/tryst/lookTenders
  getTenders(pageNum, pageSize, trystId) {
    return this.request({
      url: '/man/tryst/lookTenders',
      method: 'POST',
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        trystId: trystId
      }
    })
  }

  // 男性选择 POST /api/yipin/man/tryst/setSelected
  setSlected(trystId, userId) {
    return this.request({
      url: '/man/tryst/setSelected',
      method: 'POST',
      data: {
        trystId: trystId,
        userId: userId
      }
    })
  }

  // 男性查看特定方案 POST /api/yipin/man/tryst/lookSolutions
  lookSolution(trystId) {
    return this.request({
      url: '/man/tryst/lookSolutions',
      method: 'POST',
      data: {
        trystId: trystId,
      }
    })
  }

  // 男性选择最优方案 POST /api/yipin/man/tryst/setMVP
  setMVP(solutionId, trystId) {
    return this.request({
      url: '/man/tryst/setMVP',
      method: 'POST',
      data: {
        solutionId: solutionId,
        trystId: trystId
      }
    })
  }

  // 男性个人资料相关数据 GET /api/yipin/man/tryst/enumeratedList
  getEnumeratedList() {
    return this.request({
      url: '/man/tryst/enumeratedList'
    })
  }
  
  // 编辑个人资料 POST /api/yipin/man/tryst/addDetail
  addDetail(options) {
    return this.request({
      url: '/man/tryst/addDetail',
      method: 'POST',
      data:Object.assign({},options)
    })
  }

  // 获取男性基本信息 GET /api/yipin/man/tryst/getUserDetail
  getUserDetail() {
    return this.request({
      url: "/man/tryst/getUserDetail"
    })
  }
}

export {
  Male
}