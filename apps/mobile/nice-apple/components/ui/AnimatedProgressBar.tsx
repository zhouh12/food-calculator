import { useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, {
  FadeInUp,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated'

export default function AnimatedProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
  const progress = useSharedValue(0)
  const targetProgress = (currentStep / totalSteps) * 100

  useEffect(() => {
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
        <Animated.View className="h-full bg-purple-600 rounded-full" style={progressStyle} />
      </View>
    </Animated.View>
  )
}
