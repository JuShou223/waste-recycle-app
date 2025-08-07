import { View, Text } from '@tarojs/components'
import { Card, Badge, Button } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Messages() {
  const messages = [
    {
      id: 1,
      type: 'recycle',
      title: '回收成功',
      content: '您投递的废纸 0.8kg 已成功回收，获得 20 积分',
      time: '2小时前',
      read: false
    },
    {
      id: 2,
      type: 'activity',
      title: '积分双倍活动',
      content: '🎉 本周积分双倍活动正在进行中，快来参与吧！',
      time: '1天前',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: '系统升级通知',
      content: '系统将于今晚2:00-4:00进行升级维护，期间服务可能短暂中断',
      time: '2天前',
      read: true
    },
    {
      id: 4,
      type: 'recycle',
      title: '回收成功',
      content: '您投递的塑料瓶 0.3kg 已成功回收，获得 15 积分',
      time: '3天前',
      read: true
    },
    {
      id: 5,
      type: 'activity',
      title: '环保排行榜更新',
      content: '恭喜您在本月环保排行榜中排名第15位！',
      time: '5天前',
      read: true
    }
  ]

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'recycle':
        return '♻️'
      case 'activity':
        return '🎯'
      case 'system':
        return '⚙️'
      default:
        return '📝'
    }
  }

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'recycle':
        return '#52c41a'
      case 'activity':
        return '#fa541c'
      case 'system':
        return '#1890ff'
      default:
        return '#666'
    }
  }

  const unreadCount = messages.filter(msg => !msg.read).length

  const handleMarkAllRead = () => {
    // Mark all messages as read
    console.log('Mark all as read')
  }

  const handleClearAll = () => {
    // Clear all messages
    console.log('Clear all messages')
  }

  return (
    <View className='messages-container'>
      {/* Header */}
      <View className='messages-header'>
        <View className='header-content'>
          <Text className='header-title'>消息通知</Text>
          {unreadCount > 0 && (
            <Badge value={unreadCount} max={99}>
              <Text className='unread-text'>未读消息</Text>
            </Badge>
          )}
        </View>
        
        <View className='header-actions'>
          <Button size='small' type='default' onClick={handleMarkAllRead}>
            全部已读
          </Button>
          <Button size='small' type='default' onClick={handleClearAll}>
            清空消息
          </Button>
        </View>
      </View>

      {/* Message List */}
      <View className='messages-list'>
        {messages.map((message) => (
          <Card key={message.id} className={`message-card ${message.read ? 'read' : 'unread'}`}>
            <View className='message-item'>
              <View className='message-icon' style={{ color: getMessageTypeColor(message.type) }}>
                {getMessageIcon(message.type)}
              </View>
              
              <View className='message-content'>
                <View className='message-header'>
                  <Text className='message-title'>{message.title}</Text>
                  <Text className='message-time'>{message.time}</Text>
                </View>
                
                <Text className='message-text'>{message.content}</Text>
                
                {!message.read && (
                  <View className='unread-dot'></View>
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>

      {messages.length === 0 && (
        <View className='empty-state'>
          <Text className='empty-icon'>📮</Text>
          <Text className='empty-text'>暂无消息</Text>
          <Text className='empty-desc'>所有消息通知会在这里显示</Text>
        </View>
      )}
    </View>
  )
}