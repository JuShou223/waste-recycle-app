import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import { navigateBack, showToast } from '@tarojs/taro'
import { Button, Card } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = () => {
    if (!phone || phone.length !== 11) {
      showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    // 模拟发送验证码
    showToast({
      title: '验证码已发送',
      icon: 'success'
    })

    // 开始倒计时
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = () => {
    if (!phone || !code) {
      showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 模拟登录
    showToast({
      title: '登录成功',
      icon: 'success'
    })

    setTimeout(() => {
      navigateBack()
    }, 1500)
  }

  const handleWechatLogin = () => {
    showToast({
      title: '微信登录功能开发中',
      icon: 'none'
    })
  }

  return (
    <View className='login-container'>
      <View className='login-header'>
        <Text className='app-logo'>♻️</Text>
        <Text className='app-name'>智能回收</Text>
        <Text className='app-slogan'>让垃圾分类变得简单</Text>
      </View>

      <Card className='login-form'>
        <View className='form-item'>
          <Text className='form-label'>手机号</Text>
          <Input
            className='form-input'
            type='number'
            placeholder='请输入手机号'
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
            maxlength={11}
          />
        </View>

        <View className='form-item'>
          <Text className='form-label'>验证码</Text>
          <View className='code-input-group'>
            <Input
              className='form-input code-input'
              type='number'
              placeholder='请输入验证码'
              value={code}
              onInput={(e) => setCode(e.detail.value)}
              maxlength={6}
            />
            <Button
              size='small'
              type='default'
              className='send-code-btn'
              disabled={countdown > 0}
              onClick={handleSendCode}
            >
              {countdown > 0 ? `${countdown}s` : '发送验证码'}
            </Button>
          </View>
        </View>

        <Button
          type='primary'
          className='login-btn'
          onClick={handleLogin}
        >
          登录
        </Button>

        <View className='divider'>
          <Text className='divider-text'>或</Text>
        </View>

        <Button
          type='default'
          className='wechat-login-btn'
          onClick={handleWechatLogin}
        >
          <Text className='wechat-icon'>💬</Text>
          微信快速登录
        </Button>
      </Card>

      <View className='login-footer'>
        <Text className='footer-text'>登录即表示同意</Text>
        <Text className='footer-link'>《用户协议》</Text>
        <Text className='footer-text'>和</Text>
        <Text className='footer-link'>《隐私政策》</Text>
      </View>
    </View>
  )
}