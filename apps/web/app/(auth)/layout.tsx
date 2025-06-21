export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // You can add authentication check here
  // const session = await getSession()
  // if (!session) redirect('/sign-in')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto max-w-md py-6 px-4 sm:px-6 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
