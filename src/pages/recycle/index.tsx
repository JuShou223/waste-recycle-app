import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { WASTE_CATEGORIES } from '@/constants'
import './index.scss'

const Recycle: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleScan = () => {
    Taro.navigateTo({
      url: '/pages/scan/index'
    })
  }

  const handleMapView = () => {
    Taro.navigateTo({
      url: '/pages/map/index'
    })
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  return (
    <View className="page recycle-page">
      {/* 主要操作按钮 */}
      <View className="main-actions">
        <View className="action-card scan-card" onClick={handleScan}>
          <View className="action-icon">📷</View>
          <Text className="action-title">扫码回收</Text>
          <Text className="action-desc">扫描回收箱二维码开始投递</Text>
        </View>
        
        <View className="action-card map-card" onClick={handleMapView}>
          <View className="action-icon">🗺️</View>
          <Text className="action-title">查找回收箱</Text>
          <Text className="action-desc">定位附近的智能回收设备</Text>
        </View>
      </View>

      {/* 垃圾分类指引 */}
      <View className="category-section">
        <Text className="section-title">垃圾分类指引</Text>
        <View className="category-grid">
          {WASTE_CATEGORIES.map((category) => (
            <View
              key={category.id}
              className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <View 
                className="category-icon"
                style={{ backgroundColor: category.color }}
              >
                {category.name.charAt(0)}
              </View>
              <Text className="category-name">{category.name}</Text>
              <Text className="category-desc">{category.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 选中分类的详细信息 */}
      {selectedCategory && (
        <View className="category-detail card">
          {WASTE_CATEGORIES
            .filter(cat => cat.id === selectedCategory)
            .map(category => (
              <View key={category.id}>
                <View className="detail-header">
                  <View 
                    className="detail-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name.charAt(0)}
                  </View>
                  <View className="detail-info">
                    <Text className="detail-name">{category.name}</Text>
                    <Text className="detail-desc">{category.description}</Text>
                  </View>
                </View>
                
                <View className="examples-section">
                  <Text className="examples-title">包含物品：</Text>
                  <View className="examples-list">
                    {category.examples.map((example, index) => (
                      <View key={index} className="example-item">
                        <Text>{example}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
        </View>
      )}

      {/* 回收记录统计 */}
      <View className="stats-card card">
        <Text className="stats-title">我的回收统计</Text>
        <View className="stats-row">
          <View className="stat-item">
            <Text className="stat-number">156</Text>
            <Text className="stat-label">总投递次数</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">68.5kg</Text>
            <Text className="stat-label">累计回收重量</Text>
          </View>
          <View className="stat-item">
            <Text className="stat-number">685</Text>
            <Text className="stat-label">获得总积分</Text>
          </View>
        </View>
      </View>

      {/* 环保贡献 */}
      <View className="contribution-card card">
        <View className="contribution-header">
          <Text className="contribution-title">我的环保贡献</Text>
          <View className="contribution-icon">🌍</View>
        </View>
        <View className="contribution-list">
          <View className="contribution-item">
            <Text className="contribution-text">拯救了 <Text className="highlight">23</Text> 棵树</Text>
          </View>
          <View className="contribution-item">
            <Text className="contribution-text">减少了 <Text className="highlight">45kg</Text> 碳排放</Text>
          </View>
          <View className="contribution-item">
            <Text className="contribution-text">节约了 <Text className="highlight">1200L</Text> 水资源</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Recycle