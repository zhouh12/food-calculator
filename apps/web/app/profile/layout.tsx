import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // You can add authentication check here
  // const session = await getSession()
  // if (!session) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">{children}</div>
      </div>
    </div>
  )
}
