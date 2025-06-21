I'll help you find the best practices for saving data to a database using Next.js App Router. Let me get the latest Next.js documentation first.
Ran tool
Now let me get the Next.js documentation focusing on database operations and data handling:
Ran tool
Based on the latest Next.js documentation, here are the **best practices for saving data to a database using Next.js App Router**:

## **1. Server Actions - The Recommended Approach**

Server Actions are the modern way to handle data mutations in Next.js App Router. They allow you to securely execute server-side code directly from your components.

### **Create Server Actions in a separate file:**

```tsx
// apps/web/core/users/actions.ts
'use server'

import { db } from '@/lib/db' // Your database client
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createUser(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    // Validate data
    if (!name || !email) {
      throw new Error('Name and email are required')
    }

    // Save to database
    const user = await db.user.create({
      data: { name, email },
    })

    // Revalidate cache
    revalidateTag('users')
    revalidatePath('/profile')

    return { success: true, user }
  } catch (error) {
    console.error('Failed to create user:', error)
    return { success: false, error: error.message }
  }
}

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      // ... other fields
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data,
    })

    // Revalidate specific cache tags
    revalidateTag('user-profile')
    revalidatePath('/profile')

    return { success: true, user: updatedUser }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### **Use Server Actions in your forms:**

```tsx
// apps/web/app/(auth)/profile/components/ProfileForm.tsx
import { updateUserProfile } from '@/core/users/actions'

export default function ProfileForm({ user }: { user: User }) {
  return (
    <form action={updateUserProfile.bind(null, user.id)}>
      <input name="name" defaultValue={user.name} />
      <input name="bio" defaultValue={user.bio} />
      <button type="submit">Update Profile</button>
    </form>
  )
}
```

## **2. Database Integration Patterns**

### **Server Components for Data Fetching:**

```tsx
// apps/web/app/(auth)/profile/page.tsx
import { db } from '@/lib/db'
import { unstable_cache } from 'next/cache'

// Cache database queries with tags for revalidation
const getCachedUser = unstable_cache(
  async (userId: string) => {
    return await db.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    })
  },
  ['user-profile'],
  { revalidate: 3600, tags: ['user-profile'] }
)

export default async function ProfilePage() {
  const user = await getCachedUser('user-id')

  return (
    <div>
      <h1>{user.name}</h1>
      <ProfileForm user={user} />
    </div>
  )
}
```

### **Deduplicate Database Requests:**

```tsx
// apps/web/core/users/queries.ts
import { cache } from 'react'
import { db } from '@/lib/db'

export const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({
    where: { id: parseInt(id) },
    include: { profile: true },
  })
  return user
})
```

## **3. Error Handling & Validation**

```tsx
// apps/web/core/users/actions.ts
'use server'

import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  bio: z.string().optional(),
})

export async function createUser(formData: FormData) {
  // Validate form data
  const validatedFields = userSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    bio: formData.get('bio'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data.',
    }
  }

  try {
    const { name, email, bio } = validatedFields.data

    const user = await db.user.create({
      data: { name, email, bio },
    })

    revalidateTag('users')
    redirect(`/profile/${user.id}`)
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create User.',
    }
  }
}
```

## **4. Project Structure Recommendations**

Based on your `@/profile` and `@/core` structure:

```
apps/web/
├── app/(auth)/
│   └── profile/
│       ├── page.tsx          # Server Component
│       ├── components/       # UI Components
│       └── actions/          # Page-specific actions
└── core/
    └── users/
        ├── actions.ts        # Shared user actions
        ├── queries.ts        # Shared user queries
        └── types.ts          # User types
```

## **5. Key Benefits of This Approach:**

- **Security**: Server Actions run on the server, keeping database credentials safe
- **Performance**: Built-in caching and revalidation
- **Type Safety**: Full TypeScript support end-to-end
- **Progressive Enhancement**: Forms work without JavaScript
- **Cache Management**: Granular cache invalidation with tags
- **Error Handling**: Server-side validation and error boundaries

## **6. Cache Strategy:**

```tsx
// Revalidate specific data after mutations
revalidateTag('users') // Revalidate all user-related cache
revalidatePath('/profile') // Revalidate specific page
```

This approach provides the best developer experience, security, and performance for data operations in Next.js App Router applications.
