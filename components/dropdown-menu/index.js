// components/dropdown-menu/index.js
Component({
  properties: {
    dropDownMenuData: Array,

  },

  data: {
    open: [], // open一维数组保存着子菜单开合与激活状态
    highlight: [], // highlight二维数组保存着子菜单的点选index值
    isMasked: false, // 是否需要遮罩
    naviIndex: -1, // 选中的标题下标
  },

  ready: function() {
    this.initMenu();
    this.initHighlight();
  },

  methods: {
    initMenu: function() {
      var open = this.data.dropDownMenuData.map(() => {
        return false;
      });
      this.setData({
        open: open,
        isMasked: false,
        naviIndex: -1
      })
    },

    initHighlight: function() {
      // 二级菜单选中高亮
      var highlight = this.data.dropDownMenuData.map((item) => {
        return item.options.map(sub => {
          return '';
        });
      });
      this.setData({
        highlight: highlight
      });
    },



    dropDown: function(e) {
      var index = e.currentTarget.dataset.nav;
      var open = this.data.open;
      var isMasked = this.data.isMasked;
      var naviIndex = this.data.naviIndex;
      for (var i = 0; i < this.data.dropDownMenuData.length; i++) {
        if (i == index) {
          open[index] = !open[index];
          isMasked = open[index];
          naviIndex = isMasked ? index : -1;
        } else {
          open[i] = false;
        }
      }
      this.setData({
        open: open,
        isMasked: isMasked,
        naviIndex: naviIndex
      });
    },

    hideBackground: function(e) {
      this.initMenu();
    },

    subMenuTapped: function(e) {
      var naviIndex = e.currentTarget.dataset.naviIndex;
      var optionIndex = e.currentTarget.dataset.optionIndex;
      var dropDownMenuData = this.data.dropDownMenuData;
      var highlight = this.data.highlight;

      var choice = dropDownMenuData[naviIndex].options[optionIndex];
      dropDownMenuData[naviIndex].title = choice;
      // console.log('选择了dropDownMenuData[' + naviIndex + '][' + optionIndex + ']: ' + choice);

      highlight[naviIndex] = highlight[naviIndex].map(item => {
        return '';
      });
      highlight[naviIndex][optionIndex] = 'highlight';
      // console.log(highlight);

      this.setData({
        dropDownMenuData: dropDownMenuData,
        highlight: highlight
      });
      this.initMenu();

      // detail对象，提供给事件监听函数
      var myEventDetail = {
        'titleIdx': naviIndex,
        'optionIdx': optionIndex
      }
      // 触发事件的选项
      var myEventOption = {}
      this.triggerEvent('selection', myEventDetail, myEventOption)
    }
  }
})