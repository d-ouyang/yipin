const wechat = require('../../../utils/wechat.js')
import { MallModel } from '../../../models/Mall.js'
import { SolutionModel } from '../../../models/Solution.js'
const mall = new MallModel()
const solution = new SolutionModel()

const PAGE_SIZE = 10

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollX: true,
    padding: 0,
    catalogList: [],
    goodsList: [],
    currentCatalogId: null,
    catalogListItem: {},
    readOnly: true,
    selectedArr: [],
    selectedSrc: '/resource/icon/checked.png',
    unselectedSrc: '/resource/icon/unchecked.png',
    selected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initOptins(options)
    this.getCatalogList()
  },

  // initOptions
  initOptins(options) {
    const solutionId = options.solutionId ? options.solutionId : null
    const editType = options.editType ? options.editType : null
    console.log(solutionId, editType)
    let padding = 0
    if (solutionId) {
      padding = 260
    } else if (editType) {
      padding = 100
    }
    console.log(padding)
    this.setData({
      solutionId,
      editType,
      padding
    })
  },
  /**
   * 获取商城品类列表
   */
  getCatalogList() {
    mall.getCatalogList().then(res => {
      console.log(res)
      const catalogList = res.slice(0, 8)
      console.log(catalogList)
      for (let i in catalogList) {
        catalogList[i].list = []
        catalogList[i].loaded = false
        catalogList[i].hasNextPage = true
        catalogList[i].currentPageNum = 1
        catalogList[i].hasSelected = false // 是否已经选了衣服
      }
      this.setData({
        catalogList,
        currentCatalogId: catalogList[0].catalogId
      }, () => {
        wechat.setNavigationBarTitle(catalogList[0].catalogName).then(res => {
          this.getGoodsList(catalogList[0].catalogId, 1, PAGE_SIZE)
        })
      })
    })
  },

  /**
   * 返回当前  catalog  数据
   */
  returnCurrentCatalog(id, arr) {
    let item = null
    for (let i in arr) {
      if (arr[i].catalogId == id) {
        item = arr[i]
        break
      }
    }
    return item
  },

  /**
   * 返回当前  goodsItem  数据
   */
  // returnCurrentGoods(id, arr) {
  //   let item = null
  //   for (let i in arr) {
  //     if (arr[i].goodsId == id) {
  //       item = arr[i]
  //       break
  //     }
  //   }
  //   return item
  // },

  /**
   *  更新 goodsList 列表
   */
  updateGoodsList(item, arr) {
    for (let i in arr) {
      if (arr[i].goodsId == item.goodsId) {
        arr[i] = item
        break
      }
    }
    return arr
  },

  /**
   *  更新 catalogList 列表
   */
  updateCatalogList(id, arr, bool, num) {
    let catalogList = this.data.catalogList
    let catalogListItem = this.returnCurrentCatalog(id, catalogList)
    if (!catalogListItem.loaded) {
      catalogListItem.loaded = true
    }

    for (let i in arr) {
      arr[i].selected = false
    }

    catalogListItem.list = catalogListItem.list.concat(arr)

    catalogListItem.hasNextPage = bool
    catalogListItem.currentPageNum = num
    return catalogList
  },

  /**
   * 获取商品列表
   */
  getGoodsList(id, pageNum, pageSize) {
    wx.showLoading({
      title: '加载中...',
    }, () => {
      this.setData({
        isLocked: true
      })
    })
    mall.getCollectionGoodsList(id, pageNum, pageSize).then(res => {
      console.log(res)
      let catalogList = this.updateCatalogList(id, res.goodsList, res.hasNextPage, pageNum)
      console.log(catalogList)
      let catalogListItem = this.returnCurrentCatalog(id, catalogList)
      this.setData({
        catalogList,
        goodsList: catalogListItem.list,
        isLocked: false
      }, () => {
        wx.hideLoading()
      })
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
   * 切换品类
   */
  getGoodsListById(e) {
    console.log(e)
    const selectedId = e.detail.id
    const title = e.detail.title
    let currentCatalogId = this.data.currentCatalogId
    if (selectedId == currentCatalogId) {
      return false
    }

    let catalogList = this.data.catalogList
    let catalogListItem = this.returnCurrentCatalog(selectedId, catalogList)

    console.log(catalogListItem)
    this.setData({
      currentCatalogId: selectedId
    },() => {
      if (!catalogListItem.loaded) {
        wechat.setNavigationBarTitle(title).then(res => {
          this.getGoodsList(selectedId, catalogListItem.currentPageNum, PAGE_SIZE)
        })
      } else {
        this.setData({
          goodsList: catalogListItem.list
        })
      }
    })
  },

  /**
   * 获取商品详情
   */
  getGoodsDetail(e) {
    console.log(e)
    const goodsId = e.detail
    wx.navigateTo({
      url: `/pages/common/goodsDetail/index?id=${goodsId}&readOnly=${this.data.readOnly}`
    })
  },

  /**
   * 选择方案中的商品
   */
  catchSelect(e) {
    let currentCatalogId = this.data.currentCatalogId
    let goodsList = this.data.goodsList
    let catalogList = this.data.catalogList
    let catalogListItem = this.returnCurrentCatalog(currentCatalogId, catalogList)
    let goodsItem =  e.currentTarget.dataset.item

    // 表示已经选过商品了 并且点中的不是选中的
    if (catalogListItem.hasSelected && !goodsItem.selected) {
      wechat.showToast(`你已选择了一件${catalogListItem.catalogName}，同一品类只能选择一件`, 4000)
      return false
    } 
    //  更新选择状态
    if (goodsItem.selected) {
      catalogListItem.hasSelected = false
    } else {
      catalogListItem.hasSelected = true
    }
    goodsItem.selected = !goodsItem.selected

    goodsList = this.updateGoodsList(goodsItem, goodsList)
    
    let selectedArr = this.updateSelectedArr(currentCatalogId, goodsItem)
    console.log(selectedArr)

    this.setData({
      catalogList,
      goodsList,
      selectedArr
    })
  },

  /**
   * 提交或修改方案
   */
  operateGoods() {
    if (this.data.canSelect) {
      let selectedArr = this.data.selectedArr
      if (selectedArr.length < 2) {
        wechat.showToast('生成方案至少要选择两件商品', 3000)
        return false
      } else {
        console.log(selectedArr)
        let goodsIds = []
        for (let i in selectedArr) {
          goodsIds.push(selectedArr[i].goodsId)
        }

        let params = {
          goodsIds: goodsIds,
          solutionName: '男士休闲套装',
          solutionDesc: '适中身材',
          solutionVoice: '暂时无语音'
        }

        let solutionId = this.data.solutionId
        if (solutionId) {
          params = Object.assign({
            solutionId: solutionId
          }, params)
        }

        solution.operateSloutions(params).then(res => {
          console.log(res)
          let pages = getCurrentPages()
          let currentPage = pages[pages.length-1]
          let lastPage = pages[pages.length - 2]
          const editType = this.data.editType 
          if (editType == 'add') {
            lastPage.setData({
              backPage: 'edit'
            }, () => {
              wx.navigateBack()
            })
          } else if (editType == 'edit') {
            lastPage.setData({
              editSolutionId: res.solutionId
            }, () => {
              wx.navigateBack()
            })
          }
        })
      }
    } else {
      this.setData({
        canSelect: true
      })
    }
  },

  /**
   * 更新选中商品列表
   * @id catalogId
   * @goods 选中的商品
   */
  updateSelectedArr(id, goods) {
    let selectedArr = this.data.selectedArr
    console.log(id, goods)
    if (goods.selected) { // 表示 push
      let item = Object.assign({
        catalogId: id
      }, goods)
      selectedArr.push(item)
    } else { // 表示删除数组中选中的
      for (let i in selectedArr) {
        if (id == selectedArr[i].catalogId) {
          selectedArr.splice(i, 1)
          break
        }
      }
    }
    return selectedArr
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
    let currentCatalogId = this.data.currentCatalogId
    let catalogList = this.data.catalogList
    let catalogListItem = this.returnCurrentCatalog(currentCatalogId, catalogList)
    console.log(catalogListItem)

    if (!catalogListItem.hasNextPage) { // 没有下一页
      wechat.showToast('没有更多了！')
      return false
    }

    let currentPageNum = catalogListItem.currentPageNum + 1
    this.getGoodsList(currentCatalogId, currentPageNum, PAGE_SIZE)
  },

  /**
   *  点击选中的图片
   */
  tapItemImg(e) {
    let selectedArr = this.data.selectedArr
    const index = e.currentTarget.dataset.index
    // let urls = []
    // selectedArr.map((item) => {
    //   urls.push(item.goodsPicUrl)
    // })
    // console.log(urls)
    // wechat.previewImage(urls, index)
  },

  /**
   * 判断
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})