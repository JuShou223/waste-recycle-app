import React, { useState } from 'react'
import { View, Text, Camera } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const Scan: React.FC = () => {
  const [scanning, setScanning] = useState(true)

  const handleScan = () => {
    Taro.scanCode({
      success: (res) => {
        console.log('扫码结果:', res)
        handleScanResult(res.result)
      },
      fail: (err) => {
        console.error('扫码失败:', err)
        Taro.showToast({
          title: '扫码失败，请重试',
          icon: 'error'
        })
      }
    })
  }

  const handleScanResult = (code: string) => {
    // 解析二维码内容
    if (code.startsWith('recycle_box_')) {
      const boxId = code.replace('recycle_box_', '')
      openRecycleBox(boxId)
    } else {
      Taro.showToast({
        title: '无效的回收箱二维码',
        icon: 'error'
      })
    }
  }

  const openRecycleBox = (boxId: string) => {
    Taro.showLoading({ title: '正在开启回收箱...' })
    
    // 模拟开箱过程
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showModal({
        title: '回收箱已开启',
        content: '请投入您的垃圾，投递完成后回收箱会自动称重并记录积分。',
        confirmText: '已投递完成',
        cancelText: '取消投递',
        success: (res) => {
          if (res.confirm) {
            processRecycle(boxId)
          }
        }
      })
    }, 2000)
  }

  const processRecycle = (boxId: string) => {
    Taro.showLoading({ title: '正在称重...' })
    
    // 模拟称重过程
    setTimeout(() => {
      Taro.hideLoading()
      const weight = (Math.random() * 5 + 0.5).toFixed(1) // 随机生成重量
      const points = Math.floor(parseFloat(weight) * 10) // 计算积分
      
      Taro.showModal({
        title: '投递成功！',
        content: `本次投递重量：${weight}kg\n获得积分：${points}分\n感谢您为环保事业做出的贡献！`,
        showCancel: false,
        confirmText: '查看积分',
        success: () => {
          Taro.switchTab({
            url: '/pages/points/index'
          })
        }
      })
    }, 3000)
  }

  return (
    <View className="page scan-page">
      <View className="scan-header">
        <Text className="scan-title">扫码回收</Text>
        <Text className="scan-desc">对准回收箱上的二维码进行扫描</Text>
      </View>

      <View className="scan-container">
        <View className="scan-frame">
          <View className="scan-corner tl"></View>
          <View className="scan-corner tr"></View>
          <View className="scan-corner bl"></View>
          <View className="scan-corner br"></View>
          <View className="scan-line"></View>
        </View>
        
        <View className="scan-btn" onClick={handleScan}>
          <View className="scan-icon">📷</View>
          <Text className="scan-text">点击扫码</Text>
        </View>
      </View>

      <View className="tips-section">
        <Text className="tips-title">使用说明</Text>
        <View className="tips-list">
          <View className="tip-item">
            <View className="tip-number">1</View>
            <Text className="tip-text">找到附近的智能回收箱</Text>
          </View>
          <View className="tip-item">
            <View className="tip-number">2</View>
            <Text className="tip-text">扫描回收箱上的二维码</Text>
          </View>
          <View className="tip-item">
            <View className="tip-number">3</View>
            <Text className="tip-text">按照分类要求投入垃圾</Text>
          </View>
          <View className="tip-item">
            <View className="tip-number">4</View>
            <Text className="tip-text">系统自动称重并奖励积分</Text>
          </View>
        </View>
      </View>

      <View className="quick-actions card">
        <Text className="actions-title">快捷操作</Text>
        <View className="actions-grid">
          <View className="action-item">
            <View className="action-icon">🗺️</View>
            <Text className="action-text">查找回收箱</Text>
          </View>
          <View className="action-item">
            <View className="action-icon">📖</View>
            <Text className="action-text">分类指引</Text>
          </View>
          <View className="action-item">
            <View className="action-icon">💎</View>
            <Text className="action-text">我的积分</Text>
          </View>
          <View className="action-item">
            <View className="action-icon">📊</View>
            <Text className="action-text">回收记录</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Scan