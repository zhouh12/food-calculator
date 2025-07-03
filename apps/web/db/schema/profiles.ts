import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const profiles = pgTable('Profiles', {
  Id: serial('Id').primaryKey(),
  UserId: integer('UserId')
    .notNull()
    .references(() => users.Id),
  Age: integer('Age').notNull(),
  Weight: integer('Weight').notNull(),
  Height: integer('Height').notNull(),
  Goal: varchar('Goal', { length: 20 }).notNull(),
  Gender: varchar('Gender', { length: 10 }).notNull(),
  ActivityLevel: varchar('ActivityLevel', { length: 20 }).notNull(),
})
