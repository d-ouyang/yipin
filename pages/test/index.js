Page({
  data: {
    x: 0,
    y: 0
  },
  tap(e) {
    this.setData({
      x: 30,
      y: 30
    })
  },
  // "tabBar": {
  //   "color": "#BDC3CB",
  //   "selectedColor": "#1C2E49",
  //   "backgroundColor": "#FFFFFF",
  //   "list": [
  //     {
  //       "pagePath": "pages/home/index",
  //       "text": "首页",
  //       "iconPath": "/resource/icon/home.png",
  //       "selectedIconPath": "/resource/icon/selectedHome.png"
  //     },
  //     {
  //       "pagePath": "pages/mall/index",
  //       "text": "商城",
  //       "iconPath": "/resource/icon/home.png",
  //       "selectedIconPath": "/resource/icon/selectedHome.png"
  //     },
  //     {
  //       "pagePath": "pages/solutions/index",
  //       "text": "方案",
  //       "iconPath": "/resource/icon/home.png",
  //       "selectedIconPath": "/resource/icon/selectedHome.png"
  //     },
  //     {
  //       "pagePath": "pages/personal/index",
  //       "text": "我的",
  //       "iconPath": "/resource/icon/personal.png",
  //       "selectedIconPath": "/resource/icon/selectedPersonal.png"
  //     }
  //   ]
  // }
  onChange(e) {
    console.log(e.detail)
  },
  onScale(e) {
    console.log(e.detail)
  }
})