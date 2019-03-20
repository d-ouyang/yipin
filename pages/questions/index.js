// pages/questions/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin()
  },

  // isLogin
  isLogin() {
    let loginInfo = wx.getStorageSync('loginInfo')
    if (!loginInfo.ypToken) {
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      },() => {
        wx.redirectTo({
          url: '/pages/home/index'
        })
      })
    }
  },

  bindLogin(e) {
    console.log(e)
    this.setData({
      isLogin: e.detail.isLogin
    },() => {
      if (!e.detail.isLogin) {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.redirectTo({
          url: '/pages/home/index'
        })
      }
    })
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})