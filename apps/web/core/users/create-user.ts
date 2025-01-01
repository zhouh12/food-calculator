import { hash } from 'bcryptjs'
import { db } from '../../db/drizzle'
import { users } from '../../db/schema/users'

type CreateUserRequest = {
  name: string
  email: string
  password: string
}

type CreateUserResponse = {
  success?: boolean
  error?: string
}

export async function createUser({
  name,
  email,
  password,
}: CreateUserRequest): Promise<CreateUserResponse> {
  if (!name || !email || !password) {
    return { error: 'All fields are required' }
  }

  try {
    const hashedPassword = await hash(password, 10)

    await db.insert(users).values({
      Name: name,
      Email: email,
      Password: hashedPassword,
    })

    return { success: true }
  } catch (error) {
    return { error: 'User already exists or database error' }
  }
}
