import { View, Text } from '@tarojs/components'
import { Card } from '@nutui/nutui-react-taro'
import './index.scss'

export default function History() {
  const historyData = [
    {
      id: 1,
      date: '2024-01-15 14:30',
      type: '塑料瓶',
      weight: '0.3kg',
      points: 15,
      location: '万达广场回收箱',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-14 09:15',
      type: '废纸',
      weight: '0.8kg',
      points: 20,
      location: '市政府回收箱',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-13 16:45',
      type: '金属罐',
      weight: '0.2kg',
      points: 25,
      location: '中央公园回收箱',
      status: 'completed'
    },
    {
      id: 4,
      date: '2024-01-12 11:20',
      type: '废纸',
      weight: '1.2kg',
      points: 30,
      location: '大学城回收箱',
      status: 'completed'
    },
    {
      id: 5,
      date: '2024-01-11 08:30',
      type: '塑料瓶',
      weight: '0.5kg',
      points: 18,
      location: '万达广场回收箱',
      status: 'processing'
    }
  ]

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'processing':
        return '处理中'
      default:
        return '未知'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#52c41a'
      case 'processing':
        return '#faad14'
      default:
        return '#999'
    }
  }

  const totalPoints = historyData.reduce((sum, item) => sum + item.points, 0)
  const totalWeight = historyData.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(1)

  return (
    <View className='history-container'>
      <View className='history-header'>
        <Text className='header-title'>回收记录</Text>
        <Text className='header-subtitle'>查看您的环保足迹</Text>
      </View>

      {/* Statistics */}
      <View className='stats-section'>
        <View className='stat-card'>
          <Text className='stat-number'>{historyData.length}</Text>
          <Text className='stat-label'>回收次数</Text>
        </View>
        <View className='stat-card'>
          <Text className='stat-number'>{totalWeight}kg</Text>
          <Text className='stat-label'>累计重量</Text>
        </View>
        <View className='stat-card'>
          <Text className='stat-number'>{totalPoints}</Text>
          <Text className='stat-label'>获得积分</Text>
        </View>
      </View>

      {/* History List */}
      <View className='history-list'>
        {historyData.map((item) => (
          <Card key={item.id} className='history-item'>
            <View className='item-header'>
              <View className='item-info'>
                <Text className='item-type'>{item.type}</Text>
                <Text className='item-date'>{item.date}</Text>
              </View>
              <View 
                className='item-status'
                style={{ color: getStatusColor(item.status) }}
              >
                {getStatusText(item.status)}
              </View>
            </View>
            
            <View className='item-details'>
              <Text className='item-location'>📍 {item.location}</Text>
              <View className='item-metrics'>
                <Text className='item-weight'>重量: {item.weight}</Text>
                <Text className='item-points'>+{item.points}积分</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </View>
  )
}