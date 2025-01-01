import { useSession, signIn, signOut } from 'next-auth/react'

export default function ProtectedPage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }

  return (
    <div>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
