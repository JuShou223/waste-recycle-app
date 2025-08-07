import React, { useState, useEffect } from 'react'
import { View, Text, Map } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { RecycleBox, Location } from '@/types'
import locationService from '@/utils/location'
import Loading from '@/components/Loading'
import './index.scss'

const MapPage: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null)
  const [recycleBoxes, setRecycleBoxes] = useState<RecycleBox[]>([])
  const [markers, setMarkers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBox, setSelectedBox] = useState<RecycleBox | null>(null)

  useEffect(() => {
    initMap()
  }, [])

  const initMap = async () => {
    try {
      setLoading(true)
      
      // 获取当前位置
      const currentLocation = await locationService.getCurrentLocation()
      setLocation(currentLocation)
      
      // 加载附近的回收箱
      await loadRecycleBoxes(currentLocation)
      
      setLoading(false)
    } catch (error) {
      console.error('地图初始化失败:', error)
      setLoading(false)
      Taro.showToast({
        title: '定位失败，请检查权限设置',
        icon: 'error'
      })
    }
  }

  const loadRecycleBoxes = async (currentLocation: Location) => {
    // 模拟加载附近的回收箱数据
    const mockBoxes: RecycleBox[] = [
      {
        id: 'box001',
        name: '小区A栋回收箱',
        address: '环保街道123号小区A栋',
        latitude: currentLocation.latitude + 0.001,
        longitude: currentLocation.longitude + 0.001,
        status: 'available',
        categories: [
          { id: '1', name: '可回收垃圾', color: '#3B82F6', icon: 'recycle', description: '', examples: [] },
          { id: '2', name: '有害垃圾', color: '#EF4444', icon: 'dangerous', description: '', examples: [] }
        ]
      },
      {
        id: 'box002',
        name: '商业广场回收站',
        address: '中心广场B区商业街',
        latitude: currentLocation.latitude - 0.002,
        longitude: currentLocation.longitude + 0.002,
        status: 'available',
        categories: [
          { id: '1', name: '可回收垃圾', color: '#3B82F6', icon: 'recycle', description: '', examples: [] },
          { id: '3', name: '厨余垃圾', color: '#10B981', icon: 'kitchen', description: '', examples: [] }
        ]
      },
      {
        id: 'box003',
        name: '公园入口回收箱',
        address: '绿色公园主入口处',
        latitude: currentLocation.latitude + 0.003,
        longitude: currentLocation.longitude - 0.001,
        status: 'full',
        categories: [
          { id: '1', name: '可回收垃圾', color: '#3B82F6', icon: 'recycle', description: '', examples: [] }
        ]
      }
    ]

    // 计算距离
    const boxesWithDistance = mockBoxes.map(box => ({
      ...box,
      distance: locationService.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        box.latitude,
        box.longitude
      )
    }))

    setRecycleBoxes(boxesWithDistance)
    
    // 创建地图标记
    const mapMarkers = boxesWithDistance.map((box, index) => ({
      id: index,
      latitude: box.latitude,
      longitude: box.longitude,
      title: box.name,
      iconPath: box.status === 'available' 
        ? 'https://images.pexels.com/photos/3735173/pexels-photo-3735173.jpeg?auto=compress&cs=tinysrgb&w=50'
        : 'https://images.pexels.com/photos/3735173/pexels-photo-3735173.jpeg?auto=compress&cs=tinysrgb&w=50',
      width: 40,
      height: 40,
      callout: {
        content: box.name,
        display: 'BYCLICK',
        borderRadius: 5,
        bgColor: '#ffffff',
        color: '#333333',
        fontSize: 14,
        padding: 5
      }
    }))

    setMarkers(mapMarkers)
  }

  const handleMarkerTap = (e: any) => {
    const markerId = e.detail.markerId
    const box = recycleBoxes[markerId]
    if (box) {
      setSelectedBox(box)
    }
  }

  const handleNavigation = (box: RecycleBox) => {
    locationService.openNavigation(box.latitude, box.longitude, box.name)
  }

  const handleScanBox = () => {
    Taro.navigateTo({
      url: '/pages/scan/index'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10B981'
      case 'full':
        return '#F59E0B'
      case 'maintenance':
        return '#EF4444'
      default:
        return '#6B7280'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '可用'
      case 'full':
        return '已满'
      case 'maintenance':
        return '维护中'
      default:
        return '未知'
    }
  }

  if (loading) {
    return (
      <View className="page map-page">
        <Loading text="正在定位..." />
      </View>
    )
  }

  if (!location) {
    return (
      <View className="page map-page">
        <View className="error-state">
          <Text className="error-text">定位失败</Text>
          <Text className="error-desc">请检查定位权限设置</Text>
          <View className="retry-btn btn btn-primary" onClick={initMap}>
            <Text>重新定位</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className="page map-page">
      {/* 地图容器 */}
      <View className="map-container">
        <Map
          className="map"
          latitude={location.latitude}
          longitude={location.longitude}
          scale={16}
          markers={markers}
          showLocation={true}
          showCompass={true}
          showScale={true}
          enableZoom={true}
          enableScroll={true}
          enableRotate={false}
          enablePoi={true}
          onMarkerTap={handleMarkerTap}
        />
        
        {/* 扫码按钮 */}
        <View className="scan-float-btn" onClick={handleScanBox}>
          <View className="scan-icon">📷</View>
        </View>
      </View>

      {/* 回收箱列表 */}
      <View className="boxes-list">
        <Text className="list-title">附近回收箱 ({recycleBoxes.length})</Text>
        
        {recycleBoxes.map((box) => (
          <View key={box.id} className="box-item card">
            <View className="box-info">
              <View className="box-header">
                <Text className="box-name">{box.name}</Text>
                <View 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(box.status) }}
                >
                  <Text className="status-text">{getStatusText(box.status)}</Text>
                </View>
              </View>
              
              <Text className="box-address">{box.address}</Text>
              
              <View className="box-meta">
                <Text className="distance">
                  距离: {locationService.formatDistance(box.distance || 0)}
                </Text>
                <Text className="categories">
                  支持: {box.categories.map(cat => cat.name).join('、')}
                </Text>
              </View>
            </View>
            
            <View className="box-actions">
              <View 
                className="nav-btn btn btn-outline"
                onClick={() => handleNavigation(box)}
              >
                <Text>导航</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 选中回收箱详情 */}
      {selectedBox && (
        <View className="box-detail-modal">
          <View className="modal-overlay" onClick={() => setSelectedBox(null)} />
          <View className="modal-content">
            <View className="detail-header">
              <Text className="detail-title">{selectedBox.name}</Text>
              <View className="close-btn" onClick={() => setSelectedBox(null)}>×</View>
            </View>
            
            <Text className="detail-address">{selectedBox.address}</Text>
            
            <View className="detail-status">
              <Text>状态: </Text>
              <View 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(selectedBox.status) }}
              >
                <Text className="status-text">{getStatusText(selectedBox.status)}</Text>
              </View>
            </View>
            
            <View className="detail-categories">
              <Text className="categories-title">支持分类:</Text>
              <View className="categories-list">
                {selectedBox.categories.map((category) => (
                  <View 
                    key={category.id}
                    className="category-tag"
                    style={{ backgroundColor: category.color }}
                  >
                    <Text className="category-text">{category.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View className="detail-actions">
              <View 
                className="action-btn nav-btn"
                onClick={() => handleNavigation(selectedBox)}
              >
                <Text>🧭 导航过去</Text>
              </View>
              <View className="action-btn scan-btn" onClick={handleScanBox}>
                <Text>📷 扫码回收</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default MapPage