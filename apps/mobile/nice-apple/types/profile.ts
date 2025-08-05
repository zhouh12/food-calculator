import {
  UserGoal,
  ActivityLevel,
  ExperienceLevel,
  UserPreferences as SharedUserPreferences,
} from '@core/types/server'

export interface FitnessGoal {
  id: UserGoal
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  gradientColors: string[]
}

export interface UserProfile {
  fitnessGoal: UserGoal
  name?: string
  age?: number
  height?: number // cm
  currentWeight?: number // kg
  targetWeight?: number // kg
  activityLevel?: ActivityLevel
  workoutFrequency?: number // per week
  experience?: ExperienceLevel
  preferences?: UserPreferences
  onboardingCompleted?: boolean
  createdAt?: string
  updatedAt?: string
}
export interface UserPreferences extends SharedUserPreferences {
  theme: 'light' | 'dark' | 'auto'
}
export interface FormValidation {
  isValid: boolean
  errors: Record<string, string>
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export const FITNESS_GOALS: FitnessGoal[] = [
  {
    id: 'LOSE_FAT', // Updated to match shared type
    title: 'Lose Fat',
    description: 'Burn fat and get leaner',
    icon: '🔥',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    gradientColors: ['#fff7ed', '#fed7aa'],
  },
  {
    id: 'BUILD_MUSCLE', // Updated to match shared type
    title: 'Build Muscle',
    description: 'Get stronger and gain muscle',
    icon: '💪',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    gradientColors: ['#faf5ff', '#e9d5ff'],
  },
  {
    id: 'MAINTAIN', // Updated to match shared type
    title: 'Maintain Weight',
    description: 'Stay at your current weight',
    icon: '⚖️',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 border-gray-200',
    gradientColors: ['#f9fafb', '#e5e7eb'],
  },
]

// 活动水平选项 (updated to use shared ActivityLevel values)
export const ACTIVITY_LEVELS = [
  {
    id: 'SEDENTARY' as ActivityLevel,
    title: 'Sedentary',
    description: 'Little to no exercise',
    multiplier: 1.2,
  },
  {
    id: 'LIGHT' as ActivityLevel,
    title: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
    multiplier: 1.375,
  },
  {
    id: 'MODERATE' as ActivityLevel,
    title: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
    multiplier: 1.55,
  },
  {
    id: 'ACTIVE' as ActivityLevel,
    title: 'Very Active',
    description: 'Heavy exercise 6-7 days/week',
    multiplier: 1.725,
  },
  {
    id: 'VERY_ACTIVE' as ActivityLevel,
    title: 'Extra Active',
    description: 'Very heavy exercise & physical job',
    multiplier: 1.9,
  },
]
