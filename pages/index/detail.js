// pages/index/detail.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: {},
    restaurant: {},
    reviews: [],
    ratings: [1, 2, 3, 4, 5],
    rating: 'None',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });

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
  createReview: function(e) {
    console.log('create review', e);
    const content = e.detail.value.content;

    let Reviews = new wx.BaaS.TableObject('reviews');

    let newReview = Reviews.create();

    const data = {
      restaurant_id: this.data.restaurant.id,
      rating: this.data.rating,
      content: content,
    }

    newReview.set(data);

    newReview.save().then((res) => {
      console.log('save res', res);

      // since you can't push to an array in the
      // page data, we have to save the array
      // and then push the new item and re-set
      // the data.
      const newReviews = this.data.reviews;

      newReviews.push(res.data);

      this.setData({
        reviews: newReviews,
      })
    })
  },
  onRate: function(e) {
    console.log('change rating', e);
    const index = e.detail.value;
    this.setData({
      rating: this.data.ratings[index],
    })
  },
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        app.globalData.userInfo = user;
        this.setData({
          currentUser: user,
        })
      }, err => {

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