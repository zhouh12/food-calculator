export type UserGoal = 'GAIN_WEIGHT' | 'LOSE_FAT' | 'MAINTAIN'

export interface ProfileFormData {
  age: number
  weight: number
  goal: UserGoal
  workoutsPerWeek: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
}

export type ProfileStep = 'GENDER' | 'MEASUREMENTS' | 'COMPLETE'
