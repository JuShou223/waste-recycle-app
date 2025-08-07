// import { Component } from "react";
import { View, Text, Image } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro";
import { Grid, Card } from "@nutui/nutui-react-taro";
import "./index.scss";

export default function Index() {
  const gridData = [
    {
      text: "扫码回收",
      icon: "📱",
      path: "/pages/scan/index",
    },
    {
      text: "附近回收箱",
      icon: "🗺️",
      path: "/pages/map/index",
    },
    {
      text: "垃圾分类",
      icon: "🗂️",
      path: "/pages/classification/index",
    },
    {
      text: "积分兑换",
      icon: "🎁",
      path: "/pages/exchange/index",
    },
  ];

  const handleGridClick = (path: string) => {
    navigateTo({ url: path });
  };

  return (
    <View className="index-container">
      {/* Header Section */}
      <View className="header-section">
        <View className="user-info">
          <Image
            className="avatar"
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            mode="aspectFill"
          />
          <View className="user-details">
            <Text className="username">环保达人</Text>
            <Text className="user-points">当前积分: 1,250</Text>
          </View>
        </View>

        <View className="stats-row">
          <View className="stat-item">
            <Text className="stat-number">28</Text>
            <Text className="stat-label">本月回收</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">3.2kg</Text>
            <Text className="stat-label">累计重量</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">15</Text>
            <Text className="stat-label">环保排名</Text>
          </View>
        </View>
      </View>

      {/* Notice */}
      <View className="notice-section">
        {/* <Notice
          content='🎉 积分双倍活动进行中，快来参与回收吧！'
          color='#52c41a'
          background='#f6ffed'
          leftIcon='https://img10.360buyimg.com/imagetools/jfs/t1/72048/40/2998/1194/5d0a3c84E5c52f7e2/d70f4353b6b43e19.png'
        /> */}
      </View>

      {/* Quick Actions */}
      <Card className="quick-actions">
        <View className="card-title">快速操作</View>
        <Grid>
          {gridData.map((item, index) => (
            <Grid.Item key={index} onClick={() => handleGridClick(item.path)}>
              <View className="grid-item">
                <Text className="grid-icon">{item.icon}</Text>
                <Text className="grid-text">{item.text}</Text>
              </View>
            </Grid.Item>
          ))}
        </Grid>
      </Card>

      {/* Recent Activities */}
      <Card className="recent-activities">
        <View className="card-title">最近活动</View>
        <View className="activity-list">
          <View className="activity-item">
            <View className="activity-icon success">✓</View>
            <View className="activity-content">
              <Text className="activity-text">投递纸类垃圾 0.8kg</Text>
              <Text className="activity-time">2小时前</Text>
            </View>
            <Text className="activity-points">+20分</Text>
          </View>
          <View className="activity-item">
            <View className="activity-icon success">✓</View>
            <View className="activity-content">
              <Text className="activity-text">投递塑料瓶 0.3kg</Text>
              <Text className="activity-time">1天前</Text>
            </View>
            <Text className="activity-points">+15分</Text>
          </View>
          <View className="activity-item">
            <View className="activity-icon warning">!</View>
            <View className="activity-content">
              <Text className="activity-text">回收箱已满，请选择其他位置</Text>
              <Text className="activity-time">2天前</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}
