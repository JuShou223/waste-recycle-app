import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  show?: boolean
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = '加载中...', 
  show = true 
}) => {
  if (!show) return null

  return (
    <View className="loading">
      <View className={`loading__spinner loading__spinner--${size}`}>
        <View className="loading__dot"></View>
        <View className="loading__dot"></View>
        <View className="loading__dot"></View>
      </View>
      {text && <View className="loading__text">{text}</View>}
    </View>
  )
}

export default Loading