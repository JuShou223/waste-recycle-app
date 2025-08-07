import Taro from '@tarojs/taro'

class Storage {
  // 同步存储
  setSync(key: string, value: any): void {
    try {
      Taro.setStorageSync(key, value)
    } catch (error) {
      console.error('Storage setSync error:', error)
    }
  }

  // 同步获取
  getSync<T = any>(key: string): T | null {
    try {
      return Taro.getStorageSync(key)
    } catch (error) {
      console.error('Storage getSync error:', error)
      return null
    }
  }

  // 同步删除
  removeSync(key: string): void {
    try {
      Taro.removeStorageSync(key)
    } catch (error) {
      console.error('Storage removeSync error:', error)
    }
  }

  // 异步存储
  async set(key: string, value: any): Promise<void> {
    try {
      await Taro.setStorage({ key, data: value })
    } catch (error) {
      console.error('Storage set error:', error)
    }
  }

  // 异步获取
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const result = await Taro.getStorage({ key })
      return result.data
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  }

  // 异步删除
  async remove(key: string): Promise<void> {
    try {
      await Taro.removeStorage({ key })
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  }

  // 清空存储
  async clear(): Promise<void> {
    try {
      await Taro.clearStorage()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

export default new Storage()