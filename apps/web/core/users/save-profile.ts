import { getServerSession } from 'next-auth'
import { authOptions } from '@/core/types/auth'
import { db } from '@/db/drizzle'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema/users'
import { profiles } from '@/db/schema/profiles'

export type UserGoal = 'LOSE_FAT' | 'MAINTAIN' | 'BUILD_MUSCLE'

export type UpdateProfileRequest = {
  age: number
  weight: number
  goal: UserGoal
  workoutsPerWeek: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  height: number
  activityLevel: 'LOW' | 'MODERATE' | 'HIGH'
}

type UpdateProfileResponse = {
  success?: boolean
  error?: string
}

export async function saveProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { error: 'Unauthorized' }
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.Email, session.user.email))
      .limit(1)
      .then((rows) => rows[0])

    if (!user) {
      return { error: 'User not found' }
    }

    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.UserId, user.Id))
      .limit(1)
      .then((rows) => rows[0])

    if (existingProfile) {
      await db
        .update(profiles)
        .set({
          Age: request.age,
          Weight: request.weight,
          Goal: request.goal,
          Gender: request.gender,
          ActivityLevel: request.activityLevel,
          Height: request.height,
        })
        .where(eq(profiles.UserId, user.Id))
    } else {
      await db.insert(profiles).values({
        UserId: user.Id,
        Age: request.age,
        Weight: request.weight,
        Goal: request.goal,
        Gender: request.gender,
        ActivityLevel: request.activityLevel,
        Height: request.height,
      })
    }
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    return { error: 'Failed to save profile' }
  }
}
