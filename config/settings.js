export default {
  title: 'WTab', // 起始标题
  description: '展示各种信息的小组件工具',
  startUrl: '/', // 起始地址
  background: '', // 背景图
  favicon: '', // 网站图标
  theme: 'auto', // 默认主题
  color: '', // 主色调

  // 滚动方向
  scrollDirection: 'horizontal', // 滚动方向 vertical-垂直 horizontal-水平

  devices: {
    desktop: { layouts: [], icon: 'i-solar-monitor-bold' },
    tablet: { layouts: [], icon: 'i-solar-tablet-bold' },
    phone: { layouts: [], ticon: 'i-solar-smartphone-bold' },
  },

  baseSize: 74, // 卡片大小
  baseMargin: 18, // 卡片间距
  // breakpoints: { // 布局 key-4个最小卡片 value-屏幕分辨率
  //   4: 375,
  //   6: 558,
  //   8: 750,
  //   12: 1134,
  //   14: 1326,
  //   16: 1518,
  //   18: 1710,
  //   20: 1902,
  // },
  defaultLayout: {
    Desktop: [], // 桌面端布局
    Tablet: [], // 平板端布局
    Phone: [], // 手机端布局
  },
  // defaultLayout: [{ id: 'WidgetsExternalLink-M8GMq0oWyWSw03WguWbiT', widgetName: '外链1', updateTime: '', widgetSize: '1:1', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 0], 6: [0, 0], 8: [0, 0], 12: [0, 0], 14: [0, 0], 16: [0, 0], 18: [0, 0], 20: [0, 0] }, update: 1699775873333, component: 'externalLink' }, { id: 'WidgetsExternalLink-wMoF294lZmmLNJFi1vLRE', widgetName: '外链1', updateTime: '', widgetSize: '1:1', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [1, 0], 6: [1, 0], 8: [1, 0], 12: [1, 0], 14: [1, 0], 16: [1, 0], 18: [1, 0], 20: [1, 0] }, update: 1699775873505, component: 'externalLink' }, { id: 'WidgetsExternalLink-qr9v7QK2V6bP9yRnAHCg5', widgetName: '外链2', updateTime: '', widgetSize: '1:2', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [2, 0], 6: [2, 0], 8: [2, 0], 12: [2, 0], 14: [2, 0], 16: [2, 0], 18: [2, 0], 20: [2, 0] }, update: 1699775874689, component: 'externalLink' }, { id: 'WidgetsExternalLink-MKWY35EgBDBV1hGd-DOxh', widgetName: '外链3', updateTime: '', widgetSize: '2:1', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 1], 6: [3, 0], 8: [3, 0], 12: [3, 0], 14: [3, 0], 16: [3, 0], 18: [3, 0], 20: [3, 0] }, update: 1699775875771, component: 'externalLink' }, { id: 'WidgetsExternalLink-GUJjfvEOg8-GzGnO0ByxR', widgetName: '外链3', updateTime: '', widgetSize: '2:1', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 2], 6: [0, 1], 8: [5, 0], 12: [5, 0], 14: [5, 0], 16: [5, 0], 18: [5, 0], 20: [5, 0] }, update: 1699775875882, component: 'externalLink' }, { id: 'WidgetsExternalLink-IBCTzUdWK0Ny-koMUF3fO', widgetName: '外链4', updateTime: '', widgetSize: '3:2', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 3], 6: [3, 1], 8: [2, 2], 12: [7, 0], 14: [7, 0], 16: [7, 0], 18: [7, 0], 20: [7, 0] }, update: 1699775877397, component: 'externalLink' }, { id: 'WidgetsExternalLink-NZYKMIK1ZtZMtZY5qJ3d5', widgetName: '外链5', updateTime: '', widgetSize: '2:3', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 5], 6: [0, 2], 8: [0, 1], 12: [10, 0], 14: [10, 0], 16: [10, 0], 18: [10, 0], 20: [10, 0] }, update: 1699775878705, component: 'externalLink' }, { id: 'WidgetsExternalLink-i9T0cqNbCv6no80HpHXDZ', widgetName: '外链6', updateTime: '', widgetSize: '3:3', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 8], 6: [2, 3], 8: [5, 1], 12: [3, 1], 14: [3, 1], 16: [12, 0], 18: [12, 0], 20: [12, 0] }, update: 1699775879974, component: 'externalLink' }, { id: 'WidgetsExternalLink-XAI5k_qdIT8EjroucXDb8', widgetName: '外链7', updateTime: '', widgetSize: '4:3', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 11], 6: [0, 6], 8: [4, 4], 12: [6, 2], 14: [6, 2], 16: [3, 1], 18: [3, 1], 20: [15, 0] }, update: 1699775881128, component: 'externalLink' }, { id: 'WidgetsExternalLink-rR2YUa2frRRgNFAi4cpif', widgetName: '外链8', updateTime: '', widgetSize: '4:2', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [0, 14], 6: [0, 9], 8: [0, 4], 12: [0, 4], 14: [10, 3], 16: [7, 3], 18: [7, 3], 20: [3, 1] }, update: 1699775882513, component: 'externalLink' }, { id: 'WidgetsExternalLink-7ByMRPqzJ3bLAjWXIXfe3', widgetName: '外链1', updateTime: '', widgetSize: '1:1', widgetData: { protocol: '', src: '', bgColor: '', iconType: 'online', onlineIcon: '', pureIcon: '', localIcon: '' }, position: { 4: [3, 0], 6: [5, 0], 8: [7, 0], 12: [0, 1], 14: [12, 0], 16: [15, 0], 18: [15, 0], 20: [19, 0] }, update: 1699775884486, component: 'externalLink' }],
}
