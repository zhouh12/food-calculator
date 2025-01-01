import { getServerSession } from 'next-auth'
import { db } from '../../db/drizzle'
import { eq } from 'drizzle-orm'
import { users } from '../../db/schema/users'
import { profiles } from '../../db/schema/profiles'
import { UserGoal } from '../types/profile'

type UpdateProfileRequest = {
  age: number
  weight: number
  goal: UserGoal
  workoutsPerWeek: number
  gender: 'MALE' | 'FEMALE' | 'OTHER'
}

type UpdateProfileResponse = {
  success?: boolean
  error?: string
}

export async function updateProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const session = await getServerSession()

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

    await db.insert(profiles).values({
      UserId: user.Id,
      Age: request.age,
      Weight: request.weight,
      Goal: request.goal,
      WorkoutsPerWeek: request.workoutsPerWeek,
      Gender: request.gender,
    })

    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    return { error: 'Failed to save profile' }
  }
}
