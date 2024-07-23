'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 megabytes in bytes

export const addPostAction = async (formData: FormData) => {
    const session = await getServerSession(authOptions)

    if (!session?.user) return

    const foundUser = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user.id))

    if (foundUser[0].isAdmin === false) {
        // TODO: add error message response
        return
    }

    const postSchema = z.object({
        title: z.string().min(1),
        imageFiles: z
            .instanceof(File)
            .refine((file) => file.size <= MAX_FILE_SIZE, {
                message: `File size must be less than or equal to ${MAX_FILE_SIZE / (1024 * 1024)} megabytes`,
            })
            .array(),
    })

    type Post = z.infer<typeof postSchema>

    const post: Post = {
        title: formData.get('title') as string,
        imageFiles: formData.getAll('images') as File[],
    }

    const validationResult = postSchema.safeParse(post)

    if (!validationResult.success) {
        console.error(validationResult.error.errors)
        return
    } else {
        console.log('File is valid')
    }

    const sanitizedFormData = new FormData()
    sanitizedFormData.append('data', JSON.stringify(post))

    for (const file of post.imageFiles) {
        console.log('checking', file.name)
        if (file.size > 0) {
            sanitizedFormData.append('files.images', file, file.name)
        }
    }

    try {
        await fetch('https://cms.simonbandmann.de/api/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_SECRET}`,
            },
            body: sanitizedFormData,
        })
    } catch (err) {
        console.log(err)
        return null
    } finally {
        redirect('/')
    }
}

export const editPostAction = async (postId: number, formData: FormData) => {
    const session = await getServerSession(authOptions)

    if (!session?.user) return

    const foundUser = await db
        .select()
        .from(users)
        .where(eq(users.id, session?.user.id))

    if (foundUser[0].isAdmin === false) {
        return
    }

    const postSchema = z.object({
        title: z.string().min(1),
    })

    type Post = z.infer<typeof postSchema>

    const post: Post = {
        title: formData.get('title') as string,
    }

    const validationResult = postSchema.safeParse(post)

    if (!validationResult.success) {
        console.error(validationResult.error.errors)
        return
    } else {
        console.log('Data is valid:', validationResult.data)
    }

    const sanitizedFormData = new FormData()

    sanitizedFormData.append('data', JSON.stringify(post))

    const url = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/api/posts/${postId}`

    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_SECRET}`,
            },
            body: sanitizedFormData,
        })
        redirect('/')
    } catch (err) {
        console.log(err)
    }
}

export const deletePostAction = async (postId: number) => {
    const url = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/api/posts/${postId}`

    try {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_SECRET}`,
            },
        })
        revalidatePath('/blog')
    } catch (err) {
        console.log(err)
    }
}
