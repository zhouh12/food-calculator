import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { router } from 'expo-router'
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  withDelay,
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

// 输入字段组件
function AnimatedInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  suffix,
  index,
}: {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  keyboardType?: 'default' | 'numeric'
  suffix?: string
  index: number
}) {
  const [isFocused, setIsFocused] = useState(false)
  const focusAnimation = useSharedValue(0)

  React.useEffect(() => {
    focusAnimation.value = withTiming(isFocused ? 1 : 0, { duration: 200 })
  }, [isFocused])

  const animatedInputStyle = useAnimatedStyle(() => {
    const borderColor = focusAnimation.value > 0 ? '#8b5cf6' : '#e2e8f0'
    const backgroundColor = focusAnimation.value > 0 ? '#faf5ff' : '#ffffff'

    return {
      borderColor,
      backgroundColor,
      borderWidth: 2,
    }
  })

  return (
    <Animated.View className="mb-6" entering={FadeInDown.delay(index * 100).springify()}>
      <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
      <View className="relative">
        <Animated.View
          style={[
            animatedInputStyle,
            {
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 text-lg text-gray-900"
            placeholderTextColor="#9ca3af"
          />
          {suffix && <Text className="text-lg text-gray-500 ml-2">{suffix}</Text>}
        </Animated.View>
      </View>
    </Animated.View>
  )
}

// 进度条组件
function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = useSharedValue(0)
  const targetProgress = (currentStep / totalSteps) * 100

  React.useEffect(() => {
    progress.value = withDelay(
      300,
      withSpring(targetProgress, {
        damping: 15,
        stiffness: 150,
      })
    )
  }, [targetProgress])

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }))

  return (
    <Animated.View className="mb-8" entering={FadeInUp.delay(100).springify()}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-500 text-sm font-medium">
          Step {currentStep}/{totalSteps}
        </Text>
        <Animated.Text
          className="text-purple-600 text-sm font-bold"
          entering={SlideInRight.delay(200)}
        >
          {Math.round(targetProgress)}%
        </Animated.Text>
      </View>

      <View className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <Animated.View
          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
          style={progressStyle}
        />
      </View>
    </Animated.View>
  )
}

// 动画按钮组件
function AnimatedButton({
  onPress,
  disabled,
  title,
}: {
  onPress: () => void
  disabled: boolean
  title: string
}) {
  const buttonScale = useSharedValue(1)
  const buttonOpacity = useSharedValue(disabled ? 0.5 : 1)

  React.useEffect(() => {
    buttonOpacity.value = withTiming(disabled ? 0.5 : 1, { duration: 200 })
  }, [disabled])

  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = buttonOpacity.value > 0.8 ? '#8b5cf6' : '#d1d5db'

    return {
      backgroundColor,
      transform: [{ scale: buttonScale.value }],
    }
  })

  const handlePressIn = () => {
    if (!disabled) {
      buttonScale.value = withSpring(0.96)
    }
  }

  const handlePressOut = () => {
    buttonScale.value = withSpring(1)
    if (!disabled) {
      onPress()
    }
  }

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          animatedButtonStyle,
          {
            width: width - 48,
            height: 56,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: disabled ? '#000' : '#8b5cf6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: disabled ? 0.1 : 0.3,
            shadowRadius: 12,
            elevation: disabled ? 2 : 8,
          },
        ]}
      >
        <Text
          className={`
          text-lg font-bold
          ${disabled ? 'text-gray-500' : 'text-white'}
        `}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default function ProfileStep2() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const isFormValid = name.trim() && age.trim() && height.trim() && weight.trim()

  const handleNext = () => {
    console.log('User info:', { name, age, height, weight })
    // 保存用户信息
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
        {/* 进度条 */}
        <ProgressBar currentStep={2} totalSteps={6} />

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
          className="absolute bottom-8 left-6 right-6 flex-row space-x-4"
          entering={FadeInUp.delay(600).springify()}
        >
          <TouchableOpacity
            onPress={handleBack}
            className="flex-1 h-14 bg-gray-100 rounded-2xl items-center justify-center"
          >
            <Text className="text-lg font-semibold text-gray-700">Back</Text>
          </TouchableOpacity>

          <View className="flex-1">
            <AnimatedButton onPress={handleNext} disabled={!isFormValid} title="Next" />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}
