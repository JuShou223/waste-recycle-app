import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ExchangeItem } from '@/types'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import './index.scss'

const Exchange: React.FC = () => {
  const [userPoints] = useState(1250)
  const [items, setItems] = useState<ExchangeItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    loadExchangeItems()
  }, [])

  const loadExchangeItems = async () => {
    setLoading(true)
    try {
      // 模拟加载兑换商品
      setTimeout(() => {
        const mockItems: ExchangeItem[] = [
          {
            id: '1',
            name: '10元现金红包',
            image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 1000,
            type: 'cash',
            description: '可直接提现到微信零钱',
            stock: 50,
            status: 'available'
          },
          {
            id: '2', 
            name: '星巴克咖啡券',
            image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 500,
            type: 'coupon',
            description: '可在指定门店使用',
            stock: 20,
            status: 'available'
          },
          {
            id: '3',
            name: '环保购物袋',
            image: 'https://images.pexels.com/photos/3737594/pexels-photo-3737594.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 200,
            type: 'goods',
            description: '高品质环保材料制作',
            stock: 100,
            status: 'available'
          },
          {
            id: '4',
            name: '肯德基套餐券',
            image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 800,
            type: 'coupon',
            description: '香辣鸡腿堡套餐',
            stock: 0,
            status: 'soldout'
          },
          {
            id: '5',
            name: '50元现金红包',
            image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 5000,
            type: 'cash',
            description: '可直接提现到微信零钱',
            stock: 10,
            status: 'available'
          },
          {
            id: '6',
            name: '环保水杯',
            image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=300',
            points: 300,
            type: 'goods',
            description: '不锈钢保温杯',
            stock: 30,
            status: 'available'
          }
        ]
        setItems(mockItems)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleExchange = (item: ExchangeItem) => {
    if (item.status === 'soldout') {
      Taro.showToast({
        title: '商品已售罄',
        icon: 'error'
      })
      return
    }

    if (userPoints < item.points) {
      Taro.showToast({
        title: '积分不足',
        icon: 'error'
      })
      return
    }

    Taro.showModal({
      title: '确认兑换',
      content: `确定要用${item.points}积分兑换"${item.name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          processExchange(item)
        }
      }
    })
  }

  const processExchange = (item: ExchangeItem) => {
    Taro.showLoading({ title: '兑换中...' })
    
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showModal({
        title: '兑换成功！',
        content: `恭喜您成功兑换"${item.name}"，奖品将在24小时内发放到您的账户。`,
        showCancel: false,
        confirmText: '我知道了'
      })
    }, 2000)
  }

  const categories = [
    { key: 'all', name: '全部' },
    { key: 'cash', name: '现金红包' },
    { key: 'coupon', name: '优惠券' },
    { key: 'goods', name: '实物商品' }
  ]

  const filteredItems = items.filter(item => {
    if (activeCategory === 'all') return true
    return item.type === activeCategory
  })

  return (
    <View className="page exchange-page">
      {/* 积分余额 */}
      <View className="points-balance card">
        <View className="balance-info">
          <Text className="balance-label">我的积分余额</Text>
          <Text className="balance-amount">{userPoints}</Text>
        </View>
        <View className="balance-icon">💎</View>
      </View>

      {/* 分类筛选 */}
      <View className="category-tabs card">
        {categories.map((category) => (
          <View
            key={category.key}
            className={`tab-item ${activeCategory === category.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.key)}
          >
            <Text>{category.name}</Text>
          </View>
        ))}
      </View>

      {/* 兑换商品列表 */}
      <View className="items-section">
        {loading ? (
          <Loading text="加载中..." />
        ) : filteredItems.length > 0 ? (
          <View className="items-grid">
            {filteredItems.map((item) => (
              <View key={item.id} className="item-card card">
                <Image className="item-image" src={item.image} mode="aspectFill" />
                
                {item.status === 'soldout' && (
                  <View className="soldout-mask">
                    <Text className="soldout-text">已售罄</Text>
                  </View>
                )}
                
                <View className="item-content">
                  <Text className="item-name">{item.name}</Text>
                  <Text className="item-desc">{item.description}</Text>
                  
                  <View className="item-footer">
                    <View className="item-points">
                      <Text className="points-text">{item.points}</Text>
                      <Text className="points-unit">积分</Text>
                    </View>
                    
                    <View className="item-stock">
                      <Text className="stock-text">剩余 {item.stock}</Text>
                    </View>
                  </View>
                  
                  <View 
                    className={`exchange-btn ${item.status === 'soldout' || userPoints < item.points ? 'disabled' : ''}`}
                    onClick={() => handleExchange(item)}
                  >
                    <Text>
                      {item.status === 'soldout' 
                        ? '已售罄' 
                        : userPoints < item.points 
                          ? '积分不足' 
                          : '立即兑换'
                      }
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Empty
            title="暂无商品"
            description="该分类下暂无可兑换商品"
          />
        )}
      </View>

      {/* 兑换规则 */}
      <View className="rules-section card">
        <Text className="rules-title">兑换规则</Text>
        <View className="rules-list">
          <Text className="rule-item">• 兑换后的奖品将在24小时内发放</Text>
          <Text className="rule-item">• 现金红包直接发放到微信零钱</Text>
          <Text className="rule-item">• 优惠券有效期为30天</Text>
          <Text className="rule-item">• 实物商品需填写收货地址</Text>
          <Text className="rule-item">• 如有疑问请联系客服</Text>
        </View>
      </View>
    </View>
  )
}

export default Exchange