import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { User } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import storage from '@/utils/storage'
import './index.scss'

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    const userInfo = storage.getSync<User>(STORAGE_KEYS.USER_INFO)
    if (userInfo) {
      setUser(userInfo)
    } else {
      // 如果没有用户信息，跳转到登录页
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }

  const handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  const handleMessages = () => {
    Taro.navigateTo({
      url: '/pages/messages/index'
    })
  }

  const handlePointsDetail = () => {
    Taro.navigateTo({
      url: '/pages/points-detail/index'
    })
  }

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  const handleFeedback = () => {
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  const handleAbout = () => {
    Taro.showModal({
      title: '关于我们',
      content: '智能垃圾回收小程序 v1.0.0\n致力于让垃圾分类变得更简单、更有趣',
      showCancel: false
    })
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '确认退出',
      content: '退出登录后需要重新登录才能使用',
      success: (res) => {
        if (res.confirm) {
          storage.removeSync(STORAGE_KEYS.TOKEN)
          storage.removeSync(STORAGE_KEYS.USER_INFO)
          setUser(null)
          Taro.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }

  if (!user) {
    return (
      <View className="page profile-page">
        <View className="login-prompt">
          <Image 
            className="login-image"
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200"
          />
          <Text className="login-title">登录后享受更多服务</Text>
          <Text className="login-desc">记录回收历史，赚取积分奖励</Text>
          <View className="login-btn btn btn-primary" onClick={handleLogin}>
            <Text>立即登录</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="page profile-page">
      {/* 用户信息头部 */}
      <View className="profile-header">
        <View className="user-info">
          <Image className="avatar" src={user.avatar} />
          <View className="info">
            <Text className="nickname">{user.nickname}</Text>
            <Text className="phone">{user.phone}</Text>
            <View className="level-badge">
              <Text className="level-text">{user.level}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 数据统计 */}
      <View className="stats-section card">
        <View className="stats-row">
          <View className="stat-item" onClick={handlePointsDetail}>
            <Text className="stat-number">{user.points}</Text>
            <Text className="stat-label">我的积分</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">{user.totalRecycles}</Text>
            <Text className="stat-label">回收次数</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">12</Text>
            <Text className="stat-label">今日排名</Text>
          </View>
        </View>
      </View>

      {/* 功能菜单 */}
      <View className="menu-section card">
        <View className="menu-item" onClick={handleMessages}>
          <View className="menu-icon">📮</View>
          <Text className="menu-text">消息通知</Text>
          <View className="menu-arrow">›</View>
        </View>
        
        <View className="menu-item" onClick={handlePointsDetail}>
          <View className="menu-icon">💎</View>
          <Text className="menu-text">积分明细</Text>
          <View className="menu-arrow">›</View>
        </View>

        <View className="menu-item">
          <View className="menu-icon">🏆</View>
          <Text className="menu-text">我的成就</Text>
          <View className="menu-arrow">›</View>
        </View>

        <View className="menu-item">
          <View className="menu-icon">📱</View>
          <Text className="menu-text">我的设备</Text>
          <View className="menu-arrow">›</View>
        </View>
      </View>

      {/* 其他功能 */}
      <View className="menu-section card">
        <View className="menu-item" onClick={handleShare}>
          <View className="menu-icon">📤</View>
          <Text className="menu-text">邀请好友</Text>
          <View className="menu-arrow">›</View>
        </View>

        <View className="menu-item" onClick={handleFeedback}>
          <View className="menu-icon">💬</View>
          <Text className="menu-text">意见反馈</Text>
          <View className="menu-arrow">›</View>
        </View>

        <View className="menu-item" onClick={handleAbout}>
          <View className="menu-icon">ℹ️</View>
          <Text className="menu-text">关于我们</Text>
          <View className="menu-arrow">›</View>
        </View>
      </View>

      {/* 环保成就 */}
      <View className="achievement-section card">
        <Text className="section-title">我的环保成就</Text>
        <View className="achievement-grid">
          <View className="achievement-item">
            <View className="achievement-icon">🌱</View>
            <Text className="achievement-text">环保新手</Text>
          </View>
          <View className="achievement-item">
            <View className="achievement-icon">🏆</View>
            <Text className="achievement-text">回收达人</Text>
          </View>
          <View className="achievement-item">
            <View className="achievement-icon">🌟</View>
            <Text className="achievement-text">积分之星</Text>
          </View>
        </View>
      </View>

      {/* 退出登录 */}
      <View className="logout-section">
        <View className="logout-btn" onClick={handleLogout}>
          <Text>退出登录</Text>
        </View>
      </View>
    </View>
  )
}

export default Profile