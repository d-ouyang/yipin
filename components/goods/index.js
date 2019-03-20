// compontents/goods/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    index: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 详情
    getGoodsDetail(e) {
      console.log(e)
      const id = e.currentTarget.dataset.id
      this.triggerEvent('getGoodsDetail', id)
    },
    // 收藏 / 取消收藏
    bindCollect(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      const index = data.index
      const id = data.id
      const isLike = e.detail
      this.triggerEvent('collect',{
        id,
        index,
        isLike
      })
    }
  }
})
