import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/dashboard')

  // This will never be rendered
  return null
}
