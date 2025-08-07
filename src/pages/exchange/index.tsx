import { View, Text, Image } from '@tarojs/components'
import { navigateBack, showToast } from '@tarojs/taro'
import { Button, Card } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Exchange() {
  const exchangeItems = [
    {
      id: 1,
      name: '星巴克咖啡券',
      points: 500,
      stock: 20,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '星巴克任意饮品券，全国门店通用'
    },
    {
      id: 2,
      name: '10元现金红包',
      points: 1000,
      stock: 50,
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '微信现金红包，即时到账'
    },
    {
      id: 3,
      name: '环保购物袋',
      points: 200,
      stock: 100,
      image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '可重复使用环保购物袋'
    },
    {
      id: 4,
      name: '竹制餐具套装',
      points: 800,
      stock: 15,
      image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '便携式竹制餐具，环保健康'
    },
    {
      id: 5,
      name: '植物种子礼盒',
      points: 300,
      stock: 30,
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '多种花卉种子，绿化环境'
    },
    {
      id: 6,
      name: '有机蔬菜券',
      points: 600,
      stock: 25,
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '新鲜有机蔬菜配送券'
    }
  ]

  const userPoints = 1250

  const handleExchange = (item: any) => {
    if (userPoints >= item.points) {
      showToast({
        title: '兑换成功！',
        icon: 'success'
      })
    } else {
      showToast({
        title: '积分不足',
        icon: 'none'
      })
    }
  }

  return (
    <View className='exchange-container'>
      <View className='exchange-header'>
        <Text className='header-title'>积分兑换</Text>
        <Text className='header-subtitle'>用积分换取精美礼品</Text>
        <View className='points-info'>
          <Text className='points-text'>当前积分: {userPoints}</Text>
        </View>
      </View>

      <View className='exchange-grid'>
        {exchangeItems.map((item) => (
          <Card key={item.id} className='exchange-item'>
            <Image className='item-image' src={item.image} mode='aspectFill' />
            
            <View className='item-content'>
              <Text className='item-name'>{item.name}</Text>
              <Text className='item-desc'>{item.description}</Text>
              
              <View className='item-info'>
                <Text className='item-points'>{item.points}积分</Text>
                <Text className='item-stock'>库存: {item.stock}</Text>
              </View>
              
              <Button 
                size='small'
                type={userPoints >= item.points ? 'primary' : 'default'}
                disabled={userPoints < item.points || item.stock === 0}
                className='exchange-btn'
                onClick={() => handleExchange(item)}
              >
                {item.stock === 0 ? '已售罄' : 
                 userPoints >= item.points ? '立即兑换' : '积分不足'}
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </View>
  )
}