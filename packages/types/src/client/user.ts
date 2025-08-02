import { ActivityLevel, Gender, UserGoal } from '@/server/user/types'

export interface UserProfile {
  id: string
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
}
