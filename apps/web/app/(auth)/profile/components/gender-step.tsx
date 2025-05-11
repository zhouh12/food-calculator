'use client'

import { Button } from '@core/ui/components/button'
import { useProfileStore } from '../../../../stores/profile-store'

export function GenderStep() {
  const { updateFormData, setStep } = useProfileStore()

  const handleSelect = (gender: 'MALE' | 'FEMALE') => {
    updateFormData({ gender })
    setStep('MEASUREMENTS')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Choose your Gender</h1>
        <p className="text-gray-400 mt-2">This will be used to calibrate your custom plan.</p>
      </div>

      <div className="space-y-4">
        <Button className="w-full justify-center text-lg py-6" onClick={() => handleSelect('MALE')}>
          Male
        </Button>
        <Button
          className="w-full justify-center text-lg py-6"
          onClick={() => handleSelect('FEMALE')}
        >
          Female
        </Button>
      </div>
    </div>
  )
}
