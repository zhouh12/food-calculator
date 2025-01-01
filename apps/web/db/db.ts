import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema/users'

if (!process.env.SUPABASE_DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const connectionString = process.env.SUPABASE_DATABASE_URL

const client = postgres(connectionString)
export const db = drizzle(client, { schema })
