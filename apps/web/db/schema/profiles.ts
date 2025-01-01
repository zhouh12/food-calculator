import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const profiles = pgTable('Profiles', {
  Id: serial('Id').primaryKey(),
  UserId: integer('UserId')
    .notNull()
    .references(() => users.Id),
  Age: integer('Age').notNull(),
  Weight: integer('Weight').notNull(),
  Goal: varchar('Goal', { length: 20 }).notNull(),
  WorkoutsPerWeek: integer('WorkoutsPerWeek').notNull(),
  Gender: varchar('Gender', { length: 10 }).notNull(),
})
