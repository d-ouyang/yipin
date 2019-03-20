const wechat = require('../../utils/wechat.js')
import { MallModel } from '../../models/Mall.js'
let mall = new MallModel()
import { Demo } from '../../models/Demo.js'
let demo = new Demo()
const PAGE_SIZE = 10

Page({
  /**
   * 页面的初始数据
   */
  data: {
    catalogList: [],
    goodsList: [],
    currentCatalogId: null,
    currentPageNum: 1,
    hasNextPage: true, // 更多数据  默认有下一页
    isLocked: false, // 上拉加载锁  默认没锁
    readOnly: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      trystId: options.id
    })
    this.getCatalogList()
  },

  /**
   * 获取商城品类列表
   */
  getCatalogList() {
    demo.getCatalogList().then(res => {
      console.log(res)
      const catalogList = res.slice(0,8)
      console.log(catalogList)
      this.setData({
        catalogList,
        currentCatalogId: catalogList[0].catalogId
      },() => {
        wechat.setNavigationBarTitle(catalogList[0].catalogName).then(res => {
          this.getGoodsList(catalogList[0].catalogId, 1, PAGE_SIZE)
        })
      })
    })
  },

  /**
   * 获取商品列表
   */
  getGoodsList(id, pageNum, pageSize) {
    wx.showLoading({
      title: '加载中...',
    }, () => {
      this.setData({
        isLocked: true
      })
    })
    demo.getGoodsList(id, pageNum, pageSize).then(res => {
      console.log(res)
      let goodsList = this.data.goodsList.concat(res.goodsList)
      // console.log(goodsList)
      this.setData({
        hasNextPage: res.hasNextPage,
        goodsList, 
        isLocked: false
      }, () => {
        wx.hideLoading()
      })
    })
  },

  /**
   * 切换 id 获取商品列表
   */
  getGoodsListById(e) {
    console.log(e)
    const selectedId = e.detail.id
    const title = e.detail.title
    console.log(title)
    const currentCatalogId = this.data.currentCatalogId
    console.log(selectedId, currentCatalogId)
    if (selectedId == currentCatalogId) {
      return false
    }

    this.setData({
      currentCatalogId: selectedId,
      currentPageNum: 1,
      goodsList: []
    }, () => {
      wechat.setNavigationBarTitle(title).then(res => {
        this.getGoodsList(selectedId, 1, PAGE_SIZE)
      })
    })
  },

  /**
   * 根据商品id 获取商品详情
   */
  getGoodsDetail(e) {
    const goodsId = e.detail
    console.log(goodsId)
    // this.setUserLike(goodsId)
    wx.navigateTo({
      url: `/pages/common/goodsDetail/index?id=${goodsId}&readOnly=${this.data.readOnly}&trystId=${this.data.trystId}`
    })
  },
  
  /**
   * 点赞 / 取消点赞
   */
  setOrCancleUserLike(id, isLike, index) {
    let goodsList = this.data.goodsList
    goodsList[index].like = !isLike
    this.setData({
      goodsList,
    }, () => {
      if (isLike) { // 取消收藏
        wechat.showToast('取消收藏')
      } else { // 收藏
        wechat.showToast('收藏成功')
      }
    })
    mall.setUserLike(id).then(res => {
      console.log(res)
    })
  },

  /**
   * 接收
   */
  bindCollect(e) {
    console.log(e)
    const data = e.detail
    const isLike = data.isLike
    const id = data.id
    const index = data.index
    this.setOrCancleUserLike(id, isLike, index)
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    if (this.data.isLocked) { // 锁了
      console.log('锁住了')
      return false
    }

    if (!this.data.hasNextPage) { // 没有下一页
      wechat.showToast('没有更多了！')
      return false
    }

    const currentCatalogId = this.data.currentCatalogId
    const currentPageNum = this.data.currentPageNum + 1
    this.setData({
      currentCatalogId,
      currentPageNum
    }, () => {
      this.getGoodsList(currentCatalogId, currentPageNum, PAGE_SIZE)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})