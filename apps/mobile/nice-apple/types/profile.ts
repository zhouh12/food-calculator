// 健身目标类型
export interface FitnessGoal {
  id: string
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  gradientColors: string[]
}

// 用户资料类型
export interface UserProfile {
  fitnessGoal: string
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

// 活动水平枚举
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'

// 经验水平枚举
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

// 用户偏好设置
export interface UserPreferences {
  units: 'metric' | 'imperial'
  notifications: boolean
  reminderTimes: string[]
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening'
  theme: 'light' | 'dark' | 'auto'
}

// 表单验证接口
export interface FormValidation {
  isValid: boolean
  errors: Record<string, string>
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 健身目标选项常量
export const FITNESS_GOALS: FitnessGoal[] = [
  {
    id: 'lose-fat',
    title: 'Lose Fat',
    description: 'Burn fat and get leaner',
    icon: '🔥',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    gradientColors: ['#fff7ed', '#fed7aa'],
  },
  {
    id: 'build-muscle',
    title: 'Build Muscle',
    description: 'Get stronger and gain muscle',
    icon: '💪',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    gradientColors: ['#faf5ff', '#e9d5ff'],
  },
  {
    id: 'maintain-weight',
    title: 'Maintain Weight',
    description: 'Stay at your current weight',
    icon: '⚖️',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 border-gray-200',
    gradientColors: ['#f9fafb', '#e5e7eb'],
  },
]

// 活动水平选项
export const ACTIVITY_LEVELS = [
  {
    id: 'sedentary' as ActivityLevel,
    title: 'Sedentary',
    description: 'Little to no exercise',
    multiplier: 1.2,
  },
  {
    id: 'light' as ActivityLevel,
    title: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
    multiplier: 1.375,
  },
  {
    id: 'moderate' as ActivityLevel,
    title: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
    multiplier: 1.55,
  },
  {
    id: 'active' as ActivityLevel,
    title: 'Very Active',
    description: 'Heavy exercise 6-7 days/week',
    multiplier: 1.725,
  },
  {
    id: 'very-active' as ActivityLevel,
    title: 'Extra Active',
    description: 'Very heavy exercise & physical job',
    multiplier: 1.9,
  },
]
