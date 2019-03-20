const wechat = require('../../utils/wechat.js')
import { Demo } from '../../models/Demo.js'
const demo = new Demo()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingCartList: [],
    goodsIds: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    this.getShoppingCart()
  },

  // 获取购物车商品
  getShoppingCart() {
    return demo.getShoppingCart().then(res => {
      console.log(res)
      const goodsIds = []
      res.map((item,index) => {
        goodsIds.push(item.goodsId)
      })
      console.log(goodsIds)
      this.setData({
        shoppingCartList: res,
        goodsIds
      })
    })
  },

  // 提交方案
  submitSolution() {
    let solution = {}
    solution.goodsIds = this.data.goodsIds
    solution.solutionDesc = '这是一个好方案'
    solution.solutionName = '方案一'
    solution.trystId = this.data.id
    console.log(solution)
    demo.submitSolution(solution).then(res => {
      return wechat.showToast('方案提交成功')
    }).then(res => {
      wx.redirectTo({
        url: '/pages/home/index',
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wechat.setNavigationBarTitle('购物车')
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
    this.getShoppingCart().then(() => {
      wx.stopPullDownRefresh()
    })
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