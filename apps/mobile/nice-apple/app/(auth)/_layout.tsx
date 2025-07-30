import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in/index"
        options={{
          headerShown: false,
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="sign-up/index"
        options={{
          headerShown: false,
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
          title: 'Fitness Goal',
        }}
      />
      <Stack.Screen
        name="profile/step2"
        options={{
          headerShown: false,
          title: 'Personal Info',
        }}
      />
      <Stack.Screen
        name="profile/step3"
        options={{
          headerShown: false,
          title: 'Activity Level',
        }}
      />
    </Stack>
  )
}
