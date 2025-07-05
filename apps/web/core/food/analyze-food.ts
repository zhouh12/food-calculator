import { getServerSession } from 'next-auth'
import { authOptions } from '@/core/types/auth'
import { db } from '@/db/drizzle'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema/users'
import { profiles } from '@/db/schema/profiles'
import { meals, dailyTargets } from '@/db/schema/meals'

// Food analysis result from AI
export type FoodAnalysisResult = {
  foodName: string
  calories: number
  confidence: number
  nutrition: {
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
  }
  portionSize: string
}

// Daily recommendation based on user profile
export type DailyRecommendation = {
  targetCalories: number
  consumedCalories: number
  remainingCalories: number
  recommendedExercise: {
    type: string
    duration: number // minutes
    caloriesBurn: number
  }[]
  mealSuggestions: string[]
}

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  if (gender === 'MALE') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

// Calculate daily calorie needs based on activity level
function calculateDailyCalories(bmr: number, activityLevel: string): number {
  const multipliers = {
    LOW: 1.2, // Sedentary
    MODERATE: 1.55, // Moderately active
    HIGH: 1.725, // Very active
  }
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.55)
}

// Adjust calories based on goal
function adjustForGoal(dailyCalories: number, goal: string): number {
  switch (goal) {
    case 'LOSE_FAT':
      return dailyCalories - 500 // 500 calorie deficit for ~1lb/week loss
    case 'GAIN_WEIGHT':
      return dailyCalories + 500 // 500 calorie surplus for weight gain
    case 'MAINTAIN':
    default:
      return dailyCalories
  }
}

export async function analyzeFoodAndRecommend(
  imageUrl: string,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<{
  foodAnalysis: FoodAnalysisResult
  dailyRecommendation: DailyRecommendation
  success: boolean
  error?: string
}> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return {
        foodAnalysis: null as any,
        dailyRecommendation: null as any,
        success: false,
        error: 'Unauthorized',
      }
    }

    // Get user and profile data
    const user = await db
      .select()
      .from(users)
      .where(eq(users.Email, session.user.email))
      .limit(1)
      .then((rows) => rows[0])

    if (!user) {
      return {
        foodAnalysis: null as any,
        dailyRecommendation: null as any,
        success: false,
        error: 'User not found',
      }
    }

    const userProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.UserId, user.Id))
      .limit(1)
      .then((rows) => rows[0])

    if (!userProfile) {
      return {
        foodAnalysis: null as any,
        dailyRecommendation: null as any,
        success: false,
        error: 'Profile not found',
      }
    }

    // 1. Analyze food image using AI (integrate with your existing RAG system)
    const foodAnalysis = await analyzeImageWithAI(imageUrl)

    // 2. Save meal to database
    await db.insert(meals).values({
      UserId: user.Id,
      ImageUrl: imageUrl,
      FoodName: foodAnalysis.foodName,
      EstimatedCalories: foodAnalysis.calories.toString(),
      Confidence: foodAnalysis.confidence.toString(),
      NutritionData: foodAnalysis.nutrition,
      MealType: mealType,
    })

    // 3. Calculate daily targets using profile data
    const bmr = calculateBMR(
      userProfile.Weight,
      userProfile.Height,
      userProfile.Age,
      userProfile.Gender
    )
    const dailyCalories = calculateDailyCalories(bmr, userProfile.ActivityLevel)
    const targetCalories = adjustForGoal(dailyCalories, userProfile.Goal)

    // 4. Get today's consumption
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaysMeals = await db.select().from(meals).where(eq(meals.UserId, user.Id))
    // Add date filter here when you have proper date handling

    const consumedCalories = todaysMeals.reduce(
      (total, meal) => total + parseFloat(meal.EstimatedCalories || '0'),
      0
    )

    // 5. Generate recommendations
    const remainingCalories = targetCalories - consumedCalories
    const exerciseRecommendations = generateExerciseRecommendations(
      remainingCalories,
      userProfile.Goal
    )
    const mealSuggestions = generateMealSuggestions(remainingCalories, mealType)

    const dailyRecommendation: DailyRecommendation = {
      targetCalories,
      consumedCalories,
      remainingCalories,
      recommendedExercise: exerciseRecommendations,
      mealSuggestions,
    }

    return {
      foodAnalysis,
      dailyRecommendation,
      success: true,
    }
  } catch (error) {
    console.error('Food analysis error:', error)
    return {
      foodAnalysis: null as any,
      dailyRecommendation: null as any,
      success: false,
      error: 'Failed to analyze food',
    }
  }
}

// This would integrate with your RAG system or external AI service
async function analyzeImageWithAI(imageUrl: string): Promise<FoodAnalysisResult> {
  // TODO: Integrate with your existing RAG system in the /rag folder
  // For now, return mock data
  return {
    foodName: 'Grilled Chicken Breast',
    calories: 231,
    confidence: 0.89,
    nutrition: {
      protein: 43.5,
      carbs: 0,
      fat: 5.0,
      fiber: 0,
      sugar: 0,
    },
    portionSize: '100g',
  }
}

function generateExerciseRecommendations(
  remainingCalories: number,
  goal: string
): DailyRecommendation['recommendedExercise'] {
  if (remainingCalories < 0) {
    // Over calorie target, recommend exercise to burn excess
    const excessCalories = Math.abs(remainingCalories)
    return [
      {
        type: 'Brisk Walking',
        duration: Math.round(excessCalories / 4), // ~4 cal/min
        caloriesBurn: excessCalories,
      },
      {
        type: 'Running',
        duration: Math.round(excessCalories / 10), // ~10 cal/min
        caloriesBurn: excessCalories,
      },
    ]
  }

  // Standard exercise recommendations based on goal
  switch (goal) {
    case 'LOSE_FAT':
      return [
        { type: 'Cardio (30 min)', duration: 30, caloriesBurn: 300 },
        { type: 'Strength Training (20 min)', duration: 20, caloriesBurn: 150 },
      ]
    case 'GAIN_WEIGHT':
      return [
        { type: 'Strength Training (45 min)', duration: 45, caloriesBurn: 200 },
        { type: 'Light Cardio (15 min)', duration: 15, caloriesBurn: 100 },
      ]
    default:
      return [{ type: 'Mixed Workout (30 min)', duration: 30, caloriesBurn: 250 }]
  }
}

function generateMealSuggestions(remainingCalories: number, currentMealType: string): string[] {
  if (remainingCalories <= 0) {
    return ['Consider lighter portions', 'Focus on vegetables', 'Stay hydrated']
  }

  const suggestions = {
    breakfast: ['Greek yogurt with berries', 'Oatmeal with nuts', 'Scrambled eggs with vegetables'],
    lunch: ['Grilled chicken salad', 'Quinoa bowl with vegetables', 'Lentil soup'],
    dinner: ['Baked salmon with sweet potato', 'Lean beef with steamed broccoli', 'Tofu stir-fry'],
    snack: ['Apple with almond butter', 'Hummus with carrots', 'Greek yogurt'],
  }

  return suggestions[currentMealType as keyof typeof suggestions] || suggestions.snack
}
