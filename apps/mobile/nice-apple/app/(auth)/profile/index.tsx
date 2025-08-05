import React, { useState } from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  FadeInUp,
} from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { FITNESS_GOALS } from '../../../types/profile'
import { ProfileManager } from '../../../utils/profileManager'
import { UserGoal } from '@core/types/server'
import AnimatedButton from '@/components/ui/AnimatedButton'
import AnimatedProgressBar from '@/components/ui/AnimatedProgressBar'
import AnimatedGoalCard from './components/AnimatedGoalCard'

export default function FitnessGoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<UserGoal>('BUILD_MUSCLE')

  const handleNext = async () => {
    try {
      await ProfileManager.saveProfile({ fitnessGoal: selectedGoal })
      await ProfileManager.saveOnboardingStep(2)

      console.log('Selected goal:', selectedGoal)

      router.push('/(auth)/profile/step2')
    } catch (error) {
      console.error('Failed to save fitness goal:', error)
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
        <AnimatedProgressBar currentStep={1} totalSteps={6} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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

        <View className="absolute bottom-8 left-6 right-6">
          <AnimatedButton onPress={handleNext} disabled={!selectedGoal} title="Next" />
        </View>
      </View>
    </SafeAreaView>
  )
}
