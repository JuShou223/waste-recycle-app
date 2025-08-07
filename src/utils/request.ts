import Taro from '@tarojs/taro'
import { ApiResponse } from '@/types'
import { STORAGE_KEYS } from '@/constants'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

class Request {
  private baseURL = 'https://api.smart-recycle.com'

  // 请求拦截器
  private async interceptRequest(options: RequestOptions) {
    const token = Taro.getStorageSync(STORAGE_KEYS.TOKEN)
    
    const defaultHeader = {
      'Content-Type': 'application/json'
    }

    if (token) {
      defaultHeader['Authorization'] = `Bearer ${token}`
    }

    return {
      ...options,
      url: `${this.baseURL}${options.url}`,
      header: {
        ...defaultHeader,
        ...options.header
      }
    }
  }

  // 响应拦截器
  private async interceptResponse(response: any) {
    const { statusCode, data } = response

    if (statusCode === 200) {
      if (data.code === 0) {
        return data
      } else if (data.code === 401) {
        // token过期，跳转到登录页
        Taro.removeStorageSync(STORAGE_KEYS.TOKEN)
        Taro.removeStorageSync(STORAGE_KEYS.USER_INFO)
        Taro.navigateTo({ url: '/pages/login/index' })
        throw new Error('登录已过期，请重新登录')
      } else {
        throw new Error(data.message || '请求失败')
      }
    } else {
      throw new Error('网络请求失败')
    }
  }

  // 通用请求方法
  async request<T = any>(options: RequestOptions): Promise<ApiResponse<T>> {
    try {
      Taro.showLoading({ title: '加载中...' })
      
      const requestOptions = await this.interceptRequest(options)
      const response = await Taro.request(requestOptions)
      const result = await this.interceptResponse(response)
      
      return result
    } catch (error) {
      console.error('Request Error:', error)
      Taro.showToast({
        title: error.message || '请求失败',
        icon: 'error'
      })
      throw error
    } finally {
      Taro.hideLoading()
    }
  }

  // GET请求
  get<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request({
      url,
      method: 'GET',
      data
    })
  }

  // POST请求
  post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request({
      url,
      method: 'POST',
      data
    })
  }

  // PUT请求
  put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request({
      url,
      method: 'PUT',
      data
    })
  }

  // DELETE请求
  delete<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request({
      url,
      method: 'DELETE',
      data
    })
  }
}

export default new Request()