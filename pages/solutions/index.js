const wechat = require('../../utils/wechat.js')
import { SolutionModel } from '../../models/Solution.js'

const solution = new SolutionModel()
const PAGE_SIZE = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    solutions: [],
    currentPageNum: 1,
    hasNextPage: true, // 更多数据  默认有下一页
    isLocked: false, // 上拉加载锁  默认没锁
    backPage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSolutionsList(this.data.currentPageNum, PAGE_SIZE)
  },

  /** 
   * 获取方案列表
   */
  getSolutionsList(pageNum, pageSize) {
    wx.showLoading({
      title: '加载中...',
    }, () => {
      this.setData({
        isLocked: true
      })
    })
    solution.getSolutionsList(pageNum, pageSize).then(res => {
      console.log(res)
      let solutions = res.solutionInfoList
      for (let i in solutions) {
        solutions[i].solutionPicUrls = solutions[i].solutionPicUrls.slice(0,4)
      }
      solutions = this.data.solutions.concat(solutions)
      console.log(solutions)
      this.setData({
        hasNextPage: res.hasNextPage,
        solutions,
        isLocked: false
      }, () => {
        wx.hideLoading()
      })
    })
  },

  /**
   * 拉起删除的 model 框
   */
  deleteSolution(e) {
    console.log(e)
    let solutions = this.data.solutions
    const data = e.currentTarget.dataset
    const id = data.id
    const index = data.index

    wechat.showModal('是否删除这套方案？').then(res => {  
      console.log(res)
      if (res.cancel) {
        wechat.showToast('取消删除')
      } else if (res.confirm) {
        solutions.splice(index, 1)
        console.log(solutions)
        this.setData({
          solutions
        })
        return solution.deleteSolution(id)
      }
    })
    .then(res => {
      wechat.showToast('删除成功')
    })
  },

  /**
   * 前往方案详情页
   */
  goToDetail(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./solutionDetail/index?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wechat.setNavigationBarTitle('我的方案')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let backPage = this.data.backPage
    if (backPage == '' || backPage == 'detail') {
      return false
    }

    this.setData({
      solutions: [],
      currentPageNum: 1
    }, () => {
      this.getSolutionsList(this.data.currentPageNum, PAGE_SIZE)
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
    console.log('上拉加载')
    if (this.data.isLocked) return false

    if (!this.data.hasNextPage) {
      wechat.showToast('没有更多了')
      return false
    }

    const currentPageNum = this.data.currentPageNum + 1

    this.setData({
      currentPageNum
    }, () => {
      this.getSolutionsList(currentPageNum, PAGE_SIZE)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})