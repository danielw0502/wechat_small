// pages/setting/setting.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgshow: false,
    bcgImg: '',
    bcgImgIndex: 0,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var photoset = wx.getStorageSync('photo') || 0
    this.setData({
      bcgImgIndex: photoset,
      bcgImg: this.data.bcgImgList[photoset]['src']
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  worktimechange: function(e){
    app.globalData.work_m = e.detail.value
  },

  sleeptimechange: function(e){
    app.globalData.sleep_m = e.detail.value
  },

  showbg: function(e){
    this.setData({
      bgshow: true
    })
  },

  setBcgImg(index) {
    if (index !== undefined) {
      this.setData({
        bcgImgIndex: index,
        bcgImg: this.data.bcgImgList[index].src,
      })
      return
    }
  },

  chooseBcg: function(e){
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    this.setBcgImg(index)
    wx.setStorage({
      key: 'photo',
      data: index,
    })
  },

  hidebg(){
    this.setData({
      bgshow: false
    })
  }

})