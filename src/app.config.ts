export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/recycle/index',
    'pages/points/index',
    'pages/profile/index',
    'pages/messages/index',
    'pages/map/index',
    'pages/scan/index',
    'pages/classification/index',
    'pages/exchange/index',
    'pages/ranking/index',
    'pages/login/index',
    'pages/history/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#52c41a',
    navigationBarTitleText: '智能回收',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#52c41a',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/recycle/index',
        text: '回收',
        iconPath: 'assets/icons/recycle.png',
        selectedIconPath: 'assets/icons/recycle-active.png'
      },
      {
        pagePath: 'pages/points/index',
        text: '积分',
        iconPath: 'assets/icons/points.png',
        selectedIconPath: 'assets/icons/points-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  }
})

function defineAppConfig(config: any) {
  return config
}