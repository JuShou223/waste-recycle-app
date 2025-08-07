// 用户相关类型
export interface User {
  id: string
  phone: string
  nickname: string
  avatar: string
  points: number
  totalRecycles: number
  level: string
  createTime: string
}

// 回收箱相关类型
export interface RecycleBox {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  status: 'available' | 'full' | 'maintenance'
  categories: WasteCategory[]
  distance?: number
}

// 垃圾分类类型
export interface WasteCategory {
  id: string
  name: string
  color: string
  icon: string
  description: string
  examples: string[]
}

// 投递记录类型
export interface RecycleRecord {
  id: string
  boxId: string
  boxName: string
  category: WasteCategory
  weight: number
  points: number
  createTime: string
  status: 'success' | 'pending' | 'failed'
}

// 积分记录类型
export interface PointsRecord {
  id: string
  type: 'earn' | 'spend'
  amount: number
  source: string
  description: string
  createTime: string
}

// 兑换商品类型
export interface ExchangeItem {
  id: string
  name: string
  image: string
  points: number
  type: 'coupon' | 'cash' | 'goods'
  description: string
  stock: number
  status: 'available' | 'soldout'
}

// 排行榜用户类型
export interface RankingUser {
  id: string
  nickname: string
  avatar: string
  points: number
  rank: number
}

// 消息通知类型
export interface Message {
  id: string
  title: string
  content: string
  type: 'recycle' | 'activity' | 'system'
  isRead: boolean
  createTime: string
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 位置信息类型
export interface Location {
  latitude: number
  longitude: number
  address?: string
}