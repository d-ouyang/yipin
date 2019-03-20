const wechat = require('../../../utils/wechat.js')
import { Male } from '../../../models/MaleDemo.js'
const male = new Male()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    bodyTypeList: [],
    bodyIndex: 0,
    skinColorList: [],
    skinsIndex: 0,
    styleList: [],
    styleIndex: 0,
    theAge: 10,
    theHeight: 150,
    theWeight: 40,
    profession:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEnumeratedList()
  },

  // 获取男性资料 selected 数组
  getEnumeratedList() {
    male.getEnumeratedList().then(res => {
      console.log(res)
      this.setData({
        bodyTypeList: res.bodyTypeList,
        skinColorList: res.skinColorList,
        styleList: res.styleList
      })
    })
  },

  // 上传图片
  uploadImage () {
    wechat.chooseImage(1).then(res => {
      console.log(res)
      this.setData({
        src: res.tempFilePaths[0]
      })
    })
  },

  // 设置年龄 settingAge
  settingAge(e) {
    console.log(e)
    this.setData({
      theAge: e.detail.value
    })
  },

  // 设置身高 settingHeight
  settingHeight(e) {
    console.log(e)
    this.setData({
      theHeight: e.detail.value
    })
  },

  // 设置体重 settingWeight
  settingWeight(e) {
    this.setData({
      theWeight: e.detail.value
    })
  },

  // 选取体型 settingBodyType
  settingBodyType(e) {
    console.log(e)
    this.setData({
      bodyIndex: e.detail.value
    })
  },

  // 选取肤色 settingSkinColor
  settingSkinColor(e) {
    this.setData({
      skinsIndex: e.detail.value
    })
  },

  // 选取穿衣风格 settingStyle
  settingStyle(e) {
    this.setData({
      styleIndex: e.detail.value
    })
  },

  // 确定 formSubmit
  formSubmit(e) {
    console.log(e)
    let opt = {
      fullPicture: this.data.src
    }

    male.addDetail(Object.assign(opt,e.detail.value)).then(res => {
      console.log(res)
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