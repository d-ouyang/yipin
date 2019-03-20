const wechat = require('../../utils/wechat.js')
import { Male } from '../../models/MaleDemo.js'
const male = new Male()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trystList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lookHistoryTrysts()
  },

  // 获取男性历史发单列表
  lookHistoryTrysts() {
    wx.showLoading({
      title: '加载中...',
    })
    return male.lookHistoryTrysts().then(res => {
      console.log(res)
      this.setData({
        trystList: res
      }, () => {
        wx.hideLoading()
      })
    })
  },

  // 点击查看具体单女性抢单列表
  lookTrends(e) {
    const item = e.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: `./trends/index?id=${item.id}`,
    })
  },

  // 前往需求发布页
  createNewTryst() {
    wx.navigateTo({
      url: './newTryst/index',
    })
  },

  // 前往女性页面
  femaleEntrence() {
    wx.redirectTo({
      url: '/pages/home/index',
    })
  },

  // 完善个人信息
  goToInfomation() {
    wx.navigateTo({
      url: '',
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
    this.lookHistoryTrysts().then(() => {
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