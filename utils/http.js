import {
  config
} from '../config'

let wechat = require('./wechat.js')

const tips = {
  1: '抱歉，出错了',
  300: '参数异常',
  400: '系统异常',
  401: '无访问权限',
  500: '服务访问不通',
}

class HTTP {
  constructor () {
    this.token = this.getToken() ? (config.Authorization + this.getToken()) : ''
  }

  request(params) {
    return new Promise((resolve, reject) => {
      // url, data, method
      if (!params.method) {
        params.method = 'GET'
      }

      console.log(this.token)
      let token = this.getToken() ? (config.Authorization + this.getToken()) : ''
      
      let options = {
        url: config.api_base_url + params.url,
        method: params.method,
        header: {
          'content-type': 'application/json',
          'Authorization': token
        },
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            let errCode = res.data.code
            if (errCode == config.ERR_OK) {
              resolve(res.data.data)
            } else {
              this._showError(res.data.msg)
              reject
            }
          } else {
            let errCode = res.data.code
            this._showError(res.data.msg)
            reject(errCode)
          }
        },
        fail: (err) => {
          this._showErrorStatus(res.statusCode)
          reject
        }
      }

      if (params.data == undefined) {
        options = Object.assign({}, options)
      } else {
        options = Object.assign({ data: params.data }, options)
      }

      console.log(options)
      wx.request(options)
    })
  }

  uploadFile(params) {
    return new Promise((resolve, reject) => {
      let options = {
        url: config.api_base_url + params.url,
        filePath: params.filePath,
        name: 'file',
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith('2')) {
            let errCode = res.data.code
            if (errCode == config.ERR_OK) {
              resolve(res.data.data)
            } else {
              this._showError(res.data.msg)
              reject
            }
          } else {
            let errCode = res.data.code
            this._showError(res.data.msg)
            reject(errCode)
          }
        },
        fail: (err) => {
          this._showErrorStatus(res.statusCode)
          reject
        }
      }
      wx.uploadFile(options)
    })
  }

  // 返回状态码错误文案
  _showError(errMsg) {
    wechat.showToast(errMsg)
  }

  //返回服务器异常报错文案
  _showErrorStatus(errCode) {
    if (!errCode) {
      errCode = 1
    }
    wechat.showToast(tips[errCode])
  }

  getToken() {
    const loginInfo = wx.getStorageSync('loginInfo')
    return loginInfo.ypToken
  }
}

export {
  HTTP
}
