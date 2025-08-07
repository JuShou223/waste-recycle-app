import { View, Text, Button } from '@tarojs/components'
import { showToast, scanCode } from '@tarojs/taro'
import { Card } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Scan() {
  const handleScan = async () => {
    try {
      const result = await scanCode({
        scanType: ['qrCode', 'barCode']
      })
      
      // Simulate box opening process
      showToast({
        title: '正在开启回收箱...',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(() => {
        showToast({
          title: '回收箱已开启',
          icon: 'success'
        })
      }, 2000)

    } catch (error) {
      showToast({
        title: '扫码失败，请重试',
        icon: 'none'
      })
    }
  }

  const handleManualInput = () => {
    showToast({
      title: '手动输入功能开发中',
      icon: 'none'
    })
  }

  return (
    <View className='scan-container'>
      <View className='scan-header'>
        <Text className='header-title'>扫码开箱</Text>
        <Text className='header-subtitle'>扫描回收箱上的二维码</Text>
      </View>

      <View className='scan-area'>
        <View className='qr-frame'>
          <View className='corner top-left'></View>
          <View className='corner top-right'></View>
          <View className='corner bottom-left'></View>
          <View className='corner bottom-right'></View>
          <Text className='scan-hint'>将二维码放入框内</Text>
        </View>
      </View>

      <View className='action-section'>
        <Button 
          type='primary' 
          className='scan-btn'
          onClick={handleScan}
        >
          开始扫码
        </Button>
        
        <Button 
          type='default' 
          className='manual-btn'
          onClick={handleManualInput}
        >
          手动输入设备编号
        </Button>
      </View>

      <Card className='instructions-card'>
        <View className='card-title'>使用说明</View>
        <View className='instruction-list'>
          <View className='instruction-item'>
            <Text className='instruction-number'>1</Text>
            <Text className='instruction-text'>找到回收箱上的二维码标识</Text>
          </View>
          <View className='instruction-item'>
            <Text className='instruction-number'>2</Text>
            <Text className='instruction-text'>点击"开始扫码"按钮进行扫描</Text>
          </View>
          <View className='instruction-item'>
            <Text className='instruction-number'>3</Text>
            <Text className='instruction-text'>扫码成功后回收箱将自动开启</Text>
          </View>
          <View className='instruction-item'>
            <Text className='instruction-number'>4</Text>
            <Text className='instruction-text'>投递完成后盖子会自动关闭</Text>
          </View>
        </View>
      </Card>

      <Card className='tips-card'>
        <View className='card-title'>温馨提示</View>
        <View className='tips-content'>
          <Text className='tip-text'>• 请确保垃圾分类正确</Text>
          <Text className='tip-text'>• 投递时请轻拿轻放</Text>
          <Text className='tip-text'>• 重量越大积分越多</Text>
          <Text className='tip-text'>• 如遇故障请联系客服</Text>
        </View>
      </Card>
    </View>
  )
}