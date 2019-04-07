//index.js
var app = getApp()
const common = require('../../utils/util.js')

Page({
  data: {
    m: 5,
    s: 0,
    all: 300,
    k: null,
    disable: 1,
    leftTransform: 'rotate(0deg)',
    rightTransform: 'rotate(180deg)',
    rightOpacity: 0,
    maskOpacity: 1,
    inputTaskName: ' ',
    flag: 0,//0休息1工作
    bcgImg: '',
    bcgImgList:[
      {
        src: '../../image/accomplishment-adventure-clear-sky-585825.jpg',
      },
      {
        src: '../../image/aerial-climate-cold-296559.jpg',
      },
      {
        src: '../../image/asphalt-blue-sky-clouds-490411.jpg',
      },
      {
        src: '../../image/backlit-dawn-dusk-327466.jpg',
      },
      {
        src: '../../image/beach-bird-birds-235787.jpg',
      },
      {
        src: '../../image/beautiful-cold-dawn-547115.jpg',
      },
    ]
  },
  
  changeProgess(){
    var n = this.data.all - (this.data.m * 60 + this.data.s);
    
    if(n <= this.data.all/2)
    {
      this.setData({
        leftTransform: 'rotate(' + 360/this.data.all * n + 'deg)',
        rightOpacity: 0,
        maskOpacity: 1
      })
    }
    else{
      this.setData({
        rightOpacity: 1,
        maskOpacity: 0,
        leftTransform: 'rotate(' + 180 + 'deg)',
        rightTransform: 'rotate(' + 360/this.data.all * n + 'deg)',
      })
    }
  },

  bindTaskName: function(e){
    this.setData({
      inputTaskName: e.detail.value
    })
  },

  freshTime(){
    if ((this.data.m <= 0) && (this.data.s <= 0)) {
      clearInterval(this.data.k)
      return
    }

    var mm = this.data.m
    var ss = this.data.s
    ss = ss - 1

    if (ss <= 0) {
      if (mm > 0) {
        mm = mm - 1
        ss = ss + 60
      }

    }

    if(ss == 60){
      ss = 0,
      mm = mm + 1
    }

    this.setData({
      m : mm,
      s : ss
    })

    this.changeProgess()
  },

  onReady: function(e){
    
  },

  onShow: function(e){
    var photoset = wx.getStorageSync('photo') || 0
    this.setData({
      bcgImg: this.data.bcgImgList[photoset]['src']
    })
  },

  workset: function(e){
    this.setData({
      m: app.globalData.work_m,
      s: 0,
      all: app.globalData.work_m * 60,
      k: setInterval(this.freshTime, 1000),
      disable: 0,
      flag: 1
    })
    var kk = wx.getStorageSync('record') || []
    kk.push(common.formatTime(new Date()) + ' 开始 工作')
    wx.setStorageSync('record', kk)
  },

  sleepset: function(e){
    this.setData({
      m: app.globalData.sleep_m,
      s: 0,
      all: app.globalData.sleep_m * 60,
      k: setInterval(this.freshTime, 1000),
      disable: 0,
      flag: 0
    })
    var kk = wx.getStorageSync('record') || []
    kk.push(common.formatTime(new Date()) + ' 开始 休息')
    wx.setStorageSync('record', kk)
  },

  complete: function(e){

    var kk = wx.getStorageSync('record') || []

    if(this.data.flag)
      kk.push(common.formatTime(new Date()) + ' 完成 工作')
    else
      kk.push(common.formatTime(new Date()) + ' 完成 休息')

    wx.setStorageSync('record', kk)

    this.setData({
      disable: 1,
      m: app.globalData.work_m,
      s: 0,
      all: app.globalData.work_m * 60,
      leftTransform: 'rotate(0deg)',
      rightTransform: 'rotate(180deg)',
      rightOpacity: 0,
      maskOpacity: 1,
      inputTaskName: ' ',
      flag: 0
    })
    clearInterval(this.data.k)
    
  }
 
})