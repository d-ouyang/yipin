const wechat = require('../../utils/wechat.js')
import { Demo } from '../../models/Demo.js'
const demo = new Demo()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthorize: false,
    isLogin: false,
    trystList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrystList()
  },

  // getTrystList
  getTrystList () {
    return demo.getTrystList().then(res => {
      console.log(res)
      this.setData({
        trystList: res
      })
    })
  },

  // 抢单 catchGrab
  catchGrab(e) {
    const item = e.currentTarget.dataset.item
    console.log(item)
    if (item.status == -99) {
      demo.getTrystGrab(item.id).then(res => {
        // wechat.showToast('抢单成功')
        this.getTrystList()
      })
    } else if (item.status == 1) {
      wx.navigateTo({
        url: `/pages/mall/index?id=${item.id}`,
      })
    }
  },

  // 刷新
  refresh() {
    this.getTrystList()
  },

  // 前往男性页面
  maleEntrence() {
    wx.redirectTo({
      url: '/pages/male/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wechat.setNavigationBarTitle('抢单')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 查看男性信息
  lookMaleDetail() {
    wx.navigateTo({
      url: '/pages/common/maleInfo/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getTrystList().then(() => {
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