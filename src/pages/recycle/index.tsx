import { View, Text } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import { Button, Card, Grid } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Recycle() {
  const quickActions = [
    {
      title: '扫码开箱',
      icon: '📱',
      desc: '扫描二维码打开回收箱',
      path: '/pages/scan/index',
      color: '#52c41a'
    },
    {
      title: '附近回收箱',
      icon: '📍',
      desc: '查找最近的回收箱位置',
      path: '/pages/map/index',
      color: '#1890ff'
    },
    {
      title: '垃圾分类指引',
      icon: '📚',
      desc: '了解正确的垃圾分类方法',
      path: '/pages/classification/index',
      color: '#faad14'
    }
  ]

  const recentBoxes = [
    { id: 'RB001', name: '万达广场回收箱', distance: '50m', status: 'available' },
    { id: 'RB002', name: '市政府回收箱', distance: '200m', status: 'full' },
    { id: 'RB003', name: '中央公园回收箱', distance: '350m', status: 'available' }
  ]

  const handleNavigation = (path: string) => {
    navigateTo({ url: path })
  }

  return (
    <View className='recycle-container'>
      <View className='header-banner'>
        <Text className='banner-title'>智能回收</Text>
        <Text className='banner-subtitle'>让垃圾分类变得简单</Text>
      </View>

      {/* Quick Actions */}
      <View className='section'>
        <Text className='section-title'>快速操作</Text>
        <View className='action-grid'>
          {quickActions.map((action, index) => (
            <View 
              key={index}
              className='action-card'
              onClick={() => handleNavigation(action.path)}
            >
              <View className='action-icon' style={{ background: action.color }}>
                {action.icon}
              </View>
              <Text className='action-title'>{action.title}</Text>
              <Text className='action-desc'>{action.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Nearby Boxes */}
      <View className='section'>
        <Text className='section-title'>附近回收箱</Text>
        <Card className='boxes-card'>
          {recentBoxes.map((box, index) => (
            <View key={index} className='box-item'>
              <View className='box-info'>
                <Text className='box-name'>{box.name}</Text>
                <Text className='box-distance'>{box.distance}</Text>
              </View>
              <View className={`box-status ${box.status}`}>
                <Text className='status-text'>
                  {box.status === 'available' ? '可用' : '已满'}
                </Text>
              </View>
            </View>
          ))}
        </Card>
        <Button 
          type='primary' 
          className='view-more-btn'
          onClick={() => handleNavigation('/pages/map/index')}
        >
          查看地图
        </Button>
      </View>

      {/* Tips */}
      <View className='section'>
        <Text className='section-title'>回收小贴士</Text>
        <Card className='tips-card'>
          <View className='tip-item'>
            <Text className='tip-icon'>♻️</Text>
            <Text className='tip-text'>投递前请确保垃圾分类正确</Text>
          </View>
          <View className='tip-item'>
            <Text className='tip-icon'>⚖️</Text>
            <Text className='tip-text'>重量越重，获得积分越多</Text>
          </View>
          <View className='tip-item'>
            <Text className='tip-icon'>🎁</Text>
            <Text className='tip-text'>活动期间可获得双倍积分</Text>
          </View>
        </Card>
      </View>
    </View>
  )
}