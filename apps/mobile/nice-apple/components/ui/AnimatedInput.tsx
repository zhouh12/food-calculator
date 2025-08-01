import { useEffect, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function AnimatedInput({
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

  useEffect(() => {
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
