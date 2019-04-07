// pages/record/record.js
const common = require('../../utils/util.js')
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    kk: []
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      kk: wx.getStorageSync('record') || []
    })
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

  clearrecord: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除记录吗',
      success(res) {
        if (res.confirm) {
          console.log('111')
          wx.clearStorageSync({
            success: function(res){
              that.setData({
                kk: []
              })
            }
          })
          that.onShow()
        } else if (res.cancel) {
        }
      }
    })
    
  },

  

})