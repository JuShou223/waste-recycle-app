import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { PointsRecord } from '@/types'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import './index.scss'

const Points: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState(1250)
  const [records, setRecords] = useState<PointsRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    loadPointsData()
  }, [])

  const loadPointsData = async () => {
    setLoading(true)
    try {
      // 模拟加载积分记录
      setTimeout(() => {
        setRecords([
          {
            id: '1',
            type: 'earn',
            amount: 25,
            source: 'recycle',
            description: '投递可回收垃圾获得积分',
            createTime: '2025-01-11 14:30'
          },
          {
            id: '2',
            type: 'earn',
            amount: 30,
            source: 'recycle',
            description: '投递有害垃圾获得积分',
            createTime: '2025-01-11 10:15'
          },
          {
            id: '3',
            type: 'spend',
            amount: 100,
            source: 'exchange',
            description: '兑换10元现金红包',
            createTime: '2025-01-10 16:20'
          },
          {
            id: '4',
            type: 'earn',
            amount: 50,
            source: 'activity',
            description: '参与环保活动获得奖励',
            createTime: '2025-01-10 09:30'
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleExchange = () => {
    Taro.navigateTo({
      url: '/pages/exchange/index'
    })
  }

  const handleRanking = () => {
    Taro.navigateTo({
      url: '/pages/ranking/index'
    })
  }

  const filteredRecords = records.filter(record => {
    if (activeTab === 'all') return true
    return record.type === activeTab
  })

  return (
    <View className="page points-page">
      {/* 积分总览 */}
      <View className="points-header">
        <View className="points-card">
          <Text className="points-title">我的积分</Text>
          <Text className="points-amount">{totalPoints}</Text>
          <Text className="points-desc">可兑换现金红包和精美礼品</Text>
        </View>
        
        <View className="actions-row">
          <View className="action-btn primary" onClick={handleExchange}>
            <Text className="btn-text">兑换商品</Text>
          </View>
          <View className="action-btn outline" onClick={handleRanking}>
            <Text className="btn-text">查看排行</Text>
          </View>
        </View>
      </View>

      {/* 积分统计 */}
      <View className="stats-section card">
        <Text className="section-title">本月统计</Text>
        <View className="stats-grid">
          <View className="stat-item">
            <Text className="stat-number">385</Text>
            <Text className="stat-label">获得积分</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">200</Text>
            <Text className="stat-label">消费积分</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">12</Text>
            <Text className="stat-label">投递次数</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">3</Text>
            <Text className="stat-label">兑换次数</Text>
          </View>
        </View>
      </View>

      {/* 积分记录 */}
      <View className="records-section">
        <View className="records-header">
          <Text className="section-title">积分明细</Text>
        </View>
        
        <View className="tabs">
          <View 
            className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Text>全部</Text>
          </View>
          <View 
            className={`tab-item ${activeTab === 'earn' ? 'active' : ''}`}
            onClick={() => setActiveTab('earn')}
          >
            <Text>收入</Text>
          </View>
          <View 
            className={`tab-item ${activeTab === 'spend' ? 'active' : ''}`}
            onClick={() => setActiveTab('spend')}
          >
            <Text>支出</Text>
          </View>
        </View>

        <View className="records-list card">
          {loading ? (
            <Loading text="加载中..." />
          ) : filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <View key={record.id} className="record-item">
                <View className="record-info">
                  <Text className="record-desc">{record.description}</Text>
                  <Text className="record-time">{record.createTime}</Text>
                </View>
                <Text className={`record-amount ${record.type}`}>
                  {record.type === 'earn' ? '+' : '-'}{record.amount}
                </Text>
              </View>
            ))
          ) : (
            <Empty
              title="暂无积分记录"
              description="赶快去回收垃圾赚取积分吧！"
            />
          )}
        </View>
      </View>

      {/* 积分规则 */}
      <View className="rules-section card">
        <Text className="section-title">积分规则</Text>
        <View className="rules-list">
          <View className="rule-item">
            <View className="rule-icon earn">+</View>
            <View className="rule-content">
              <Text className="rule-title">投递垃圾</Text>
              <Text className="rule-desc">每投递1kg垃圾获得10积分</Text>
            </View>
          </View>
          <View className="rule-item">
            <View className="rule-icon earn">+</View>
            <View className="rule-content">
              <Text className="rule-title">分享好友</Text>
              <Text className="rule-desc">成功邀请好友注册获得50积分</Text>
            </View>
          </View>
          <View className="rule-item">
            <View className="rule-icon earn">+</View>
            <View className="rule-content">
              <Text className="rule-title">活动奖励</Text>
              <Text className="rule-desc">参与官方活动获得额外积分</Text>
            </View>
          </View>
          <View className="rule-item">
            <View className="rule-icon spend">-</View>
            <View className="rule-content">
              <Text className="rule-title">兑换商品</Text>
              <Text className="rule-desc">使用积分兑换现金和礼品</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Points