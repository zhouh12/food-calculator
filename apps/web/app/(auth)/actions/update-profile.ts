'use server'

import { updateProfile as updateProfileCore } from '../../../core/users/update-profile'
import { revalidatePath } from 'next/cache'
import { UpdateProfileRequest } from '../../../core/users/update-profile'

export async function updateProfile(data: UpdateProfileRequest) {
  return updateProfileCore({
    age: data.age,
    weight: data.weight,
    goal: data.goal,
    workoutsPerWeek: data.workoutsPerWeek,
    gender: data.gender,
    height: data.height,
    activityLevel: data.activityLevel,
  })
}

type OnboardingStepData = {
  step: number
  goal?: 'lose_fat' | 'build_muscle' | 'improve_fitness' | 'maintain_weight'
  gender?: 'male' | 'female'
  age?: number
  height?: number
  weight?: number
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active'
}

function mapGoalToDbValue(goal: string): UpdateProfileRequest['goal'] {
  switch (goal) {
    case 'lose_fat':
      return 'LOSE_FAT'
    case 'build_muscle':
    case 'improve_fitness':
      return 'GAIN_WEIGHT'
    case 'maintain_weight':
      return 'MAINTAIN'
    default:
      return 'MAINTAIN'
  }
}

function mapGenderToDbValue(gender: string): UpdateProfileRequest['gender'] {
  return gender.toUpperCase() as UpdateProfileRequest['gender']
}

function mapActivityToDbValue(activity: string): UpdateProfileRequest['activityLevel'] {
  switch (activity) {
    case 'sedentary':
      return 'LOW'
    case 'lightly_active':
      return 'MODERATE'
    case 'moderately_active':
    case 'very_active':
      return 'HIGH'
    default:
      return 'MODERATE'
  }
}

// New action for saving onboarding step data
export async function saveOnboardingStep(stepData: OnboardingStepData) {
  try {
    // Only save if we have complete data for the final step
    if (
      stepData.step === 6 &&
      stepData.goal &&
      stepData.gender &&
      stepData.age &&
      stepData.height &&
      stepData.weight &&
      stepData.activityLevel
    ) {
      const profileData: UpdateProfileRequest = {
        goal: mapGoalToDbValue(stepData.goal),
        gender: mapGenderToDbValue(stepData.gender),
        age: stepData.age,
        height: stepData.height,
        weight: stepData.weight,
        activityLevel: mapActivityToDbValue(stepData.activityLevel),
        workoutsPerWeek: 3, // Default value
      }

      const result = await updateProfileCore(profileData)

      // Revalidate the profile page cache
      revalidatePath('/profile')

      return { success: true, data: result }
    }

    return { success: true, data: null }
  } catch (error) {
    console.error('Failed to save onboarding step:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save data',
    }
  }
}
