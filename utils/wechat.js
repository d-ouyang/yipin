Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

class WeChat {
  // 监测有没有登录过期
  static checkSession() {
    return new Promise((resolve, reject) => wx.checkSession({
      success: resolve,
      fail: reject
    }))
  }

  // 登录获取 code
  static login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      })
    })
  };

  static getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: true,
        success: resolve,
        fail: reject
      })
    })
  };

  // 获取设备信息
  static getSystemInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: resolve,
        fail: reject
      })
    })
  }

  // 获取授权列表
  static getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject
      })
    })
  }

  // 确认授权与否
  static authorize(o) {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: o,
        success: resolve,
        fail: reject
      })
    })
  }

  // 获取当前地理位置
  static getLocation() {
    return new Promise((resolve, reject) => {
      let options = {
        type: 'gcj02',
        success: resolve,
        fail: reject
      }
      wx.getLocation(options)
    })
  }

  //拉起支付
  static wxPay(d) {
    return new Promise((resolve, reject) => {
      wx.requestPayment(Object.assign({}, d, { success: resolve, fail: reject }))
    })
  }

  // 显示模态框
  static showModal(content, cancle) {
    cancle = cancle === true ? true : false 
    return new Promise((resolve, reject) => {
      let options = {
        title: '提示',
        content: content,
        showCancel: cancle,
        confirmColor: '#2657EB',
        success: resolve,
        fail: reject
      }
      wx.showModal(options)
    })
  }

  // 显示提示框
  static showToast(content, duration) {
    duration = duration ? duration : 2000
    return new Promise((resolve, reject) => {
      let options = {
        title: content,
        icon: 'none',
        duration: duration,
        success: resolve,
        fail: reject
      }
      wx.showToast(options)
    })
  }

  // 设置标题栏
  static setNavigationBarTitle(title) {
    return new Promise((resolve, reject) => {
      let options = {
        title: title,
        success: resolve,
        fail: reject
      }
      wx.setNavigationBarTitle(options)
    })
  }

  // 预览图片
  static previewImage(arr, index) {
    return new Promise((resolve, reject) => {
      let options = {
        urls: arr,
        current: index,
        success: resolve,
        fail: reject
      }
      wx.previewImage(options)
    })
  }

  // 上传图片
  static chooseImage(count) {
    return new Promise((resolve, reject) => {
      let options = {
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      }
      wx.chooseImage(options)
    })
  }
}
module.exports = WeChat