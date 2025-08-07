// API相关常量
export const API_BASE_URL = 'https://api.smart-recycle.com'

// 存储键名常量
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  LOCATION: 'location'
}

// 垃圾分类常量
export const WASTE_CATEGORIES = [
  {
    id: '1',
    name: '可回收垃圾',
    color: '#3B82F6',
    icon: 'recycle',
    description: '可以再生循环利用的垃圾',
    examples: ['废纸', '塑料瓶', '金属罐', '玻璃瓶']
  },
  {
    id: '2', 
    name: '有害垃圾',
    color: '#EF4444',
    icon: 'dangerous',
    description: '对人体健康或环境造成危害的垃圾',
    examples: ['电池', '灯管', '药品', '油漆']
  },
  {
    id: '3',
    name: '厨余垃圾',
    color: '#10B981',
    icon: 'kitchen',
    description: '易腐烂的生物质垃圾',
    examples: ['剩饭剩菜', '果皮', '菜叶', '骨头']
  },
  {
    id: '4',
    name: '其他垃圾',
    color: '#6B7280',
    icon: 'other',
    description: '除上述几类垃圾之外的垃圾',
    examples: ['尿片', '烟头', '猫砂', '破碎陶瓷']
  }
]

// 用户等级常量
export const USER_LEVELS = [
  { name: '环保新手', minPoints: 0, maxPoints: 99, color: '#9CA3AF' },
  { name: '环保达人', minPoints: 100, maxPoints: 499, color: '#10B981' },
  { name: '环保专家', minPoints: 500, maxPoints: 1999, color: '#3B82F6' },
  { name: '环保大师', minPoints: 2000, maxPoints: 9999, color: '#8B5CF6' },
  { name: '环保领袖', minPoints: 10000, maxPoints: Infinity, color: '#F59E0B' }
]

// 消息类型常量
export const MESSAGE_TYPES = {
  RECYCLE: 'recycle',
  ACTIVITY: 'activity', 
  SYSTEM: 'system'
}

// 回收箱状态常量
export const BOX_STATUS = {
  AVAILABLE: 'available',
  FULL: 'full',
  MAINTENANCE: 'maintenance'
}

// 积分来源常量
export const POINTS_SOURCE = {
  RECYCLE: 'recycle',
  ACTIVITY: 'activity',
  SIGNUP: 'signup',
  SHARE: 'share'
}