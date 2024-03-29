export default {
  title: 'WTab', // 起始标题
  description: '展示各种信息的小组件工具',
  startUrl: '/', // 起始地址
  background: '', // 背景图
  favicon: '', // 网站图标
  theme: 'auto', // 默认主题
  color: '', // 主色调

  app: {
    headerConstant: false, // 头部是否透明
  },

  layout: {
    breakpoints: { // 布局 key-4个最小卡片 value-屏幕分辨率
      4: 366,
      6: 558,
      8: 750,
      10: 1134,
    },
    baseSize: 74, // 卡片大小
    baseMargin: 18, // 卡片间距
    defaultLayout: [
      {
        "id": "date-dQpK3-WvyDchPAuxxkR6u",
        "widgetData": {
          "size": ":2",
          "singleRow": true
        },
        "shadow": false,
        "widgetSize": ":2",
        "position": {
          "4": [
            0,
            0
          ],
          "6": [
            0,
            0
          ],
          "8": [
            0,
            0
          ],
          "10": [
            0,
            0
          ]
        },
        "update": 1710664459997,
        "component": "date"
      }
    ],
  },
}
