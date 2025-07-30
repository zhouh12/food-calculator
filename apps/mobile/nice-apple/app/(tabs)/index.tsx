import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export default function HomeScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/profile')
  }

  const handleSignIn = () => {
    // 这里可以导航到登录页面
    console.log('Navigate to Sign In')
  }

  const buttonScale = useSharedValue(1)

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handleButtonPress = () => {
    // Simplified animation to avoid iOS crash
    buttonScale.value = withSpring(0.96, { duration: 100 })

    // Use setTimeout to avoid callback issues
    setTimeout(() => {
      buttonScale.value = withSpring(1)
      handleGetStarted()
    }, 100)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.contentSection}>
        <LinearGradient colors={['#ffffff', '#f8fafc']} style={styles.contentBackground}>
          {/* 标题 */}
          <Animated.View style={styles.titleContainer} entering={FadeInUp.delay(200).springify()}>
            <Text style={styles.title}>Calorie tracking</Text>
            <Text style={styles.title}>made easy</Text>
          </Animated.View>

          {/* 按钮区域 */}
          <Animated.View style={styles.buttonContainer} entering={FadeInUp.delay(400).springify()}>
            <TouchableOpacity onPress={handleButtonPress} activeOpacity={0.8}>
              <Animated.View
                style={[styles.getStartedButton, animatedButtonStyle]}
                className="bg-purple-900"
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInText}>
                Already have an account? <Text style={styles.signInLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentSection: {
    flex: 1,
  },
  contentBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 42,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    width: width - 48,
    height: 60,
    backgroundColor: '#514EF3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signInText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  signInLink: {
    color: '#000000',
    fontWeight: '600',
  },
})
