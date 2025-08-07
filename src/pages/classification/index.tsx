import { View, Text, Image } from '@tarojs/components'
import { Card } from '@nutui/nutui-react-taro'
import './index.scss'

export default function Classification() {
  const categories = [
    {
      id: 1,
      name: '可回收垃圾',
      color: '#1890ff',
      icon: '♻️',
      description: '适宜回收和资源利用的垃圾',
      examples: ['纸类', '塑料', '金属', '玻璃', '织物'],
      details: [
        '废纸：报纸、期刊、图书、各种包装纸等',
        '塑料：塑料瓶、塑料包装盒、泡沫塑料等',
        '金属：铁罐头盒、易拉罐、废铁丝等',
        '玻璃：玻璃瓶、平板玻璃、镜子等',
        '织物：废衣服、床单、毛巾等'
      ],
      tips: '投递前请清洗干净，去除食物残渣'
    },
    {
      id: 2,
      name: '厨余垃圾',
      color: '#52c41a',
      icon: '🥬',
      description: '易腐烂的生物质生活废弃物',
      examples: ['蔬菜', '水果', '肉类', '蛋壳', '茶叶渣'],
      details: [
        '蔬菜：菜叶、菜根、菜皮等植物性食物残余',
        '水果：果皮、果肉、果核等',
        '肉类：各种肉类、鱼类及其加工食品废料',
        '蛋类：蛋壳、变质蛋类',
        '其他：茶叶渣、咖啡渣、中药渣等'
      ],
      tips: '沥干水分后投放，避免包装物混入'
    },
    {
      id: 3,
      name: '有害垃圾',
      color: '#ff4d4f',
      icon: '⚠️',
      description: '对人体健康或自然环境造成危害的垃圾',
      examples: ['电池', '灯管', '药品', '油漆', '杀虫剂'],
      details: [
        '电池：干电池、纽扣电池、充电电池等',
        '灯管：荧光灯管、节能灯等含汞灯具',
        '药品：过期药品及其包装物',
        '日化：油漆、溶剂、杀虫剂、消毒剂等',
        '电子：废旧电子产品及其部件'
      ],
      tips: '单独收集，不可混入其他垃圾，定期送到指定回收点'
    },
    {
      id: 4,
      name: '其他垃圾',
      color: '#666',
      icon: '🗑️',
      description: '除上述几类垃圾之外的其他生活废弃物',
      examples: ['烟蒂', '尿不湿', '陶瓷', '尘土', '一次性餐具'],
      details: [
        '卫生间废物：卫生巾、尿不湿、猫砂等',
        '烟蒂：香烟头、烟丝等',
        '灰尘：打扫卫生产生的灰尘、渣土等',
        '破损物品：破损陶瓷、玻璃等',
        '其他：污染严重的纸张、废旧家具等大件垃圾'
      ],
      tips: '尽量沥干水分，用袋子包好投放'
    }
  ]

  const quickGuide = [
    { question: '牛奶盒属于什么垃圾？', answer: '可回收垃圾（清洗干净后）', category: 'recyclable' },
    { question: '用过的纸巾属于什么垃圾？', answer: '其他垃圾', category: 'other' },
    { question: '过期化妆品属于什么垃圾？', answer: '有害垃圾', category: 'harmful' },
    { question: '骨头属于什么垃圾？', answer: '厨余垃圾', category: 'kitchen' }
  ]

  return (
    <View className='classification-container'>
      {/* Header */}
      <View className='classification-header'>
        <Text className='header-title'>垃圾分类指引</Text>
        <Text className='header-subtitle'>正确分类，保护环境</Text>
      </View>

      {/* Categories */}
      <View className='categories-section'>
        {categories.map((category) => (
          <Card key={category.id} className='category-card'>
            <View className='category-header' style={{ borderLeftColor: category.color }}>
              <View className='category-info'>
                <Text className='category-icon'>{category.icon}</Text>
                <View className='category-text'>
                  <Text className='category-name' style={{ color: category.color }}>
                    {category.name}
                  </Text>
                  <Text className='category-desc'>{category.description}</Text>
                </View>
              </View>
            </View>

            <View className='category-examples'>
              <Text className='examples-title'>主要包括：</Text>
              <View className='examples-tags'>
                {category.examples.map((example, index) => (
                  <Text 
                    key={index} 
                    className='example-tag'
                    style={{ 
                      background: `${category.color}20`,
                      color: category.color 
                    }}
                  >
                    {example}
                  </Text>
                ))}
              </View>
            </View>

            <View className='category-details'>
              <Text className='details-title'>详细说明：</Text>
              {category.details.map((detail, index) => (
                <Text key={index} className='detail-item'>• {detail}</Text>
              ))}
            </View>

            <View className='category-tips'>
              <Text className='tips-icon'>💡</Text>
              <Text className='tips-text'>{category.tips}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Quick Guide */}
      <View className='guide-section'>
        <Text className='section-title'>快速问答</Text>
        <Card className='guide-card'>
          {quickGuide.map((item, index) => (
            <View key={index} className='guide-item'>
              <Text className='guide-question'>Q: {item.question}</Text>
              <Text className='guide-answer'>A: {item.answer}</Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Tips */}
      <Card className='tips-section'>
        <Text className='section-title'>投递小贴士</Text>
        <View className='tips-list'>
          <View className='tip-item'>
            <Text className='tip-icon'>🎯</Text>
            <Text className='tip-text'>投递前确认分类正确，避免混合投放</Text>
          </View>
          <View className='tip-item'>
            <Text className='tip-icon'>🧽</Text>
            <Text className='tip-text'>可回收物品请清洗干净，去除食物残渣</Text>
          </View>
          <View className='tip-item'>
            <Text className='tip-icon'>📦</Text>
            <Text className='tip-text'>大件物品请拆解后分类投放</Text>
          </View>
          <View className='tip-item'>
            <Text className='tip-icon'>⏰</Text>
            <Text className='tip-text'>厨余垃圾请及时投放，避免长期存放</Text>
          </View>
        </View>
      </Card>
    </View>
  )
}