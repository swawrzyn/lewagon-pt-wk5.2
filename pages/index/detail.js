// pages/index/detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    restaurant: {},
    reviews: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('userInfo!', getApp().globalData.userInfo);
    const Restaurants = new wx.BaaS.TableObject('restaurants');
    const Reviews = new wx.BaaS.TableObject('reviews');

    Restaurants.get(options.id).then((res) => {
      this.setData({
        restaurant: res.data,
      })
    });

    let query = new wx.BaaS.Query();

    query.compare('restaurant_id', '=', options.id);

    Reviews.setQuery(query).find().then((res) =>{
      this.setData({
        reviews: res.data.objects,
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})