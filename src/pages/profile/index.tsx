import { View, Text, Image } from '@tarojs/components'
import { navigateTo, showToast } from '@tarojs/taro'
import { Button, Card, Cell } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Profile() {
  const userInfo = {
    nickname: '环保达人',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    phone: '138****8888',
    points: 1250,
    totalRecycle: 28,
    totalWeight: '3.2kg',
    joinDate: '2023-03-15'
  }

  const menuItems = [
    { title: '我的设备', icon: '📱', path: '/pages/devices/index', desc: '已绑定设备记录' },
    { title: '回收记录', icon: '📝', path: '/pages/history/index', desc: '查看投递历史' },
    { title: '消息通知', icon: '🔔', path: '/pages/messages/index', desc: '系统消息和通知' },
    { title: '设置', icon: '⚙️', path: '/pages/settings/index', desc: '个人偏好设置' },
    { title: '帮助中心', icon: '❓', path: '/pages/help/index', desc: '常见问题解答' },
    { title: '关于我们', icon: 'ℹ️', path: '/pages/about/index', desc: '了解更多信息' }
  ]

  const handleNavigation = (path: string) => {
    if (path.includes('/pages/devices/') || path.includes('/pages/settings/') || 
        path.includes('/pages/help/') || path.includes('/pages/about/')) {
      showToast({
        title: '功能开发中',
        icon: 'none'
      })
      return
    }
    navigateTo({ url: path })
  }

  const handleLogout = () => {
    showToast({
      title: '退出登录成功',
      icon: 'success'
    })
  }

  return (
    <View className='profile-container'>
      {/* User Info Header */}
      <View className='profile-header'>
        <View className='user-avatar'>
          <Image 
            className='avatar-image'
            src={userInfo.avatar}
            mode='aspectFill'
          />
        </View>
        <View className='user-details'>
          <Text className='username'>{userInfo.nickname}</Text>
          <Text className='user-phone'>{userInfo.phone}</Text>
          <Text className='join-info'>加入时间: {userInfo.joinDate}</Text>
        </View>
        <Button size='small' type='primary' className='edit-btn'>编辑</Button>
      </View>

      {/* Stats Cards */}
      <View className='stats-section'>
        <View className='stat-card'>
          <Text className='stat-number'>{userInfo.points}</Text>
          <Text className='stat-label'>当前积分</Text>
        </View>
        <View className='stat-card'>
          <Text className='stat-number'>{userInfo.totalRecycle}</Text>
          <Text className='stat-label'>回收次数</Text>
        </View>
        <View className='stat-card'>
          <Text className='stat-number'>{userInfo.totalWeight}</Text>
          <Text className='stat-label'>累计重量</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className='menu-section'>
        <Card className='menu-card'>
          {menuItems.map((item, index) => (
            <Cell
              key={index}
              title={
                <View className='menu-item'>
                  <Text className='menu-icon'>{item.icon}</Text>
                  <View className='menu-content'>
                    <Text className='menu-title'>{item.title}</Text>
                    <Text className='menu-desc'>{item.desc}</Text>
                  </View>
                </View>
              }
              isLink
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </Card>
      </View>

      {/* Logout */}
      <View className='logout-section'>
        <Button 
          type='default' 
          className='logout-btn'
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </View>
    </View>
  )
}