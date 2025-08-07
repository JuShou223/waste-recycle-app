import { View, Text } from '@tarojs/components'
import { showToast } from '@tarojs/taro'
import { Card, Button } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Map() {
  const recycleBoxes = [
    {
      id: 'RB001',
      name: '万达广场回收箱',
      address: '中山路188号万达广场1楼',
      distance: '50m',
      status: 'available',
      capacity: 75,
      types: ['纸类', '塑料', '金属']
    },
    {
      id: 'RB002',
      name: '市政府回收箱',
      address: '政务大道100号市政府大楼',
      distance: '200m',
      status: 'full',
      capacity: 100,
      types: ['纸类', '塑料']
    },
    {
      id: 'RB003',
      name: '中央公园回收箱',
      address: '解放路中央公园东门',
      distance: '350m',
      status: 'available',
      capacity: 30,
      types: ['纸类', '塑料', '金属', '厨余']
    },
    {
      id: 'RB004',
      name: '大学城回收箱',
      address: '大学路168号教学楼A座',
      distance: '500m',
      status: 'maintenance',
      capacity: 0,
      types: ['纸类', '塑料']
    }
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'available':
        return { text: '可用', color: '#52c41a' }
      case 'full':
        return { text: '已满', color: '#ff4d4f' }
      case 'maintenance':
        return { text: '维护中', color: '#faad14' }
      default:
        return { text: '未知', color: '#999' }
    }
  }

  const handleNavigation = (box: any) => {
    if (box.status !== 'available') {
      showToast({
        title: '该回收箱暂不可用',
        icon: 'none'
      })
      return
    }
    
    showToast({
      title: '正在导航...',
      icon: 'loading'
    })
  }

  const handleRefresh = () => {
    showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }

  return (
    <View className='map-container'>
      {/* Map Header */}
      <View className='map-header'>
        <Text className='header-title'>附近回收箱</Text>
        <Text className='header-subtitle'>找到最近的回收点</Text>
        
        <View className='location-info'>
          <Text className='location-text'>📍 当前位置: 中山路商圈</Text>
          <Button size='small' type='primary' onClick={handleRefresh}>
            刷新
          </Button>
        </View>
      </View>

      {/* Map Placeholder */}
      <View className='map-placeholder'>
        <Text className='map-text'>🗺️</Text>
        <Text className='map-hint'>地图功能需要在真实环境中运行</Text>
      </View>

      {/* Filter Section */}
      <View className='filter-section'>
        <View className='filter-item active'>
          <Text className='filter-text'>全部</Text>
        </View>
        <View className='filter-item'>
          <Text className='filter-text'>可用</Text>
        </View>
        <View className='filter-item'>
          <Text className='filter-text'>500m内</Text>
        </View>
      </View>

      {/* Recycle Boxes List */}
      <View className='boxes-section'>
        <Text className='section-title'>回收箱列表</Text>
        
        {recycleBoxes.map((box) => (
          <Card key={box.id} className='box-card'>
            <View className='box-header'>
              <View className='box-main-info'>
                <Text className='box-name'>{box.name}</Text>
                <Text className='box-address'>{box.address}</Text>
              </View>
              
              <View className='box-status-info'>
                <View 
                  className='status-badge'
                  style={{ background: getStatusInfo(box.status).color }}
                >
                  <Text className='status-text'>
                    {getStatusInfo(box.status).text}
                  </Text>
                </View>
                <Text className='box-distance'>{box.distance}</Text>
              </View>
            </View>

            <View className='box-details'>
              <View className='capacity-info'>
                <Text className='capacity-label'>容量:</Text>
                <View className='capacity-bar'>
                  <View 
                    className='capacity-fill'
                    style={{ 
                      width: `${box.capacity}%`,
                      background: box.capacity > 80 ? '#ff4d4f' : 
                                 box.capacity > 60 ? '#faad14' : '#52c41a'
                    }}
                  ></View>
                </View>
                <Text className='capacity-text'>{box.capacity}%</Text>
              </View>

              <View className='types-info'>
                <Text className='types-label'>回收类型:</Text>
                <View className='types-list'>
                  {box.types.map((type, index) => (
                    <Text key={index} className='type-tag'>{type}</Text>
                  ))}
                </View>
              </View>
            </View>

            <View className='box-actions'>
              <Button 
                size='small' 
                type='default'
                disabled={box.status !== 'available'}
                onClick={() => handleNavigation(box)}
              >
                导航
              </Button>
              <Button 
                size='small' 
                type='primary'
                disabled={box.status !== 'available'}
                onClick={() => showToast({ title: '跳转到扫码页面', icon: 'none' })}
              >
                扫码使用
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </View>
  )
}