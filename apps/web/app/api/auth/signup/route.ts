import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '../../../../core/users/create-user'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  const result = await createUser({ name, email, password })

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
}
