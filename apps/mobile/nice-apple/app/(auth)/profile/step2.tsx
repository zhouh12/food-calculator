import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import ProgressBar from '../../../components/ui/AnimatedProgressBar'
import AnimatedButton from '@/components/ui/AnimatedButton'
import AnimatedInput from '@/components/ui/AnimatedInput'

export default function ProfileStep2() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const isFormValid = name.trim() && age.trim() && height.trim() && weight.trim()

  const handleNext = () => {
    router.push('/(auth)/profile/step3')
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
            <ProgressBar currentStep={2} totalSteps={6} />
          </View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* 标题区域 */}
          <Animated.View className="mb-8" entering={FadeInUp.delay(200).springify()}>
            <Text className="text-3xl font-bold text-gray-900 mb-4">Tell us about yourself</Text>
            <Text className="text-xl text-gray-700 leading-7">
              Help us personalize your fitness journey
            </Text>
          </Animated.View>

          {/* 输入字段 */}
          <View className="mb-8">
            <AnimatedInput
              label="What's your name?"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              index={0}
            />

            <AnimatedInput
              label="How old are you?"
              value={age}
              onChangeText={setAge}
              placeholder="25"
              keyboardType="numeric"
              suffix="years"
              index={1}
            />

            <AnimatedInput
              label="What's your height?"
              value={height}
              onChangeText={setHeight}
              placeholder="170"
              keyboardType="numeric"
              suffix="cm"
              index={2}
            />

            <AnimatedInput
              label="What's your current weight?"
              value={weight}
              onChangeText={setWeight}
              placeholder="70"
              keyboardType="numeric"
              suffix="kg"
              index={3}
            />
          </View>
        </ScrollView>

        {/* 底部按钮 */}
        <Animated.View
          className="absolute bottom-8 left-6 right-6"
          entering={FadeInUp.delay(600).springify()}
        >
          <AnimatedButton onPress={handleNext} disabled={!isFormValid} title="Next" />
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
