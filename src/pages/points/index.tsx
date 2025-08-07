import { View, Text, Image } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import { Button, Card, Progress } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Points() {
  const userStats = {
    totalPoints: 1250,
    thisMonthPoints: 380,
    rank: 15,
    nextLevelPoints: 1500
  }

  const exchangeItems = [
    { id: 1, name: '星巴克咖啡券', points: 500, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 2, name: '10元现金红包', points: 1000, image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 3, name: '环保购物袋', points: 200, image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
    { id: 4, name: '竹制餐具套装', points: 800, image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }
  ]

  const pointsHistory = [
    { date: '2024-01-15', action: '投递塑料瓶', weight: '0.3kg', points: 15 },
    { date: '2024-01-14', action: '投递废纸', weight: '0.8kg', points: 20 },
    { date: '2024-01-13', action: '投递金属罐', weight: '0.2kg', points: 25 },
    { date: '2024-01-12', action: '投递废纸', weight: '1.2kg', points: 30 }
  ]

  const progressPercent = (userStats.totalPoints / userStats.nextLevelPoints) * 100

  const handleExchange = (item: any) => {
    if (userStats.totalPoints >= item.points) {
      // Handle exchange logic
      console.log('Exchange item:', item)
    }
  }

  return (
    <View className='points-container'>
      {/* Points Header */}
      <View className='points-header'>
        <View className='points-summary'>
          <Text className='total-points'>{userStats.totalPoints}</Text>
          <Text className='points-label'>当前积分</Text>
        </View>
        
        <View className='level-progress'>
          <View className='level-info'>
            <Text className='level-text'>距离下一等级还需 {userStats.nextLevelPoints - userStats.totalPoints} 积分</Text>
          </View>
          <Progress percent={progressPercent} color='#52c41a' />
        </View>

        <View className='stats-row'>
          <View className='stat-item'>
            <Text className='stat-number'>{userStats.thisMonthPoints}</Text>
            <Text className='stat-label'>本月积分</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{userStats.rank}</Text>
            <Text className='stat-label'>环保排名</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className='action-section'>
        <Button 
          type='primary' 
          className='action-btn'
          onClick={() => navigateTo({ url: '/pages/exchange/index' })}
        >
          积分兑换
        </Button>
        <Button 
          type='default' 
          className='action-btn'
          onClick={() => navigateTo({ url: '/pages/ranking/index' })}
        >
          查看排行榜
        </Button>
      </View>

      {/* Exchange Items */}
      <View className='section'>
        <Text className='section-title'>热门兑换</Text>
        <View className='exchange-grid'>
          {exchangeItems.map((item) => (
            <View key={item.id} className='exchange-item'>
              <Image className='item-image' src={item.image} mode='aspectFill' />
              <Text className='item-name'>{item.name}</Text>
              <View className='item-footer'>
                <Text className='item-points'>{item.points}积分</Text>
                <Button 
                  size='small'
                  type={userStats.totalPoints >= item.points ? 'primary' : 'default'}
                  disabled={userStats.totalPoints < item.points}
                  onClick={() => handleExchange(item)}
                >
                  {userStats.totalPoints >= item.points ? '兑换' : '积分不足'}
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Points History */}
      <View className='section'>
        <Text className='section-title'>积分记录</Text>
        <Card className='history-card'>
          {pointsHistory.map((record, index) => (
            <View key={index} className='history-item'>
              <View className='history-info'>
                <Text className='history-action'>{record.action}</Text>
                <Text className='history-detail'>重量: {record.weight}</Text>
                <Text className='history-date'>{record.date}</Text>
              </View>
              <Text className='history-points'>+{record.points}</Text>
            </View>
          ))}
        </Card>
      </View>
    </View>
  )
}