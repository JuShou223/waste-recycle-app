import { View, Text, Image } from '@tarojs/components'
import { Card, Tabs } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Ranking() {
  const weeklyRanking = [
    { rank: 1, name: '环保小达人', avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 2850, weight: '15.2kg' },
    { rank: 2, name: '绿色生活家', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 2640, weight: '13.8kg' },
    { rank: 3, name: '回收达人', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 2420, weight: '12.5kg' },
    { rank: 4, name: '环保先锋', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 2180, weight: '11.2kg' },
    { rank: 5, name: '绿色使者', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 1950, weight: '10.1kg' }
  ]

  const monthlyRanking = [
    { rank: 1, name: '环保小达人', avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 8850, weight: '45.2kg' },
    { rank: 2, name: '绿色生活家', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 7640, weight: '38.8kg' },
    { rank: 3, name: '回收达人', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', points: 6420, weight: '32.5kg' }
  ]

  const currentUser = { rank: 15, name: '环保达人', points: 1250, weight: '6.8kg' }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return rank.toString()
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#ffd700'
      case 2: return '#c0c0c0'
      case 3: return '#cd7f32'
      default: return '#666'
    }
  }

  return (
    <View className='ranking-container'>
      <View className='ranking-header'>
        <Text className='header-title'>环保排行榜</Text>
        <Text className='header-subtitle'>看看谁是环保达人</Text>
      </View>

      {/* Current User Rank */}
      <Card className='my-rank-card'>
        <View className='my-rank'>
          <Text className='rank-label'>我的排名</Text>
          <View className='rank-info'>
            <Text className='rank-number'>#{currentUser.rank}</Text>
            <View className='rank-details'>
              <Text className='rank-points'>{currentUser.points}积分</Text>
              <Text className='rank-weight'>{currentUser.weight}</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Ranking Tabs */}
      <View className='ranking-tabs'>
        <Tabs defaultValue="0">
          <Tabs.TabPane title="本周排行" value="0">
            <View className='ranking-list'>
              {weeklyRanking.map((user, index) => (
                <View key={index} className='ranking-item'>
                  <View className='rank-badge' style={{ color: getRankColor(user.rank) }}>
                    {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                  </View>
                  
                  <Image className='user-avatar' src={user.avatar} mode='aspectFill' />
                  
                  <View className='user-info'>
                    <Text className='user-name'>{user.name}</Text>
                    <Text className='user-weight'>累计: {user.weight}</Text>
                  </View>
                  
                  <Text className='user-points'>{user.points}分</Text>
                </View>
              ))}
            </View>
          </Tabs.TabPane>
          
          <Tabs.TabPane title="本月排行" value="1">
            <View className='ranking-list'>
              {monthlyRanking.map((user, index) => (
                <View key={index} className='ranking-item'>
                  <View className='rank-badge' style={{ color: getRankColor(user.rank) }}>
                    {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                  </View>
                  
                  <Image className='user-avatar' src={user.avatar} mode='aspectFill' />
                  
                  <View className='user-info'>
                    <Text className='user-name'>{user.name}</Text>
                    <Text className='user-weight'>累计: {user.weight}</Text>
                  </View>
                  
                  <Text className='user-points'>{user.points}分</Text>
                </View>
              ))}
            </View>
          </Tabs.TabPane>
        </Tabs>
      </View>

      {/* Ranking Rules */}
      <Card className='rules-card'>
        <Text className='rules-title'>排行规则</Text>
        <View className='rules-list'>
          <Text className='rule-item'>• 按投递获得的积分进行排名</Text>
          <Text className='rule-item'>• 每周一、每月一日重置排行榜</Text>
          <Text className='rule-item'>• 前三名可获得额外奖励</Text>
          <Text className='rule-item'>• 排名每小时更新一次</Text>
        </View>
      </Card>
    </View>
  )
}