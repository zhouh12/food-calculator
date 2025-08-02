# @core/types

Shared TypeScript types for mobile and web applications in the monorepo.

## Overview

This package provides a unified set of TypeScript types that can be shared across different applications (mobile and web) to ensure consistency and reduce duplication.

## Installation

Since this is a workspace package, install it in your app's package.json:

```json
{
  "dependencies": {
    "@core/types": "workspace:*"
  }
}
```

## Usage

### Import all types

```typescript
import { UserProfile, ApiResponse, FoodEntry } from '@core/types'
```

### Import from specific modules

```typescript
import { UserProfile, ActivityLevel } from '@core/types/profile'
import { ApiResponse, PaginatedResponse } from '@core/types/api'
import { FoodEntry, NutritionInfo } from '@core/types/food'
import { FormValidation, ButtonVariant } from '@core/types/ui'
```

## Type Categories

### Profile Types (`@core/types/profile`)

User profile, fitness goals, activity levels, and related types:

- `UserProfile` - Complete user profile structure
- `UpdateProfileRequest` - Profile update API request
- `UserGoal` - Fitness goals (LOSE_FAT, BUILD_MUSCLE, etc.)
- `ActivityLevel` - Activity levels (SEDENTARY, ACTIVE, etc.)
- `FITNESS_GOALS` - Pre-defined fitness goal options with UI metadata

### API Types (`@core/types/api`)

Common request/response patterns and API utilities:

- `ApiResponse<T>` - Generic API response wrapper
- `PaginatedResponse<T>` - Paginated data responses
- `ApiError` - Standardized error structure
- `LoginRequest/Response` - Authentication types
- `HttpStatus` - HTTP status code enum

### Food Types (`@core/types/food`)

Food tracking, nutrition, and analysis types:

- `FoodEntry` - Individual food log entry
- `NutritionInfo` - Nutritional information structure
- `FoodAnalysisResult` - Food recognition/analysis result
- `DailyNutritionSummary` - Daily nutrition tracking
- `Recipe` - Recipe structure with ingredients and instructions

### UI Types (`@core/types/ui`)

Common UI component interfaces and form validation:

- `FormValidation` - Form validation state and errors
- `LoadingState` - Loading states for components
- `ToastMessage` - Toast notification structure
- `ButtonVariant/Size` - Button styling options
- `Theme` - Application theme structure

## Type Aliases

For convenience, commonly used types are re-exported with shorter names:

- `Profile` → `UserProfile`
- `Response<T>` → `ApiResponse<T>`
- `Food` → `FoodEntry`
- `Validation` → `FormValidation`

## Examples

### User Profile Usage

```typescript
import { UserProfile, UserGoal, ActivityLevel } from '@core/types/profile'

const userProfile: UserProfile = {
  name: 'John Doe',
  age: 30,
  fitnessGoal: 'LOSE_FAT',
  activityLevel: 'MODERATE',
  currentWeight: 80,
  targetWeight: 75,
}

// Update profile
const updateRequest: UpdateProfileRequest = {
  goal: 'BUILD_MUSCLE',
  workoutsPerWeek: 4,
}
```

### API Response Usage

```typescript
import { ApiResponse, PaginatedResponse } from '@core/types/api'

// Simple API response
const response: ApiResponse<UserProfile> = {
  success: true,
  data: userProfile,
  message: 'Profile updated successfully',
}

// Paginated response
const foodList: PaginatedResponse<FoodEntry> = {
  success: true,
  data: foods,
  pagination: {
    page: 1,
    limit: 20,
    total: 100,
    totalPages: 5,
    hasNext: true,
    hasPrev: false,
  },
}
```

### Food Tracking Usage

```typescript
import { FoodEntry, NutritionInfo, MealType } from '@core/types/food'

const breakfast: FoodEntry = {
  userId: 'user123',
  foodName: 'Oatmeal with Banana',
  nutrition: {
    calories: 300,
    protein: 10,
    carbs: 55,
    fat: 6,
    fiber: 8,
    sugar: 15,
  },
  portionSize: '1 bowl',
  quantity: 1,
  mealType: 'BREAKFAST',
  consumedAt: new Date().toISOString(),
  verified: true,
  source: 'USER_INPUT',
}
```

### Form Validation Usage

```typescript
import { FormValidation, FormStep } from '@core/types/ui'

const validation: FormValidation = {
  isValid: false,
  errors: {
    email: 'Invalid email format',
    password: 'Password must be at least 8 characters',
  },
  touched: {
    email: true,
    password: true,
  },
}

const onboardingSteps: FormStep[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Tell us about yourself',
    completed: true,
  },
  {
    id: 'fitness-goal',
    title: 'Fitness Goals',
    description: 'What do you want to achieve?',
    completed: false,
  },
]
```

## Development

### Building the Package

```bash
cd packages/types
pnpm build
```

### Development Mode

```bash
cd packages/types
pnpm dev
```

### Linting

```bash
cd packages/types
pnpm lint
```

## Contributing

When adding new types:

1. Add them to the appropriate module file (`profile.ts`, `api.ts`, `food.ts`, `ui.ts`)
2. Export them in the main `index.ts` file
3. Add documentation and examples to this README
4. Consider backward compatibility when modifying existing types
5. Use consistent naming conventions (PascalCase for types, UPPER_CASE for enums)

## Type Guidelines

- Use `interface` for object shapes that might be extended
- Use `type` for unions, primitives, and computed types
- Use `enum` for string constants that represent a closed set of values
- Always include JSDoc comments for complex types
- Prefer composition over inheritance
- Use generic types where appropriate for reusability
- Keep types as strict as possible while maintaining usability
