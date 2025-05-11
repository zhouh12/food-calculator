'use client'

import { useProfileStore } from '../../../stores/profile-store'
import { GenderStep } from './components/gender-step'
// import { WorkoutsStep } from '../components/workouts-step'
// import { GoalsStep } from '../components/goals-step'
import { MeasurementsStep } from './components/measurements-step'
import { CompleteStep } from './components/complete-step'

export default function ProfileSetup() {
  const currentStep = useProfileStore((state) => state.currentStep)

  const steps = {
    GENDER: <GenderStep />,
    // WORKOUTS: <WorkoutsStep />,
    // GOALS: <GoalsStep />,
    MEASUREMENTS: <MeasurementsStep />,
    COMPLETE: <CompleteStep />,
  }

  return steps[currentStep]
}
