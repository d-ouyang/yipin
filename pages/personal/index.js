const wechat = require('../../utils/wechat.js')
import { PersonalModel } from '../../models/Personal.js'
const personal = new PersonalModel()

// 录音配置项
const recordOptions = {
  duration: 60000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isRecording: false, //是否正在录音
    isPlaying: false, //是否正在播放
    recordIsOver: false, //是否录音完成
    tempFilePath: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 定义录音类
    const recorderManager = wx.getRecorderManager();
    this.recorderManager = recorderManager;
    // 定义播放类
    const innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext = innerAudioContext;

    this.getUptoken()
  },

  /**
   * 获取uptoken
   */
  getUptoken: function() {
    personal.getUptoken().then(res => {
      console.log(res)
    }).catch(err => {
      throw 'get uptoken error'
    })
  },

  /**
   * 开始录音
   */
  startRecord: function (e) {
    console.log(e);
    if (this.data.isPlaying) {
      this.setData({
        isPlaying: false
      })
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.record"]) { //已授权
          this.recorderManager.start(recordOptions);
          this.recorderManager.onStart(() => {
            this.setData({
              isRecording: true,
            })
          });
          this.recorderManager.onError((res) => {
            console.log(res);
            wx.showModal({
              title: '录音失败',
              content: '可能录音时间过短或录音姿势不对',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          })
        }
      }
    })
  },

  /**
   * 结束录音
   */
  stopRecord: function () {
    setTimeout(function () {
      this.recorderManager.stop();
      this.recorderManager.onStop((res) => {
        if (res.duration <= 900) {
          wx.showModal({
            title: '录音失败',
            content: '可能录音时间过短或录音姿势不对',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else {
          this.setData({
            tempFilePath: res.tempFilePath,
            recordIsOver: true
          })
        }
        console.log(res);
        this.setData({
          isRecording: false
        })
      })
    }.bind(this), 300)
  },

  /**
   * 播放录音
   */
  playVoice: function () {
    this.innerAudioContext.src = this.data.tempFilePath;
    this.innerAudioContext.play();
    this.innerAudioContext.onPlay(() => {
      this.setData({
        isPlaying: true
      })
    });
    this.innerAudioContext.onError((res) => {
      wx.showToast({
        title: '播放失败',
        image: '../../image/fail.png',
        duration: 1200,
        complete: () => {
          this.setData({
            isPlaying: false
          })
        }
      })
    })
    this.innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false
      })
    })
  },

  /**
   * 暂停播放录音
   */
  stopVoice: function () {
    this.innerAudioContext.pause();
    this.innerAudioContext.onPause(() => {
      this.setData({
        isPlaying: false
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wechat.setNavigationBarTitle('个人中心')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  }
})