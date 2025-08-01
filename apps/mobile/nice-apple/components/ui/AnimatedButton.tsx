import { useEffect } from 'react'
import { TouchableOpacity, Text, Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export default function AnimatedButton({
  onPress,
  disabled,
  title,
}: {
  onPress: () => void
  disabled?: boolean
  title: string
}) {
  const { width } = Dimensions.get('window')
  const buttonScale = useSharedValue(1)
  const buttonOpacity = useSharedValue(disabled ? 0.5 : 1)

  useEffect(() => {
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
