import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { Message } from '@/types'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import './index.scss'

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setLoading(true)
    try {
      // 模拟加载消息数据
      setTimeout(() => {
        const mockMessages: Message[] = [
          {
            id: '1',
            title: '投递成功通知',
            content: '您在小区A栋回收箱的投递已完成，获得25积分奖励！',
            type: 'recycle',
            isRead: false,
            createTime: '2025-01-11 14:30'
          },
          {
            id: '2',
            title: '环保活动邀请',
            content: '本周六将举办"绿色地球"环保主题活动，参与可获得额外积分奖励！',
            type: 'activity',
            isRead: false,
            createTime: '2025-01-11 09:15'
          },
          {
            id: '3',
            title: '积分兑换成功',
            content: '您的10元现金红包已兑换成功，将在24小时内发放到您的微信零钱。',
            type: 'recycle',
            isRead: true,
            createTime: '2025-01-10 16:45'
          },
          {
            id: '4',
            title: '系统维护通知',
            content: '系统将于今晚22:00-24:00进行维护升级，期间可能影响部分功能使用。',
            type: 'system',
            isRead: true,
            createTime: '2025-01-10 12:00'
          },
          {
            id: '5',
            title: '排行榜更新',
            content: '本周环保排行榜已更新，您目前排名第12位，继续加油！',
            type: 'activity',
            isRead: true,
            createTime: '2025-01-09 20:30'
          },
          {
            id: '6',
            title: '积分加倍活动',
            content: '本周末积分加倍活动开启！投递垃圾可获得双倍积分奖励！',
            type: 'activity',
            isRead: true,
            createTime: '2025-01-08 10:00'
          }
        ]
        setMessages(mockMessages)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleMarkRead = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    )
  }

  const handleMarkAllRead = () => {
    setMessages(prevMessages =>
      prevMessages.map(msg => ({ ...msg, isRead: true }))
    )
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'recycle':
        return '♻️'
      case 'activity':
        return '🎯'
      case 'system':
        return '⚙️'
      default:
        return '📢'
    }
  }

  const getMessageTypeText = (type: string) => {
    switch (type) {
      case 'recycle':
        return '回收通知'
      case 'activity':
        return '活动通知'
      case 'system':
        return '系统消息'
      default:
        return '其他'
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !msg.isRead
    return msg.type === activeTab
  })

  const unreadCount = messages.filter(msg => !msg.isRead).length

  const tabs = [
    { key: 'all', name: '全部' },
    { key: 'unread', name: `未读(${unreadCount})` },
    { key: 'recycle', name: '回收通知' },
    { key: 'activity', name: '活动通知' },
    { key: 'system', name: '系统消息' }
  ]

  return (
    <View className="page messages-page">
      {/* 消息统计 */}
      <View className="messages-header card">
        <View className="stats-row">
          <View className="stat-item">
            <Text className="stat-number">{messages.length}</Text>
            <Text className="stat-label">总消息</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">{unreadCount}</Text>
            <Text className="stat-label">未读消息</Text>
          </View>
        </View>
        
        {unreadCount > 0 && (
          <View className="mark-all-btn" onClick={handleMarkAllRead}>
            <Text>全部标记已读</Text>
          </View>
        )}
      </View>

      {/* 消息分类标签 */}
      <View className="message-tabs">
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

      {/* 消息列表 */}
      <View className="messages-list">
        {loading ? (
          <Loading text="加载中..." />
        ) : filteredMessages.length > 0 ? (
          <View className="list-content card">
            {filteredMessages.map((message) => (
              <View 
                key={message.id} 
                className={`message-item ${!message.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkRead(message.id)}
              >
                <View className="message-icon">
                  {getMessageIcon(message.type)}
                </View>
                
                <View className="message-content">
                  <View className="message-header">
                    <Text className="message-title">{message.title}</Text>
                    <Text className="message-time">{message.createTime}</Text>
                  </View>
                  
                  <Text className="message-text">{message.content}</Text>
                  
                  <View className="message-meta">
                    <Text className="message-type">{getMessageTypeText(message.type)}</Text>
                    {!message.isRead && (
                      <View className="unread-dot"></View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Empty
            title="暂无消息"
            description={activeTab === 'unread' ? '所有消息都已阅读' : '暂时没有消息通知'}
          />
        )}
      </View>

      {/* 消息设置 */}
      <View className="settings-section card">
        <Text className="settings-title">消息设置</Text>
        <View className="settings-list">
          <View className="setting-item">
            <Text className="setting-text">回收成功通知</Text>
            <View className="setting-switch on"></View>
          </View>
          <View className="setting-item">
            <Text className="setting-text">活动推送通知</Text>
            <View className="setting-switch on"></View>
          </View>
          <View className="setting-item">
            <Text className="setting-text">系统维护通知</Text>
            <View className="setting-switch on"></View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Messages