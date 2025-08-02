import { ActivityLevel, Gender, UserGoal } from '@/server/user/types'

export interface UpdateProfileRequest {
  name: string
  email: string
  age: number
  height: number
  currentWeight: number
  targetWeight: number
  goal: UserGoal
  gender: Gender
  activityLevel: ActivityLevel
  workoutsPerWeek: number
  onboardingCompleted?: boolean
  profileCompleted?: boolean
  createdAt: string
  updatedAt?: string
}
