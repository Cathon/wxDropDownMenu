Page({
  data: {
    dropDownMenuData: [
      { "title": "菜单一", "options": ["菜单一选项一", "菜单一选项二", "菜单一选项三"] },
      { "title": "菜单二", "options": ["菜单二选项一", "菜单二选项二", "菜单二选项三", "菜单二选项四"] },
    ],
  },

  onLoad: function () {

  },

  onMenuSelection: function (e) {
    let titleIdx = e.detail.titleIdx
    let optionIdx = e.detail.optionIdx
    let selectedOption = this.data.dropDownMenuData[titleIdx].options[optionIdx]
    wx.showToast({
      title: selectedOption,
    })
  }
})
