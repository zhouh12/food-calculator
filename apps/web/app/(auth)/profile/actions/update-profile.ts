'use server'

import { updateProfile as updateProfileCore } from '../../../../core/users/update-profile'
import { ProfileFormData } from '../../../../core/types/profile'

export async function updateProfile(data: ProfileFormData) {
  return updateProfileCore({
    age: data.age,
    weight: data.weight,
    goal: data.goal,
    workoutsPerWeek: data.workoutsPerWeek,
    gender: data.gender,
  })
}
