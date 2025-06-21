export function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">
          Step {currentStep}/{totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
