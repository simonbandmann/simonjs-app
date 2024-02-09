'use server'

import { sleep } from '@/helpers'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { revalidatePath } from 'next/cache'
import path from 'path'
import { signOut as nexAuthSignOut } from '@/lib/auth'
import { redirect } from 'next/navigation'

type StoreItem = typeof products.$inferInsert

export const getStoreItems = async () => {
    await sleep(500)
    return db.select().from(products)
}

export const addStoreItem = async (formData: FormData) => {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    let imagesToInsert: string[] = []

    if (imageFile.size > 0) {
        const relativeDirectory = 'static/images'
        const fileName = `${Date.now()}_original_${imageFile.name}`
        const uploadDirectory = path.join(
            process.cwd(),
            'public',
            relativeDirectory,
        )
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        if (!existsSync(uploadDirectory)) {
            mkdirSync(uploadDirectory)
        }

        const originalImagePath = path.join(uploadDirectory, fileName)
        writeFileSync(originalImagePath, buffer)

        imagesToInsert.push(fileName)
    }

    const item: StoreItem = {
        name,
        description,
        ...(imagesToInsert.length && { image: imagesToInsert }),
    }

    await db.insert(products).values(item)
    revalidatePath('/dashboard')
}

export const signOut = async () => {
    await nexAuthSignOut()
    revalidatePath('/')
    redirect('/')
}
