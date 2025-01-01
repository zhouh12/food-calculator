import { drizzle } from 'drizzle-orm/node-postgres' // Adjust based on your database
import { Pool } from 'pg' // Adjust based on your database

const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL, // Ensure you have this in your .env
})

export const db = drizzle(pool)
