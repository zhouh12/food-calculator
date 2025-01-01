import { defineConfig } from 'drizzle-kit'

// export default {
//   dialect: 'postgresql',
//   schema: './persistence/entities/users/user.ts',
//   out: './drizzle',
//   driver: 'postgresql',
//   dbCredentials: {
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   },
// } satisfies Config

export default defineConfig({
  schema: './db/schema',
  out: './db/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL!,
  },
})
