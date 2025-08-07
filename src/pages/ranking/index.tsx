import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { RankingUser } from '@/types'
import Loading from '@/components/Loading'
import './index.scss'

const Ranking: React.FC = () => {
  const [rankings, setRankings] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(false)
  const [myRank, setMyRank] = useState<RankingUser | null>(null)
  const [activeTab, setActiveTab] = useState('week')

  useEffect(() => {
    loadRankingData()
  }, [activeTab])

  const loadRankingData = async () => {
    setLoading(true)
    try {
      // 模拟加载排行榜数据
      setTimeout(() => {
        const mockRankings: RankingUser[] = [
          {
            id: '1',
            nickname: '环保小达人',
            avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 2350,
            rank: 1
          },
          {
            id: '2',
            nickname: '绿色守护者',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 2180,
            rank: 2
          },
          {
            id: '3',
            nickname: '回收大师',
            avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 1890,
            rank: 3
          },
          {
            id: '4',
            nickname: '地球卫士',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 1680,
            rank: 4
          },
          {
            id: '5',
            nickname: '环保先锋',
            avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 1520,
            rank: 5
          },
          {
            id: '6',
            nickname: '垃圾分类王',
            avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 1380,
            rank: 6
          },
          {
            id: '7',
            nickname: '低碳生活家',
            avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
            points: 1250,
            rank: 7
          }
        ]
        
        setRankings(mockRankings)
        
        // 设置当前用户排名（假设是第12名）
        setMyRank({
          id: 'me',
          nickname: '环保达人',
          avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
          points: 1250,
          rank: 12
        })
        
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return rank.toString()
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#F59E0B'
      case 2:
        return '#9CA3AF'
      case 3:
        return '#CD7C2F'
      default:
        return 'var(--color-text-secondary)'
    }
  }

  const tabs = [
    { key: 'week', name: '本周排行' },
    { key: 'month', name: '本月排行' },
    { key: 'all', name: '总排行' }
  ]

  return (
    <View className="page ranking-page">
      {/* 排行榜标签 */}
      <View className="ranking-tabs card">
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

      {/* 前三名展示 */}
      {!loading && rankings.length >= 3 && (
        <View className="top-three-section">
          <View className="podium">
            {/* 第二名 */}
            <View className="podium-item second">
              <Image className="avatar" src={rankings[1].avatar} />
              <Text className="nickname">{rankings[1].nickname}</Text>
              <Text className="points">{rankings[1].points}分</Text>
              <View className="rank-badge second-badge">
                <Text className="rank-text">🥈</Text>
              </View>
            </View>
            
            {/* 第一名 */}
            <View className="podium-item first">
              <View className="crown">👑</View>
              <Image className="avatar" src={rankings[0].avatar} />
              <Text className="nickname">{rankings[0].nickname}</Text>
              <Text className="points">{rankings[0].points}分</Text>
              <View className="rank-badge first-badge">
                <Text className="rank-text">🥇</Text>
              </View>
            </View>
            
            {/* 第三名 */}
            <View className="podium-item third">
              <Image className="avatar" src={rankings[2].avatar} />
              <Text className="nickname">{rankings[2].nickname}</Text>
              <Text className="points">{rankings[2].points}分</Text>
              <View className="rank-badge third-badge">
                <Text className="rank-text">🥉</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 我的排名 */}
      {myRank && (
        <View className="my-rank-section card">
          <View className="my-rank-item">
            <View className="rank-number" style={{ color: getRankColor(myRank.rank) }}>
              {getRankIcon(myRank.rank)}
            </View>
            <Image className="avatar" src={myRank.avatar} />
            <View className="user-info">
              <Text className="nickname">{myRank.nickname} (我)</Text>
              <Text className="points">{myRank.points}积分</Text>
            </View>
          </View>
        </View>
      )}

      {/* 完整排行榜 */}
      <View className="ranking-list card">
        <Text className="list-title">完整排行榜</Text>
        
        {loading ? (
          <Loading text="加载中..." />
        ) : (
          <View className="list-content">
            {rankings.map((user) => (
              <View key={user.id} className="rank-item">
                <View className="rank-number" style={{ color: getRankColor(user.rank) }}>
                  {getRankIcon(user.rank)}
                </View>
                <Image className="avatar" src={user.avatar} />
                <View className="user-info">
                  <Text className="nickname">{user.nickname}</Text>
                  <Text className="points">{user.points}积分</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 奖励说明 */}
      <View className="reward-section card">
        <Text className="reward-title">排行榜奖励</Text>
        <View className="reward-list">
          <View className="reward-item">
            <View className="reward-rank">🥇</View>
            <Text className="reward-text">第1名：500积分 + 精美礼品</Text>
          </View>
          <View className="reward-item">
            <View className="reward-rank">🥈</View>
            <Text className="reward-text">第2名：300积分 + 优惠券</Text>
          </View>
          <View className="reward-item">
            <View className="reward-rank">🥉</View>
            <Text className="reward-text">第3名：200积分</Text>
          </View>
          <View className="reward-item">
            <View className="reward-rank">🏆</View>
            <Text className="reward-text">前10名：额外积分奖励</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Ranking