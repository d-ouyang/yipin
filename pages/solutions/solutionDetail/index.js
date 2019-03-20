const wechat = require('../../../utils/wechat.js')
import { SolutionModel } from '../../../models/Solution.js'

const solution = new SolutionModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    editSolutionId: '',
    solutionDetail: [],
    goodsIds: [],
    readOnly: true,
    canEdit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getSolutionDetail(options.id)
  },

  /**
   * 获取方案详情
   */
  getSolutionDetail(id) {
    this.setData({
      solutionId: id
    })
    solution.getSolutionDetail(id).then(res => {
      console.log(res)
      this.handleSolutionGoods(res.goodsInfo)
    })
  },

  /**
   * 处理详情数据
   */
  handleSolutionGoods(goods) {
    let goodsIds = []
    for (let i in goods) {
      goodsIds.push(goods[i].solutionId)
    }
    this.setData({
      solutionDetail: goods,
      goodsIds
    })
  },

  /** 
   * 保存方案
   */
  storeSolution() {
    const solutionId = this.data.solutionId
  },

  /**
   * 前往商品详情页
   */
  goTogoodsDetail(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/common/goodsDetail/index?id=${id}&readOnly=${this.data.readOnly}`,
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
    let editSolutionId = this.data.editSolutionId
    if (editSolutionId == '') return false

    this.setData({
      solutionId: editSolutionId
    }, () => {
      this.getSolutionDetail(editSolutionId)
    })
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