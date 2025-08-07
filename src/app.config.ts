export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/recycle/index",
    "pages/points/index",
    "pages/profile/index",
    "pages/scan/index",
    "pages/map/index",
    "pages/points-detail/index",
    "pages/exchange/index",
    "pages/ranking/index",
    "pages/login/index",
    "pages/messages/index",
  ],
  tabBar: {
    color: "#999999",
    selectedColor: "#22C55E",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home-active.png",
        text: "首页",
      },
      {
        pagePath: "pages/recycle/index",
        iconPath: "assets/icons/recycle.png",
        selectedIconPath: "assets/icons/recycle-active.png",
        text: "回收",
      },
      {
        pagePath: "pages/points/index",
        iconPath: "assets/icons/points.png",
        selectedIconPath: "assets/icons/points-active.png",
        text: "积分",
      },
      {
        pagePath: "pages/profile/index",
        iconPath: "assets/icons/profile.png",
        selectedIconPath: "assets/icons/profile-active.png",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#22C55E",
    navigationBarTitleText: "智能垃圾回收",
    navigationBarTextStyle: "white",
    backgroundColor: "#f5f5f5",
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于定位附近的回收箱",
    },
  },
});

function defineAppConfig(config: any) {
  return config;
}
