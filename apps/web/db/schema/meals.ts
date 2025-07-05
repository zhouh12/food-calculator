import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  decimal,
  text,
  jsonb,
} from 'drizzle-orm/pg-core'
import { users } from './users'

export const meals = pgTable('Meals', {
  Id: serial('Id').primaryKey(),
  UserId: integer('UserId')
    .notNull()
    .references(() => users.Id),
  ImageUrl: varchar('ImageUrl', { length: 500 }),
  FoodName: varchar('FoodName', { length: 255 }).notNull(),
  EstimatedCalories: decimal('EstimatedCalories', { precision: 8, scale: 2 }).notNull(),
  Confidence: decimal('Confidence', { precision: 3, scale: 2 }), // AI confidence score
  NutritionData: jsonb('NutritionData'), // Store detailed nutrition as JSON
  MealType: varchar('MealType', { length: 50 }), // breakfast, lunch, dinner, snack
  CreatedAt: timestamp('CreatedAt').defaultNow(),
})

export const dailyTargets = pgTable('DailyTargets', {
  Id: serial('Id').primaryKey(),
  UserId: integer('UserId')
    .notNull()
    .references(() => users.Id),
  Date: timestamp('Date').notNull(),
  TargetCalories: decimal('TargetCalories', { precision: 8, scale: 2 }).notNull(),
  ConsumedCalories: decimal('ConsumedCalories', { precision: 8, scale: 2 }).default('0'),
  RecommendedExerciseMinutes: integer('RecommendedExerciseMinutes'),
  ActualExerciseMinutes: integer('ActualExerciseMinutes').default(0),
  CreatedAt: timestamp('CreatedAt').defaultNow(),
})

export const exerciseRecommendations = pgTable('ExerciseRecommendations', {
  Id: serial('Id').primaryKey(),
  UserId: integer('UserId')
    .notNull()
    .references(() => users.Id),
  ExerciseType: varchar('ExerciseType', { length: 100 }).notNull(),
  Duration: integer('Duration').notNull(), // minutes
  CaloriesBurned: decimal('CaloriesBurned', { precision: 8, scale: 2 }),
  Date: timestamp('Date').notNull(),
  CreatedAt: timestamp('CreatedAt').defaultNow(),
})
