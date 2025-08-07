import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface EmptyProps {
  image?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

const Empty: React.FC<EmptyProps> = ({ 
  image = 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=200',
  title = '暂无数据',
  description,
  children
}) => {
  return (
    <View className="empty">
      <Image className="empty__image" src={image} mode="aspectFit" />
      <View className="empty__title">{title}</View>
      {description && (
        <View className="empty__description">{description}</View>
      )}
      {children && (
        <View className="empty__action">{children}</View>
      )}
    </View>
  )
}

export default Empty