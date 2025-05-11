export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // You can add authentication check here
  // const session = await getSession()
  // if (!session) redirect('/sign-in')

  return (
    // <div className="min-h-scree">
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="max-w-md mx-auto">{children}</div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md rounded-lg border border-border bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
