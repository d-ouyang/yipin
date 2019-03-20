Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: Boolean,
    width: String,
    height: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: './icon/like.png',
    unlikeSrc: './icon/unlike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collect() {
      this.triggerEvent('collect', this.properties.isLike)
    }
  }
})
