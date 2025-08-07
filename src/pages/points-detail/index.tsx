import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { PointsRecord } from '@/types'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import './index.scss'

const PointsDetail: React.FC = () => {
  const [records, setRecords] = useState<PointsRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [totalPoints] = useState(1250)

  useEffect(() => {
    loadPointsRecords()
  }, [])

  const loadPointsRecords = async () => {
    setLoading(true)
    try {
      // 模拟加载积分明细
      setTimeout(() => {
        const mockRecords: PointsRecord[] = [
          {
            id: '1',
            type: 'earn',
            amount: 25,
            source: 'recycle',
            description: '小区A栋回收箱投递垃圾',
            createTime: '2025-01-11 14:30'
          },
          {
            id: '2',
            type: 'earn',
            amount: 30,
            source: 'recycle',
            description: '商业广场回收站投递垃圾',
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
            description: '参与周末环保活动奖励',
            createTime: '2025-01-10 09:30'
          },
          {
            id: '5',
            type: 'earn',
            amount: 20,
            source: 'recycle',
            description: '公园入口回收箱投递垃圾',
            createTime: '2025-01-09 18:45'
          },
          {
            id: '6',
            type: 'spend',
            amount: 50,
            source: 'exchange',
            description: '兑换星巴克咖啡券',
            createTime: '2025-01-09 14:20'
          },
          {
            id: '7',
            type: 'earn',
            amount: 100,
            source: 'signup',
            description: '新用户注册奖励',
            createTime: '2025-01-08 12:00'
          },
          {
            id: '8',
            type: 'earn',
            amount: 15,
            source: 'recycle',
            description: '小区B栋回收箱投递垃圾',
            createTime: '2025-01-08 08:30'
          }
        ]
        setRecords(mockRecords)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  const getSourceText = (source: string) => {
    switch (source) {
      case 'recycle':
        return '垃圾回收'
      case 'activity':
        return '活动奖励'
      case 'signup':
        return '注册奖励'
      case 'share':
        return '分享奖励'
      case 'exchange':
        return '积分兑换'
      default:
        return '其他'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'recycle':
        return '♻️'
      case 'activity':
        return '🎯'
      case 'signup':
        return '🎁'
      case 'share':
        return '📤'
      case 'exchange':
        return '🛒'
      default:
        return '💰'
    }
  }

  const filteredRecords = records.filter(record => {
    if (activeTab === 'all') return true
    return record.type === activeTab
  })

  // 计算统计数据
  const earnedPoints = records
    .filter(r => r.type === 'earn')
    .reduce((sum, r) => sum + r.amount, 0)
  
  const spentPoints = records
    .filter(r => r.type === 'spend')
    .reduce((sum, r) => sum + r.amount, 0)

  const tabs = [
    { key: 'all', name: '全部' },
    { key: 'earn', name: '收入' },
    { key: 'spend', name: '支出' }
  ]

  return (
    <View className="page points-detail-page">
      {/* 积分概览 */}
      <View className="points-overview card">
        <View className="overview-header">
          <Text className="overview-title">积分概览</Text>
          <Text className="current-points">{totalPoints}</Text>
        </View>
        
        <View className="stats-row">
          <View className="stat-item">
            <Text className="stat-number">+{earnedPoints}</Text>
            <Text className="stat-label">累计获得</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">-{spentPoints}</Text>
            <Text className="stat-label">累计消费</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">{records.length}</Text>
            <Text className="stat-label">总记录数</Text>
          </View>
        </View>
      </View>

      {/* 筛选标签 */}
      <View className="filter-tabs card">
        {tabs.map((tab) => (
          <View
            key={tab.key}
            className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.name}</Text>
          </View>
        ))}
      </View>

      {/* 积分记录列表 */}
      <View className="records-section">
        {loading ? (
          <Loading text="加载中..." />
        ) : filteredRecords.length > 0 ? (
          <View className="records-list card">
            {filteredRecords.map((record) => (
              <View key={record.id} className="record-item">
                <View className="record-icon">
                  {getSourceIcon(record.source)}
                </View>
                
                <View className="record-content">
                  <View className="record-header">
                    <Text className="record-title">{record.description}</Text>
                    <Text className={`record-amount ${record.type}`}>
                      {record.type === 'earn' ? '+' : '-'}{record.amount}
                    </Text>
                  </View>
                  
                  <View className="record-meta">
                    <Text className="record-source">{getSourceText(record.source)}</Text>
                    <Text className="record-time">{record.createTime}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Empty
            title="暂无记录"
            description="还没有积分收支记录哦"
          />
        )}
      </View>

      {/* 积分趋势 */}
      <View className="trend-section card">
        <Text className="section-title">最近7天积分趋势</Text>
        <View className="trend-chart">
          <View className="chart-bar">
            <View className="bar" style={{ height: '60%' }}></View>
            <Text className="bar-label">昨天</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '80%' }}></View>
            <Text className="bar-label">2天前</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '40%' }}></View>
            <Text className="bar-label">3天前</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '90%' }}></View>
            <Text className="bar-label">4天前</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '70%' }}></View>
            <Text className="bar-label">5天前</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '50%' }}></View>
            <Text className="bar-label">6天前</Text>
          </View>
          <View className="chart-bar">
            <View className="bar" style={{ height: '85%' }}></View>
            <Text className="bar-label">7天前</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PointsDetail