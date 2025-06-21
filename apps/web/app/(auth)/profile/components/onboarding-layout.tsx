import { ProgressBar } from './progress-bar'

type OnboardingLayoutProps = {
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  title: string
  subtitle?: string
  onNext: () => void
  nextButtonText?: string
  hideNextButton?: boolean
  onSkip?: () => void
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
  onNext,
  nextButtonText = 'Next',
  hideNextButton = false,
  onSkip,
}: OnboardingLayoutProps) {
  return (
    <>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mb-6">
        <h1 className="text-center mb-2">{title}</h1>
        {subtitle && <p className="text-center text-gray-600">{subtitle}</p>}
      </div>

      <div className="flex-1 py-4">
        <div className="animate-fade-in">{children}</div>
      </div>

      {/* <div className="mt-6 flex flex-col gap-2"> */}
      {!hideNextButton && (
        <button
          onClick={onNext}
          className="w-full py-4 px-6 bg-primary hover:bg-opacity-90 text-white font-semibold rounded-lg transition-all shadow-sm"
        >
          {nextButtonText}
        </button>
      )}

      {onSkip && (
        <button onClick={onSkip} className="py-2 text-gray-500 font-medium hover:text-gray-700">
          Skip this step
        </button>
      )}
      {/* </div> */}
    </>
  )
}
