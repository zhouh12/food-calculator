// Food and Nutrition Types

// Nutritional information structure
export interface NutritionInfo {
  calories: number
  protein: number // grams
  carbs: number // grams (carbohydrates)
  fat: number // grams
  fiber: number // grams
  sugar: number // grams
  sodium?: number // mg
  cholesterol?: number // mg
  saturatedFat?: number // grams
  transFat?: number // grams
  vitamins?: Record<string, number> // vitamin name -> amount
  minerals?: Record<string, number> // mineral name -> amount
}

// Food analysis result from image/text recognition
export interface FoodAnalysisResult {
  foodName: string
  calories: number
  confidence: number // 0-1 confidence score
  nutrition: NutritionInfo
  portionSize: string
  brand?: string
  barcode?: string
  category?: FoodCategory
  ingredients?: string[]
  allergens?: Allergen[]
  alternativeNames?: string[]
}

// Food categories
export type FoodCategory =
  | 'FRUITS'
  | 'VEGETABLES'
  | 'GRAINS'
  | 'PROTEIN'
  | 'DAIRY'
  | 'FATS_OILS'
  | 'SWEETS'
  | 'BEVERAGES'
  | 'SNACKS'
  | 'FAST_FOOD'
  | 'RESTAURANT'
  | 'HOMEMADE'
  | 'PACKAGED'
  | 'OTHER'

// Common allergens
export type Allergen =
  | 'MILK'
  | 'EGGS'
  | 'FISH'
  | 'SHELLFISH'
  | 'TREE_NUTS'
  | 'PEANUTS'
  | 'WHEAT'
  | 'SOYBEANS'
  | 'SESAME'

// Meal types
export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'OTHER'

// Food entry for logging meals
export interface FoodEntry {
  id?: string
  userId: string
  foodName: string
  nutrition: NutritionInfo
  portionSize: string
  quantity: number
  mealType: MealType
  consumedAt: string // ISO date string
  imageUrl?: string
  notes?: string
  verified: boolean // whether nutrition info has been verified
  source: 'USER_INPUT' | 'IMAGE_ANALYSIS' | 'BARCODE_SCAN' | 'DATABASE'
}

// Daily nutrition summary
export interface DailyNutritionSummary {
  date: string // YYYY-MM-DD format
  userId: string
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalFiber: number
  totalSugar: number
  meals: {
    [K in MealType]: {
      entries: FoodEntry[]
      totalCalories: number
      nutrition: NutritionInfo
    }
  }
  targets: DailyNutritionTargets
  progress: {
    caloriesProgress: number // percentage
    proteinProgress: number // percentage
    carbsProgress: number // percentage
    fatProgress: number // percentage
  }
}

// Daily nutrition targets based on user profile
export interface DailyNutritionTargets {
  targetCalories: number
  targetProtein: number // grams
  targetCarbs: number // grams
  targetFat: number // grams
  targetFiber: number // grams
  maxSugar: number // grams
  maxSodium: number // mg
}

// Daily recommendation based on user profile and current intake
export interface DailyRecommendation {
  date: string
  userId: string
  targetCalories: number
  consumedCalories: number
  remainingCalories: number
  recommendedExercise: ExerciseRecommendation[]
  mealSuggestions: MealSuggestion[]
  nutritionAdvice: string[]
  hydrationGoal: number // ml or oz
  waterIntake?: number // ml or oz
}

// Exercise recommendation
export interface ExerciseRecommendation {
  type: string
  name: string
  duration: number // minutes
  caloriesBurn: number
  intensity: 'LOW' | 'MODERATE' | 'HIGH'
  equipment?: string[]
  instructions?: string
}

// Meal suggestion
export interface MealSuggestion {
  id: string
  name: string
  mealType: MealType
  estimatedCalories: number
  estimatedNutrition: NutritionInfo
  preparationTime: number // minutes
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  ingredients: string[]
  tags: string[]
  imageUrl?: string
  recipeUrl?: string
}

// Food search/database types
export interface FoodSearchRequest {
  query: string
  category?: FoodCategory
  limit?: number
  includeNutrition?: boolean
  brand?: string
}

export interface FoodSearchResult {
  foods: Array<{
    id: string
    name: string
    brand?: string
    category: FoodCategory
    nutrition: NutritionInfo
    servingSize: string
    barcode?: string
    imageUrl?: string
    popularity?: number
  }>
  total: number
}

// Food image analysis request
export interface FoodImageAnalysisRequest {
  imageUrl?: string
  imageBase64?: string
  userId: string
  mealType?: MealType
}

// Barcode scan result
export interface BarcodeScanResult {
  barcode: string
  product?: {
    name: string
    brand: string
    nutrition: NutritionInfo
    servingSize: string
    ingredients: string[]
    allergens: Allergen[]
    imageUrl?: string
  }
  found: boolean
}

// Recipe types
export interface Recipe {
  id: string
  name: string
  description: string
  servings: number
  preparationTime: number // minutes
  cookingTime: number // minutes
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  category: FoodCategory
  cuisine?: string
  ingredients: RecipeIngredient[]
  instructions: string[]
  nutrition: NutritionInfo // per serving
  tags: string[]
  imageUrl?: string
  rating?: number
  reviewCount?: number
  createdBy?: string
  createdAt: string
}

export interface RecipeIngredient {
  name: string
  amount: number
  unit: string
  notes?: string
  optional?: boolean
}

// Water intake tracking
export interface WaterIntakeEntry {
  id?: string
  userId: string
  amount: number // ml or oz
  recordedAt: string // ISO date string
  container?: 'GLASS' | 'BOTTLE' | 'CUP' | 'OTHER'
}

// Weekly nutrition summary
export interface WeeklyNutritionSummary {
  weekStart: string // YYYY-MM-DD format (Monday)
  userId: string
  dailySummaries: DailyNutritionSummary[]
  weeklyAverages: {
    avgCalories: number
    avgProtein: number
    avgCarbs: number
    avgFat: number
    avgFiber: number
  }
  trends: {
    caloriesTrend: 'INCREASING' | 'DECREASING' | 'STABLE'
    weightTrend: 'INCREASING' | 'DECREASING' | 'STABLE'
  }
  achievements: string[]
  goals: {
    met: number
    total: number
  }
}
