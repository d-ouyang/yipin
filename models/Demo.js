import { HTTP } from '../utils/http.js'

class Demo extends HTTP {
  // 获取需求列表 POST /api/yipin/woman/tryst/list
  getTrystList(pageNum, pageSize) {
    return this.request({
      url: '/woman/tryst/list',
      method: 'POST',
      data: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }

  // 抢单 GET /api/yipin/woman/tryst/grab
  getTrystGrab(trystId) {
    return this.request({
      url: `/woman/tryst/grab?trystId=${trystId}`
    })
  }

  // 获取购物车 GET /api/yipin/woman/tryst/shoppingCart
  getShoppingCart () {
    return this.request({
      url: '/woman/tryst/shoppingCart'
    })
  }

  // 提交方案 POST /api/yipin/woman/tryst/submit
  submitSolution (solution) {
    return this.request({
      url: '/woman/tryst/submit',
      method: 'POST',
      data: solution
      
      // {
      //   goodsIds: goodsIds,
      //   solutionDesc: '这是一个好方案',
      //   solutionName: '方案一',
      // }
      // {
      //   "goodsIds": [
      //     0
      //   ],
      //   "solutionDesc": "衣服好好好",
      //   "solutionId": 0,
      //   "solutionName": "方案一",
      //   "solutionVoice": "语音语音",
      //   "tenderId": 0,
      //   "trystId": 0
      // }
    })
  }

  // 添加至购物车 POST /api/yipin/woman/mall/addToShoppingCart
  addToShoppingCart(goodsId) {
    return this.request({
      url: '/woman/mall/addToShoppingCart',
      method: 'POST',
      data: {
        goodsId: goodsId
      }
    })
  }

  // 商城获取品类 GET /api/yipin/woman/catalogList
  getCatalogList() {
    return this.request({
      url: '/woman/catalogList'
    })
  }

  // 商城列表 POST /api/yipin/woman/mall/list
  getGoodsList(catalogId, pageNum, pageSize) {
    return this.request({
      url: '/woman/mall/list',
      method: 'POST',
      data: {
        catalogId,
        pageNum,
        pageSize,
      }
    })
  }

  // 获取商品详情 GET /api/yipin/woman/mall/goodsDetail
  getGoodsDetail(id) {
    return this.request({
      url:`/woman/mall/goodsDetail?goodsId=${id}`,
    })
  }

  // 加入购物车 POST /api/yipin/woman/mall/addToShoppingCart
  addToShoppingCart(id) {
    return this.request({
      url: '/woman/mall/addToShoppingCart',
      method: 'POST',
      data: {
        goodsId: id
      }
    })
  }
}

export {
  Demo
}