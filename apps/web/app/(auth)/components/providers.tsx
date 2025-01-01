import { Button } from '@core/ui/components/button'
import Image from 'next/image'
import { Apple } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface AuthProvidersProps {
  isSignUp?: boolean
}

export default function AuthProviders({ isSignUp = false }: AuthProvidersProps) {
  const handleGoogleSignIn = () => {
    signIn('google')
  }

  const handleSignUp = () => {
    console.log('Sign up logic here')
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="flex justify-center space-x-4">
        <Button size="icon" variant="outline" className="w-12 h-12 rounded-full">
          <span className="text-2xl font-bold text-blue-600">f</span>
          <span className="sr-only">Sign in with Facebook</span>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-12 h-12 rounded-full p-0"
          onClick={isSignUp ? handleSignUp : handleGoogleSignIn}
        >
          <Image
            src="/icons/google.svg"
            width={24}
            height={24}
            alt="Google logo"
            className="w-6 h-6"
          />
          <span className="sr-only">
            {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
          </span>
        </Button>
        <Button size="icon" variant="outline" className="w-12 h-12 rounded-full">
          <Apple className="w-6 h-6" />
          <span className="sr-only">Sign in with Apple</span>
        </Button>
      </div>
    </div>
  )
}
