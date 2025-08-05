import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProfile, FormValidation } from '../types/profile'
import { UserGoal } from '@core/types/server'

export class ProfileManager {
  private static PROFILE_KEY = 'user_profile'
  private static ONBOARDING_KEY = 'onboarding_step'

  /**
   * 保存用户配置文件
   */
  static async saveProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const existingProfile = await this.getProfile()
      const updatedProfile: UserProfile = {
        ...existingProfile,
        ...profile,
        updatedAt: new Date().toISOString(),
      }

      await AsyncStorage.setItem(this.PROFILE_KEY, JSON.stringify(updatedProfile))
      return updatedProfile
    } catch (error) {
      console.error('Failed to save profile:', error)
      throw new Error('Failed to save profile')
    }
  }

  /**
   * 获取用户配置文件
   */
  static async getProfile(): Promise<UserProfile> {
    try {
      const profileData = await AsyncStorage.getItem(this.PROFILE_KEY)
      if (profileData) {
        return JSON.parse(profileData)
      }

      // 返回默认配置文件
      return this.getDefaultProfile()
    } catch (error) {
      console.error('Failed to get profile:', error)
      return this.getDefaultProfile()
    }
  }

  /**
   * 删除用户配置文件
   */
  static async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.PROFILE_KEY)
      await AsyncStorage.removeItem(this.ONBOARDING_KEY)
    } catch (error) {
      console.error('Failed to clear profile:', error)
      throw new Error('Failed to clear profile')
    }
  }

  /**
   * 保存当前 onboarding 步骤
   */
  static async saveOnboardingStep(step: number): Promise<void> {
    try {
      await AsyncStorage.setItem(this.ONBOARDING_KEY, step.toString())
    } catch (error) {
      console.error('Failed to save onboarding step:', error)
    }
  }

  /**
   * 获取当前 onboarding 步骤
   */
  static async getOnboardingStep(): Promise<number> {
    try {
      const step = await AsyncStorage.getItem(this.ONBOARDING_KEY)
      return step ? parseInt(step, 10) : 1
    } catch (error) {
      console.error('Failed to get onboarding step:', error)
      return 1
    }
  }

  /**
   * 标记 onboarding 为完成
   */
  static async completeOnboarding(): Promise<void> {
    try {
      const profile = await this.getProfile()
      await this.saveProfile({
        ...profile,
        onboardingCompleted: true,
      })
      await AsyncStorage.removeItem(this.ONBOARDING_KEY)
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
      throw new Error('Failed to complete onboarding')
    }
  }

  /**
   * 检查是否完成了 onboarding
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    try {
      const profile = await this.getProfile()
      return profile.onboardingCompleted || false
    } catch (error) {
      console.error('Failed to check onboarding status:', error)
      return false
    }
  }

  /**
   * 获取默认配置文件
   */
  private static getDefaultProfile(): UserProfile {
    return {
      fitnessGoal: '',
      onboardingCompleted: false,
      preferences: {
        units: 'metric',
        notifications: true,
        reminderTimes: ['09:00', '18:00'],
        preferredWorkoutTime: 'morning',
        theme: 'auto',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  /**
   * 验证配置文件数据
   */
  static validateProfile(profile: Partial<UserProfile>): FormValidation {
    const errors: Record<string, string> = {}

    // 验证姓名
    if (profile.name !== undefined) {
      if (!profile.name || profile.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long'
      }
    }

    // 验证年龄
    if (profile.age !== undefined) {
      if (!profile.age || profile.age < 13 || profile.age > 120) {
        errors.age = 'Age must be between 13 and 120'
      }
    }

    // 验证身高
    if (profile.height !== undefined) {
      if (!profile.height || profile.height < 100 || profile.height > 250) {
        errors.height = 'Height must be between 100cm and 250cm'
      }
    }

    // 验证体重
    if (profile.currentWeight !== undefined) {
      if (!profile.currentWeight || profile.currentWeight < 30 || profile.currentWeight > 300) {
        errors.currentWeight = 'Weight must be between 30kg and 300kg'
      }
    }

    // 验证目标体重
    if (profile.targetWeight !== undefined) {
      if (!profile.targetWeight || profile.targetWeight < 30 || profile.targetWeight > 300) {
        errors.targetWeight = 'Target weight must be between 30kg and 300kg'
      }
    }

    // 验证健身目标
    if (profile.fitnessGoal !== undefined) {
      const validGoals: UserGoal[] = ['LOSE_FAT', 'BUILD_MUSCLE', 'MAINTAIN'] // Uses shared UserGoal type
      if (!profile.fitnessGoal || !validGoals.includes(profile.fitnessGoal as UserGoal)) {
        errors.fitnessGoal = 'Please select a valid fitness goal'
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  /**
   * 计算 BMI
   */
  static calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  /**
   * 计算基础代谢率 (BMR)
   */
  static calculateBMR(
    weight: number,
    height: number,
    age: number,
    gender: 'male' | 'female'
  ): number {
    if (gender === 'male') {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }
  }

  /**
   * 计算每日消耗卡路里 (TDEE)
   */
  static calculateTDEE(bmr: number, activityMultiplier: number): number {
    return bmr * activityMultiplier
  }

  /**
   * 导出配置文件数据
   */
  static async exportProfile(): Promise<string> {
    try {
      const profile = await this.getProfile()
      return JSON.stringify(profile, null, 2)
    } catch (error) {
      console.error('Failed to export profile:', error)
      throw new Error('Failed to export profile')
    }
  }

  /**
   * 导入配置文件数据
   */
  static async importProfile(profileData: string): Promise<UserProfile> {
    try {
      const profile = JSON.parse(profileData) as UserProfile
      const validation = this.validateProfile(profile)

      if (!validation.isValid) {
        throw new Error(`Invalid profile data: ${Object.values(validation.errors).join(', ')}`)
      }

      return await this.saveProfile(profile)
    } catch (error) {
      console.error('Failed to import profile:', error)
      throw new Error('Failed to import profile')
    }
  }
}
