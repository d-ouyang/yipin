// compontents/catalog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
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
    getGoodsListById(e) {
      const data = e.currentTarget.dataset
      const id = data.id
      const title = data.title
      this.triggerEvent('getGoodsListById',{
        id: id,
        title: title
      })
    }
  }
})
