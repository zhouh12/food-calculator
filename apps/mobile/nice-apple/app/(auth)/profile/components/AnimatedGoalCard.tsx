import { FitnessGoal } from '@/types/profile'
import { useEffect } from 'react'
import { Pressable, View, Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  runOnJS,
  FadeInDown,
} from 'react-native-reanimated'

export default function AnimatedGoalCard({
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

  useEffect(() => {
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
