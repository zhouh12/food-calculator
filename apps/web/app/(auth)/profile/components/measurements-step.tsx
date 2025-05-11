'use client'

import { Button } from '@core/ui/components/button'
import { useProfileStore } from '../../../../stores/profile-store'
import { updateProfile } from '../actions/update-profile'
import { ProfileFormData } from '../../../../core/types/profile'
import { Input } from '@core/ui/components/input'

export function MeasurementsStep() {
  const { formData, setStep, updateFormData } = useProfileStore()

  const handleComplete = async () => {
    if (!isFormComplete(formData)) {
      console.error('Please complete all fields')
      return
    }

    const result = await updateProfile(formData as ProfileFormData)

    if (result.success) {
      setStep('COMPLETE')
    } else {
      console.error(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Your Measurements</h1>
        <p className="text-gray-400 mt-2">Help us understand your current status</p>
      </div>

      <div className="space-y-4">
        <Input
          type="number"
          placeholder="Age"
          value={formData.age || ''}
          onChange={(e) => updateFormData({ age: Number(e.target.value) })}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight || ''}
          onChange={(e) => updateFormData({ weight: Number(e.target.value) })}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <Button className="w-full" onClick={handleComplete}>
        Complete Profile
      </Button>
    </div>
  )
}

function isFormComplete(formData: Partial<ProfileFormData>): formData is ProfileFormData {
  return !!(
    formData.age &&
    formData.weight &&
    formData.goal &&
    formData.workoutsPerWeek &&
    formData.gender
  )
}
