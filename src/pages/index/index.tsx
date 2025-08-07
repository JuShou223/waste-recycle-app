import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { User, RecycleRecord } from "@/types";
import { STORAGE_KEYS } from "@/constants";
import storage from "@/utils/storage";
import "./index.scss";

const Index: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recentRecords, setRecentRecords] = useState<RecycleRecord[]>([]);
  const [todayPoints, setTodayPoints] = useState(0);

  useEffect(() => {
    loadUserInfo();
    loadRecentData();
  }, []);

  const loadUserInfo = async () => {
    const userInfo = storage.getSync<User>(STORAGE_KEYS.USER_INFO);
    if (userInfo) {
      setUser(userInfo);
    }
  };

  const loadRecentData = async () => {
    // 模拟加载最近数据
    setRecentRecords([
      {
        id: "1",
        boxId: "box001",
        boxName: "小区A栋回收箱",
        category: {
          id: "1",
          name: "可回收垃圾",
          color: "#3B82F6",
          icon: "recycle",
          description: "",
          examples: [],
        },
        weight: 2.5,
        points: 25,
        createTime: "2025-01-11 14:30",
        status: "success",
      },
    ]);
    setTodayPoints(25);
  };

  const handleScan = () => {
    Taro.navigateTo({
      url: "/pages/scan/index",
    });
  };

  const handleMapView = () => {
    Taro.navigateTo({
      url: "/pages/map/index",
    });
  };

  const handlePointsDetail = () => {
    Taro.switchTab({
      url: "/pages/points/index",
    });
  };

  return (
    <View className="page index-page">
      {/* 用户信息卡片 */}
      <View className="user-card">
        <View className="user-info">
          <Image
            className="avatar"
            src={
              user?.avatar ||
              "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100"
            }
          />
          <View className="info">
            <Text className="nickname">{user?.nickname || "环保达人"}</Text>
            <Text className="level">环保专家 · {user?.points || 1250}积分</Text>
          </View>
        </View>
        <View className="today-points">
          <Text className="points-num">+{todayPoints}</Text>
          <Text className="points-label">今日积分</Text>
        </View>
      </View>

      {/* 快捷功能 */}
      <View className="quick-actions card">
        <View className="action-item" onClick={handleScan}>
          <View className="action-icon scan">📷</View>
          <Text className="action-text">扫码回收</Text>
        </View>
        <View className="action-item" onClick={handleMapView}>
          <View className="action-icon map">🗺️</View>
          <Text className="action-text">查找回收箱</Text>
        </View>
        <View className="action-item" onClick={handlePointsDetail}>
          <View className="action-icon points">💎</View>
          <Text className="action-text">积分明细</Text>
        </View>
        <View className="action-item">
          <View className="action-icon guide">📖</View>
          <Text className="action-text">分类指引</Text>
        </View>
      </View>

      {/* 今日统计 */}
      <View className="stats-section">
        <Text className="section-title">今日统计</Text>
        <View className="stats-grid">
          <View className="stat-item">
            <Text className="stat-number">3</Text>
            <Text className="stat-label">投递次数</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">5.2kg</Text>
            <Text className="stat-label">回收重量</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">25</Text>
            <Text className="stat-label">获得积分</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">12</Text>
            <Text className="stat-label">排名</Text>
          </View>
        </View>
      </View>

      {/* 最近记录 */}
      <View className="recent-section">
        <Text className="section-title">最近记录</Text>
        <View className="records-list">
          {recentRecords.map((record) => (
            <View key={record.id} className="record-item">
              <View className="record-info">
                <Text className="record-title">{record.boxName}</Text>
                <Text className="record-detail">
                  {record.category.name} · {record.weight}kg
                </Text>
                <Text className="record-time">{record.createTime}</Text>
              </View>
              <Text className="record-points">+{record.points}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 环保提示 */}
      <View className="tip-card card">
        <View className="tip-icon">🌱</View>
        <View className="tip-content">
          <Text className="tip-title">环保小贴士</Text>
          <Text className="tip-text">
            每回收1kg废纸，可以拯救17棵树！让我们一起守护地球家园。
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
