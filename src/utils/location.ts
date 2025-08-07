import Taro from '@tarojs/taro'
import { Location } from '@/types'

class LocationService {
  // 获取当前位置
  async getCurrentLocation(): Promise<Location> {
    try {
      // 检查授权状态
      const authResult = await Taro.getSetting()
      
      if (!authResult.authSetting['scope.userLocation']) {
        // 请求授权
        await Taro.authorize({ scope: 'scope.userLocation' })
      }

      // 获取位置信息
      const locationResult = await Taro.getLocation({
        type: 'gcj02',
        isHighAccuracy: true
      })

      return {
        latitude: locationResult.latitude,
        longitude: locationResult.longitude
      }
    } catch (error) {
      console.error('Location service error:', error)
      
      if (error.errMsg && error.errMsg.includes('auth deny')) {
        Taro.showModal({
          title: '定位授权',
          content: '需要您的位置信息来查找附近的回收箱，请前往设置开启定位权限',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              Taro.openSetting()
            }
          }
        })
      }
      
      throw error
    }
  }

  // 计算两点间距离（千米）
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // 地球半径（千米）
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return Math.round(d * 100) / 100 // 保留两位小数
  }

  // 角度转弧度
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  // 格式化距离显示
  formatDistance(distance: number): string {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`
    }
    return `${distance}km`
  }

  // 打开地图导航
  openNavigation(latitude: number, longitude: number, name?: string): void {
    Taro.openLocation({
      latitude,
      longitude,
      name: name || '目的地',
      scale: 18
    })
  }
}

export default new LocationService()