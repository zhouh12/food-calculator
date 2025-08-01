import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import ProgressBar from '../../../components/ui/AnimatedProgressBar'
import AnimatedButton from '@/components/ui/AnimatedButton'

// 简化的进度指示器组件
function SimpleProgress({
  value,
  label,
  unit,
  color,
}: {
  value: number
  label: string
  unit: string
  color: string
}) {
  return (
    <Animated.View
      className="items-center bg-white rounded-2xl p-4 shadow-sm"
      entering={FadeInUp.delay(600).springify()}
    >
      <View
        className="w-20 h-20 rounded-full border-4 border-gray-200 items-center justify-center mb-3"
        style={{ borderTopColor: color, borderRightColor: color }}
      >
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-900">{value}</Text>
          {unit && <Text className="text-xs text-gray-500">{unit}</Text>}
        </View>
      </View>

      <Text className="text-sm font-medium text-gray-700">{label}</Text>
    </Animated.View>
  )
}

export default function ProfileStep3() {
  const handleGetStarted = () => {
    // 导航到主应用
    router.push('/(tabs)')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* 背景渐变 */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#ffffff', '#fafafa', '#f3f4f6']}
          locations={[0, 0.7, 1]}
          style={{ flex: 1 }}
        />
      </View>

      <View className="flex-1 px-6 pt-6">
        {/* 顶部导航区域 */}
        <Animated.View
          className="flex-row items-center mb-8"
          entering={FadeInUp.delay(100).springify()}
        >
          {/* 返回按钮 */}
          <TouchableOpacity
            onPress={handleBack}
            className="w-10 h-10 bg-purple-600 rounded-full items-center justify-center mr-4 shadow-md shadow-purple-500/20"
          >
            <Text className="text-white text-lg font-semibold">←</Text>
          </TouchableOpacity>

          {/* 进度条 */}
          <View className="flex-1">
            <ProgressBar currentStep={6} totalSteps={6} />
          </View>
        </Animated.View>

        <View className="flex-1 items-center justify-center px-4">
          {/* 标题 */}
          <Animated.View className="items-center mb-12" entering={FadeInUp.delay(400).springify()}>
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Congratulations
            </Text>
            <Text className="text-3xl font-bold text-gray-900 text-center mb-6">
              your custom plan is ready!
            </Text>

            <Text className="text-xl text-gray-700 text-center mb-2">You should gain:</Text>
            <Text className="text-2xl font-bold text-gray-900">5 kg by June 13</Text>
          </Animated.View>

          {/* 每日推荐 */}
          <Animated.View className="w-full mb-12" entering={FadeInUp.delay(500).springify()}>
            <View className="bg-gray-50 rounded-2xl p-6">
              <Text className="text-xl font-bold text-gray-900 mb-2">Daily recommendation</Text>
              <Text className="text-gray-600 mb-6">You can edit this anytime</Text>

              {/* 营养指标网格 */}
              <View className="flex-row flex-wrap justify-between">
                <View className="w-[48%] mb-4">
                  <SimpleProgress value={2689} label="Calories" unit="" color="#6b7280" />
                </View>
                <View className="w-[48%] mb-4">
                  <SimpleProgress value={324} label="Carbs" unit="g" color="#f59e0b" />
                </View>
                <View className="w-[48%]">
                  <SimpleProgress value={180} label="Protein" unit="g" color="#ef4444" />
                </View>
                <View className="w-[48%]">
                  <SimpleProgress value={74} label="Fats" unit="g" color="#3b82f6" />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* 底部按钮 */}
        <Animated.View className="pb-2" entering={FadeInUp.delay(700).springify()}>
          <AnimatedButton onPress={handleGetStarted} title="Let's get started!" />
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
