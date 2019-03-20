import { HTTP } from '../utils/http.js'

class MallModel extends HTTP {
  // 商城  品类信息
  getCatalogList() {
    return this.request({
      url: '/mall/catalogList',
      method: 'POST'
    })
  }

  // 商品列表  by catalogId
  getGoodsList(id, pageNum, pageSize) {
    return this.request({
      url: '/mall/goodsByCatalog',
      method: 'POST',
      data: {
        catalogId: id,
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }

  // 根据商品 id 获取详情
  getGoodsDetail(id) {
    return this.request({
      url: '/mall/goodInfo',
      method: 'POST',
      data: {
        goodId: id
      }
    })
  }

  // 给商品点赞 / 取消点赞
  setUserLike(id) {
    return this.request({
      url: '/mall/setUserLike',
      method: 'POST',
      data: {
        goodId: id
      }
    })
  }

  // 收藏列表 by catalogId
  getCollectionGoodsList(id, pageNum, pageSize) {
    return this.request({
      url: '/like/list',
      method: 'POST',
      data: {
        catalogId: id,
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }
}

export {
  MallModel
}