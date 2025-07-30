import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, Dimensions } from 'react-native'
import { router } from 'expo-router'
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolateColor,
  runOnJS,
  withSequence,
  withDelay,
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { FITNESS_GOALS, FitnessGoal } from '../../../types/profile'
import { ProfileManager } from '../../../utils/profileManager'

const { width } = Dimensions.get('window')

// 动画进度条组件
function AnimatedProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
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

// 动画版目标卡片组件
function AnimatedGoalCard({
  goal,
  isSelected,
  onSelect,
  index,
}: {
  goal: FitnessGoal
  isSelected: boolean
  onSelect: () => void
  index: number
}) {
  const scale = useSharedValue(1)
  const selected = useSharedValue(isSelected ? 1 : 0)
  const iconScale = useSharedValue(1)
  const cardElevation = useSharedValue(isSelected ? 8 : 2)

  React.useEffect(() => {
    selected.value = withTiming(isSelected ? 1 : 0, {
      duration: 300,
    })
    cardElevation.value = withSpring(isSelected ? 8 : 2)

    if (isSelected) {
      iconScale.value = withSequence(
        withSpring(1.3, { damping: 10 }),
        withSpring(1, { damping: 10 })
      )
    }
  }, [isSelected])

  const animatedCardStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(selected.value, [0, 1], ['#ffffff', '#f3e8ff'])

    const borderColor = interpolateColor(selected.value, [0, 1], ['#e2e8f0', '#8b5cf6'])

    const shadowOpacity = selected.value * 0.2 + 0.05

    return {
      backgroundColor,
      borderColor,
      transform: [{ scale: scale.value }],
      borderWidth: 2,
      shadowOpacity,
      elevation: cardElevation.value,
    }
  })

  const animatedIconStyle = useAnimatedStyle(() => {
    const iconBgColor = interpolateColor(selected.value, [0, 1], ['#ffffff', '#8b5cf6'])

    return {
      backgroundColor: iconBgColor,
      transform: [{ scale: iconScale.value }],
    }
  })

  const animatedCheckStyle = useAnimatedStyle(() => {
    const checkScale = selected.value
    const checkOpacity = selected.value

    return {
      transform: [{ scale: checkScale }],
      opacity: checkOpacity,
    }
  })

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 })
    runOnJS(onSelect)()
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            animatedCardStyle,
            {
              padding: 20,
              borderRadius: 20,
              marginBottom: 16,
              shadowColor: isSelected ? '#8b5cf6' : '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 12,
            },
          ]}
        >
          <View className="flex-row items-center">
            {/* 动画图标 */}
            <Animated.View
              className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
              style={animatedIconStyle}
            >
              <Text className="text-2xl">{goal.icon}</Text>
            </Animated.View>

            {/* 文本内容 */}
            <View className="flex-1">
              <Text
                className={`
                text-xl font-bold mb-2
                ${isSelected ? 'text-purple-900' : 'text-gray-900'}
              `}
              >
                {goal.title}
              </Text>
              <Text
                className={`
                text-base leading-5
                ${isSelected ? 'text-purple-700' : 'text-gray-600'}
              `}
              >
                {goal.description}
              </Text>
            </View>

            {/* 选中指示器 */}
            <Animated.View
              className="w-8 h-8 bg-purple-600 rounded-full items-center justify-center"
              style={animatedCheckStyle}
            >
              <Text className="text-white text-sm font-bold">✓</Text>
            </Animated.View>
          </View>
        </Animated.View>
      </Pressable>
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
    const backgroundColor = interpolateColor(buttonOpacity.value, [0.5, 1], ['#d1d5db', '#8b5cf6'])

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
      runOnJS(onPress)()
    }
  }

  return (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled}>
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
      </Pressable>
    </Animated.View>
  )
}

// 主页面组件
export default function FitnessGoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string>('build-muscle')

  const handleNext = async () => {
    try {
      // 保存选择的健身目标
      await ProfileManager.saveProfile({ fitnessGoal: selectedGoal })
      await ProfileManager.saveOnboardingStep(2)

      console.log('Selected goal:', selectedGoal)

      // 导航到下一步
      router.push('/(auth)/profile/step2')
    } catch (error) {
      console.error('Failed to save fitness goal:', error)
      // 这里可以显示错误提示
    }
  }

  const headerOpacity = useSharedValue(0)

  React.useEffect(() => {
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 600 }))
  }, [])

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }))

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
        <AnimatedProgressBar currentStep={1} totalSteps={6} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* 标题区域 */}
          <Animated.View className="mb-8" style={headerStyle}>
            <Animated.Text
              className="text-3xl font-bold text-gray-900 mb-4"
              entering={FadeInUp.delay(300).springify()}
            >
              Welcome! Let&apos;s get started
            </Animated.Text>
            <Animated.Text
              className="text-xl text-gray-700 leading-7"
              entering={FadeInUp.delay(400).springify()}
            >
              What is your primary fitness goal?
            </Animated.Text>
          </Animated.View>

          {/* 目标选项 */}
          <View className="mb-8">
            {FITNESS_GOALS.map((goal, index) => (
              <AnimatedGoalCard
                key={goal.id}
                goal={goal}
                index={index}
                isSelected={selectedGoal === goal.id}
                onSelect={() => setSelectedGoal(goal.id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* 底部按钮 */}
        <View className="absolute bottom-8 left-6 right-6">
          <AnimatedButton onPress={handleNext} disabled={!selectedGoal} title="Next" />
        </View>
      </View>
    </SafeAreaView>
  )
}
