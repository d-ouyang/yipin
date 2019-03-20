import { HTTP } from '../utils/http.js'

class SolutionModel extends HTTP {
  // 获取方案列表
  getSolutionsList(pageNum, pageSize) {
    return this.request({
      url: '/solution/list ',
      method: 'POST',
      data: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    }) 
  }

  // 添加/编辑 方案
  operateSloutions(params) {
    return this.request({
      url: '/solution/make',
      method: 'POST',
      data: params
    })
  }

  // 删除方案
  deleteSolution(id) {
    return this.request({
      url: '/solution/delete',
      method: 'POST',
      data: {
        solutionId: id
      }
    })
  }

  // 获取方案详情
  getSolutionDetail(id) {
    return this.request({
      url: '/solution/detail',
      method: 'POST',
      data: {
        solutionId: id
      }
    })
  }
}

export {
  SolutionModel
}