import React, { useState } from 'react'
import { View, Text, Input, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { STORAGE_KEYS } from '@/constants'
import storage from '@/utils/storage'
import './index.scss'

const Login: React.FC = () => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'error'
      })
      return
    }

    if (countdown > 0) return

    try {
      // 模拟发送验证码
      Taro.showToast({
        title: '验证码已发送',
        icon: 'success'
      })
      
      // 开始倒计时
      let time = 60
      setCountdown(time)
      const timer = setInterval(() => {
        time--
        setCountdown(time)
        if (time === 0) {
          clearInterval(timer)
        }
      }, 1000)
    } catch (error) {
      console.error('发送验证码失败:', error)
    }
  }

  const handleLogin = async () => {
    if (!phone || !code) {
      Taro.showToast({
        title: '请输入手机号和验证码',
        icon: 'error'
      })
      return
    }

    if (code !== '123456') {
      Taro.showToast({
        title: '验证码错误',
        icon: 'error'
      })
      return
    }

    setLoading(true)
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 保存用户信息
      const userInfo = {
        id: '123456',
        phone,
        nickname: '环保达人',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
        points: 1250,
        totalRecycles: 156,
        level: '环保专家',
        createTime: new Date().toISOString()
      }
      
      storage.setSync(STORAGE_KEYS.TOKEN, 'mock_token_123456')
      storage.setSync(STORAGE_KEYS.USER_INFO, userInfo)
      
      Taro.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      // 返回上一页或跳转到首页
      setTimeout(() => {
        const pages = Taro.getCurrentPages()
        if (pages.length > 1) {
          Taro.navigateBack()
        } else {
          Taro.switchTab({ url: '/pages/index/index' })
        }
      }, 1000)
      
    } catch (error) {
      console.error('登录失败:', error)
      Taro.showToast({
        title: '登录失败，请重试',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleWeChatLogin = () => {
    Taro.login({
      success: (res) => {
        console.log('微信登录code:', res.code)
        // 这里应该将code发送到后端换取用户信息
        Taro.showToast({
          title: '微信登录功能开发中',
          icon: 'none'
        })
      },
      fail: (error) => {
        console.error('微信登录失败:', error)
        Taro.showToast({
          title: '微信登录失败',
          icon: 'error'
        })
      }
    })
  }

  return (
    <View className="page login-page">
      <View className="login-container">
        {/* Logo和标题 */}
        <View className="login-header">
          <Image 
            className="logo" 
            src="https://images.pexels.com/photos/3735173/pexels-photo-3735173.jpeg?auto=compress&cs=tinysrgb&w=200"
          />
          <Text className="app-name">智能垃圾回收</Text>
          <Text className="app-desc">让垃圾分类变得简单有趣</Text>
        </View>

        {/* 登录表单 */}
        <View className="login-form">
          <View className="form-item">
            <Text className="form-label">手机号</Text>
            <Input
              className="form-input"
              type="number"
              placeholder="请输入手机号"
              value={phone}
              onInput={(e) => setPhone(e.detail.value)}
              maxlength={11}
            />
          </View>

          <View className="form-item">
            <Text className="form-label">验证码</Text>
            <View className="code-input-row">
              <Input
                className="form-input code-input"
                type="number"
                placeholder="请输入验证码"
                value={code}
                onInput={(e) => setCode(e.detail.value)}
                maxlength={6}
              />
              <View 
                className={`code-btn ${countdown > 0 ? 'disabled' : ''}`}
                onClick={handleSendCode}
              >
                <Text>
                  {countdown > 0 ? `${countdown}s` : '发送验证码'}
                </Text>
              </View>
            </View>
          </View>

          <View 
            className={`login-btn btn btn-primary ${loading ? 'loading' : ''}`}
            onClick={handleLogin}
          >
            <Text>{loading ? '登录中...' : '立即登录'}</Text>
          </View>
        </View>

        {/* 分割线 */}
        <View className="divider">
          <View className="divider-line"></View>
          <Text className="divider-text">或</Text>
          <View className="divider-line"></View>
        </View>

        {/* 第三方登录 */}
        <View className="third-login">
          <View className="wechat-login-btn" onClick={handleWeChatLogin}>
            <View className="wechat-icon">🟢</View>
            <Text className="wechat-text">微信快速登录</Text>
          </View>
        </View>

        {/* 使用说明 */}
        <View className="login-tips">
          <Text className="tips-text">
            登录即表示同意《用户协议》和《隐私政策》
          </Text>
          <Text className="demo-tips">
            演示账号: 任意手机号 验证码: 123456
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Login