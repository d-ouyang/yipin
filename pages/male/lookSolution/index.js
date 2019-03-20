const wechat = require('../../../utils/wechat.js')
import { Male } from '../../../models/MaleDemo.js'
const male = new Male()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    solutions:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      trystId: options.id
    }, () => {
      this.lookSolution(options.id)
    })
  },

  // 查看候选人方案
  lookSolution(id) {
    return male.lookSolution(id).then(res => {
      console.log(res)
      this.setData({
        solutions: res
      })
    })
  },

  // setMVP
  setMVP(e) {
    const item = e.currentTarget.dataset.item
    console.log(item)
    male.setMVP(item.id, this.data.trystId).then(res => {
      wx.navigateBack()
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
    this.lookSolution(this.data.trystId).then(() => {
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