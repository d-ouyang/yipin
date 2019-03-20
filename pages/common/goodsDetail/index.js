const wechat = require('../../../utils/wechat.js')
import { MallModel } from '../../../models/Mall.js'
let mall = new MallModel()

import { Demo } from '../../../models/Demo.js'
let demo = new Demo()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    indicatorColor: '',
    indicatorActiveColor: '',
    autoplay: true,
    circular: true,
    bannerImages: [],
    goodsDescArr: [],
    goodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsId: options.id,
      trystId: options.trystId
    })
    this.getGoodsDetail(parseInt(options.id))
    this.judgeColection(options.readOnly)
  },

  /**
   * 判断能否收藏
   */
  judgeColection(readOnly) {
    if (readOnly == 'true') {
      readOnly = true
    } else {
      readOnly = false
    }
    this.setData({
      readOnly
    })
  },

  /**
   * 获取详情 by id
   */
  getGoodsDetail(id) {
    demo.getGoodsDetail(id).then(res => {
      console.log(res)
      this.handleDetailInfo(res)
    })
  },

  /**
   * 处理商品详情
   */
  handleDetailInfo(data) {
    let goodsDescArr = data.goodsDesc.split(';')
    console.log(goodsDescArr)
    this.setData({
      bannerImages: data.goodsPicUrls,
      goodsDescArr,
      goodsInfo: data
    })
  },

  /**
   * 点赞 / 取消点赞
   */
  setOrCancleUserLike(id, isLike) {
    let goodsInfo = this.data.goodsInfo
    mall.setUserLike(id).then(res => {
      console.log(res)
      goodsInfo.isLike = !isLike
      this.setData({
        goodsInfo,
      }, () => {
        if (isLike) { // 取消收藏
          wechat.showToast('取消收藏')
        } else { // 收藏
          wechat.showToast('收藏成功')
        }
      })
    })
  },

  /**
   * 接收
   */
  bindCollect(e) {
    console.log(e)
    const isLike = e.detail
    const id = e.currentTarget.dataset.id
    // const index = e.currentTarget.dataset.index
    this.setOrCancleUserLike(id, isLike)
  },

  /**
   * 加入购物车
   */
  addToCarts() {
    demo.addToShoppingCart(this.data.goodsId).then(res => {
      wechat.showToast('成功加入购物车')
    }).catch( err => {
      wechat.showToast('加入购物车失败')
    })
  },

  /**
   * 前往购物车
   */
  goToCarts() {
    wx.navigateTo({
      url: `/pages/shopping/index?id=${this.data.trystId}`,
    })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})