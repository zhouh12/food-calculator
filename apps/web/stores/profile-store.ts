import { create } from 'zustand'
import { ProfileFormData, ProfileStep } from '../core/types/profile'

interface ProfileStore {
  currentStep: ProfileStep
  formData: Partial<ProfileFormData>
  setStep: (step: ProfileStep) => void
  updateFormData: (data: Partial<ProfileFormData>) => void
  resetForm: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  currentStep: 'GENDER',
  formData: {},
  setStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 'GENDER', formData: {} }),
}))
