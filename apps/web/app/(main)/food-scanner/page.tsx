'use client'

import { useState } from 'react'
import { Button } from '@core/ui/components/button'
import { analyzeFood } from '@/(main)/actions/analyze-food'

type FoodAnalysisResult = {
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

type DailyRecommendation = {
  targetCalories: number
  consumedCalories: number
  remainingCalories: number
  recommendedExercise: {
    type: string
    duration: number
    caloriesBurn: number
  }[]
  mealSuggestions: string[]
}

export default function FoodScannerPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    foodAnalysis: FoodAnalysisResult
    dailyRecommendation: DailyRecommendation
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setAnalysisResult(null)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('mealType', mealType)

      const result = await analyzeFood(formData)

      if (result.success && result.data) {
        setAnalysisResult(result.data)
      } else {
        setError(result.error || 'Failed to analyze food')
      }
    } catch (err) {
      setError('An error occurred while analyzing the food')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Food Scanner</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Take a photo of your food to get instant calorie and nutrition analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Upload Food Image</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as typeof mealType)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Food Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Food preview"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Food'}
            </Button>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

          {analysisResult ? (
            <div className="space-y-6">
              {/* Food Analysis */}
              <div>
                <h3 className="font-medium text-lg mb-2">Food Identified</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-semibold text-lg">{analysisResult.foodAnalysis.foodName}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {analysisResult.foodAnalysis.calories} calories •{' '}
                    {analysisResult.foodAnalysis.portionSize}
                  </p>
                  <p className="text-sm text-gray-500">
                    Confidence: {Math.round(analysisResult.foodAnalysis.confidence * 100)}%
                  </p>
                </div>
              </div>

              {/* Nutrition Breakdown */}
              <div>
                <h3 className="font-medium text-lg mb-2">Nutrition Breakdown</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                    <p className="font-semibold">
                      {analysisResult.foodAnalysis.nutrition.protein}g
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                    <p className="font-semibold">{analysisResult.foodAnalysis.nutrition.carbs}g</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                    <p className="font-semibold">{analysisResult.foodAnalysis.nutrition.fat}g</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
                    <p className="font-semibold">{analysisResult.foodAnalysis.nutrition.fiber}g</p>
                  </div>
                </div>
              </div>

              {/* Daily Progress */}
              <div>
                <h3 className="font-medium text-lg mb-2">Daily Progress</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Calories Today</span>
                    <span className="font-semibold">
                      {analysisResult.dailyRecommendation.consumedCalories} /{' '}
                      {analysisResult.dailyRecommendation.targetCalories}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((analysisResult.dailyRecommendation.consumedCalories / analysisResult.dailyRecommendation.targetCalories) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {analysisResult.dailyRecommendation.remainingCalories > 0
                      ? `${analysisResult.dailyRecommendation.remainingCalories} calories remaining`
                      : `${Math.abs(analysisResult.dailyRecommendation.remainingCalories)} calories over target`}
                  </p>
                </div>
              </div>

              {/* Exercise Recommendations */}
              {analysisResult.dailyRecommendation.recommendedExercise.length > 0 && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Recommended Exercise</h3>
                  <div className="space-y-2">
                    {analysisResult.dailyRecommendation.recommendedExercise.map(
                      (exercise, index) => (
                        <div key={index} className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
                          <p className="font-medium">{exercise.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.duration} minutes • Burns ~{exercise.caloriesBurn} calories
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Meal Suggestions */}
              {analysisResult.dailyRecommendation.mealSuggestions.length > 0 && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Meal Suggestions</h3>
                  <div className="space-y-1">
                    {analysisResult.dailyRecommendation.mealSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Upload and analyze a food image to see detailed nutrition information and personalized
              recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
