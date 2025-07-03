'use server'

import { createUser } from '@/core/users/create-user'

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  return createUser({ name, email, password })
}
