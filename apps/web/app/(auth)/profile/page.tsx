'use client'
import { OnboardingLayout } from './components/onboarding-layout'
import { GoalCard } from './components/goal-card'
import { useState } from 'react'
import { SelectionCard } from './components/selection-card'
import { NumberInput } from './components/number-input'
import { saveOnboardingStep } from '@/(auth)/actions/update-profile'

const TOTAL_STEPS = 6

type GoalType = 'lose_fat' | 'build_muscle' | 'improve_fitness' | 'maintain_weight'
type ActivityType = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active'

export default function ProfileSetup() {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState<GoalType | null>(null)
  const [gender, setGender] = useState<'male' | 'female' | null>(null)
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [activityLevel, setActivityLevel] = useState<ActivityType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nextStep = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Prepare data for current step
      const stepData = {
        step,
        goal: goal || undefined,
        gender: gender || undefined,
        age,
        height,
        weight,
        activityLevel: activityLevel || undefined,
      }

      // Save the step data
      const result = await saveOnboardingStep(stepData)

      if (!result.success) {
        setError(result.error || 'Failed to save data')
        setIsLoading(false)
        return
      }

      // Move to next step
      window.scrollTo(0, 0)
      setStep((prev) => prev + 1)
    } catch (error) {
      console.error('Error saving step:', error)
      setError('Failed to save data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="Welcome! Let's get started"
            subtitle="What is your primary fitness goal?"
            onNext={nextStep}
            hideNextButton={!goal || isLoading}
            nextButtonText={isLoading ? 'Saving...' : 'Next'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <GoalCard
                title="Lose Fat"
                description="Burn fat and get leaner"
                icon="🔥"
                isSelected={goal === 'lose_fat'}
                onClick={() => setGoal('lose_fat')}
              />
              <GoalCard
                title="Build Muscle"
                description="Get stronger and gain muscle"
                icon="💪"
                isSelected={goal === 'build_muscle'}
                onClick={() => setGoal('build_muscle')}
              />
              <GoalCard
                title="Improve Fitness"
                description="Enhance overall fitness and health"
                icon="🏃"
                isSelected={goal === 'improve_fitness'}
                onClick={() => setGoal('improve_fitness')}
              />
              <GoalCard
                title="Maintain Weight"
                description="Stay at your current weight"
                icon="⚖️"
                isSelected={goal === 'maintain_weight'}
                onClick={() => setGoal('maintain_weight')}
              />
            </div>
          </OnboardingLayout>
        )

      case 2:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="What is your gender?"
            subtitle="We use this to calculate your caloric needs"
            onNext={nextStep}
            hideNextButton={!gender || isLoading}
            nextButtonText={isLoading ? 'Saving...' : 'Next'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <SelectionCard
                title="Male"
                icon="👨"
                isSelected={gender === 'male'}
                onClick={() => setGender('male')}
                className="h-40"
              />
              <SelectionCard
                title="Female"
                icon="👩"
                isSelected={gender === 'female'}
                onClick={() => setGender('female')}
                className="h-40"
              />
            </div>
          </OnboardingLayout>
        )

      case 3:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="How old are you?"
            subtitle="Your age helps us tailor recommendations"
            onNext={nextStep}
            hideNextButton={isLoading}
            nextButtonText={isLoading ? 'Saving...' : 'Next'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex flex-col items-center justify-center py-8">
              <NumberInput
                value={age}
                onChange={setAge}
                min={16}
                max={100}
                unit="years"
                className="mb-8"
              />
            </div>
          </OnboardingLayout>
        )

      case 4:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="What is your height?"
            subtitle="This helps us calculate your body metrics"
            onNext={nextStep}
            hideNextButton={isLoading}
            nextButtonText={isLoading ? 'Saving...' : 'Next'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex flex-col items-center justify-center py-8">
              <NumberInput
                value={height}
                onChange={setHeight}
                min={100}
                max={250}
                unit="cm"
                className="mb-8"
              />
            </div>
          </OnboardingLayout>
        )

      case 5:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="What is your weight?"
            subtitle="This helps us set your initial goals"
            onNext={nextStep}
            hideNextButton={isLoading}
            nextButtonText={isLoading ? 'Saving...' : 'Next'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex flex-col items-center justify-center py-8">
              <NumberInput
                value={weight}
                onChange={setWeight}
                min={30}
                max={250}
                unit="kg"
                className="mb-8"
              />
            </div>
          </OnboardingLayout>
        )

      case 6:
        return (
          <OnboardingLayout
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            title="What is your activity level?"
            subtitle="This affects your daily calorie needs"
            onNext={nextStep}
            hideNextButton={!activityLevel || isLoading}
            nextButtonText={isLoading ? 'Saving Profile...' : 'Save My Profile'}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <GoalCard
                title="Sedentary"
                description="Little or no exercise"
                icon="🛋️"
                isSelected={activityLevel === 'sedentary'}
                onClick={() => setActivityLevel('sedentary')}
              />
              <GoalCard
                title="Lightly Active"
                description="Light exercise 1-3 days a week"
                icon="🚶"
                isSelected={activityLevel === 'lightly_active'}
                onClick={() => setActivityLevel('lightly_active')}
              />
              <GoalCard
                title="Moderately Active"
                description="Moderate exercise 3-5 days a week"
                icon="🏊"
                isSelected={activityLevel === 'moderately_active'}
                onClick={() => setActivityLevel('moderately_active')}
              />
              <GoalCard
                title="Very Active"
                description="Hard exercise 6-7 days a week"
                icon="🏋️"
                isSelected={activityLevel === 'very_active'}
                onClick={() => setActivityLevel('very_active')}
              />
            </div>
          </OnboardingLayout>
        )

      default:
        // Results page (placeholder for now)
        return (
          <div className="min-h-screen flex items-center justify-center bg-fitness-light">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h1 className="text-2xl font-bold mb-4">Profile Complete!</h1>
              <p className="mb-6">
                We've created your personalized fitness plan based on your:
                <br />
                <br />
                Goal: <strong>{goal?.replace('_', ' ')}</strong>
                <br />
                Gender: <strong>{gender}</strong>
                <br />
                Age: <strong>{age} years</strong>
                <br />
                Height: <strong>{height} cm</strong>
                <br />
                Weight: <strong>{weight} kg</strong>
                <br />
                Activity Level: <strong>{activityLevel?.replace('_', ' ')}</strong>
              </p>
              <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-sm">
                View My Dashboard
              </button>
            </div>
          </div>
        )
    }
  }

  return <>{renderStep()}</>
}
