let wechat = require('../../utils/wechat.js')
import { HTTP } from '../../utils/http.js'

let http = new HTTP()
console.log(http)

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLogin: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    canLogin: false
  },

  attached() {
    wx.showLoading({
      title: '加载中...',
    })
    wechat.login().then(res => {
      console.log(res)
      this.setData({
        code: res.code,
        canLogin: true
      },() => {
        wx.hideLoading()
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(res) {
      wx.showLoading({
        title: '登录中...',
      })
      console.log(res)
      if (res.detail.encryptedData) { // 点击授权/已经授权
        let params = {
          code: this.data.code,
          encryptedData: res.detail.encryptedData,
          iv: res.detail.iv
        }
        console.log(params)
        
        return http.request({
          url: "/login/auth",
          method: "POST",
          data: params
        })
        .then(res => {
          console.log(res)
          let loginInfo = Object.assign({}, res)
          wx.setStorageSync('loginInfo', loginInfo)
          wx.hideLoading()
          this.triggerEvent('login',{isLogin: true})
        })
        .catch(err => {
          wx.hideLoading()
          this.triggerEvent('login', { isLogin: false })
        })
      }
    }
  }
})
