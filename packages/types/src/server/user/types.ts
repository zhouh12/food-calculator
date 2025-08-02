// User Goals - Unified from both mobile and web
export type UserGoal = 'LOSE_FAT' | 'MAINTAIN' | 'BUILD_MUSCLE'

export type DietType = 'CLASSIC' | 'VEGETARIAN' | 'VEGAN' | 'LOW_CARB' | 'KETO'

// Activity Levels - Unified naming convention
export type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'ACTIVE' | 'VERY_ACTIVE'

// Gender Types
export type Gender = 'MALE' | 'FEMALE'

// Experience Level (for fitness apps)
export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

// Units preference
export type UnitsSystem = 'METRIC' | 'IMPERIAL'

// Workout time preference
export type WorkoutTimePreference = 'MORNING' | 'AFTERNOON' | 'EVENING'

export interface UserPreferences {
  units: UnitsSystem
  notifications: boolean
  reminderTimes: string[]
  preferredWorkoutTime: WorkoutTimePreference
}
