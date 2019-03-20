const wechat = require('../../../utils/wechat.js')
import { Male } from '../../../models/MaleDemo.js'
const male = new Male()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trends: [],
    selected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      trystId: options.id
    }, () => {
      this.getTenders(1, 20, options.id)
    })
  },

  // getTenders
  getTenders(pageNum, pageSize, id) {
    return male.getTenders(pageNum, pageSize, id).then(res => {
      console.log(res)
      if (!res || !res.length) {
        res = []
      } else {
        res.map((item, index) => {
          console.log(item)
          console.log(index)
          item.isCheck = false
        })
      }
      this.setData({
        trends: res,
        trystId: id
      })
    })
  },

  // 选择
  bindSelected (e) {
    console.log(e)
    let trends = this.data.trends
    // let selected = this.data.selected
    const data = e.currentTarget.dataset
    const i = data.index
    const item = data.item

    trends[i].isCheck = true
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      trends,
    },res => {
      male.setSlected(this.data.trystId, trends[i].id).then(res => {
        wx.redirectTo({
          url: `/pages/male/lookSolution/index?id=${this.data.trystId}`,
        })
      })
    })

    // if (trends[i].isCheck) {
    //   trends[i].isCheck = false
    //   selected.map((item, index) => {
    //     if (trends[i].id == item.id) {
    //       selected.splice(index,1)
    //     }
    //   })
    // } else {
    //   trends[i].isCheck = true
    //   selected.push(trends[i])
    // }
    // console.log(selected)

    // this.setData({
    //   trends,
    //   selected
    // }, () => {
    //   if (selected.length >= trends.length || selected.length >= 3) {
    //     wechat.showToast(`候选人选择完毕`).then(res => {
          
    //     })
    //   }
    // })
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
    this.getTenders(1, 20, this.data.trystId).then(() => {
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