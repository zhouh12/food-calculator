import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('Users', {
  Id: serial('Id').primaryKey(),
  Name: varchar('Name', { length: 255 }).notNull(),
  Email: varchar('Email', { length: 255 }).notNull().unique(),
  Password: varchar('Password', { length: 255 }).notNull(),
  CreatedAt: timestamp('CreatedAt').defaultNow(),
})
