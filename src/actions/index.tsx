'use server'

import { sleep } from '@/helpers'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { signOut as nexAuthSignOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { eq } from 'drizzle-orm'

export type StoreItem = typeof products.$inferInsert

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    },
})

export const getStoreItems = async () => {
    await sleep(1000)
    return db.select().from(products)
}

export const addStoreItem = async (formData: FormData) => {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    const fileData: { url?: string } = {}
    const imagesToInsert: string[] = []

    if (imageFile.size > 0) {
        const { name: fileName } = imageFile
        const buffer = Buffer.from(await imageFile.arrayBuffer())
        const baseUrl: string = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/`

        try {
            await uploadFileToS3(buffer, fileName)
            fileData.url = baseUrl + fileName
            imagesToInsert.push(fileData.url)
        } catch {
            //
        }
    }

    const item: StoreItem = {
        name,
        description,
        ...(imagesToInsert.length && { image: imagesToInsert }),
    }

    await db.insert(products).values(item)
    revalidatePath('/dashboard')
}

export const updateStoreItem = async (id: number, name: string) => {
    await db.update(products).set({ name }).where(eq(products.id, id))
    revalidatePath('/dashboard')
}

export const deleteStoreItem = async (id: number) => {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/dashboard')
}

export const signOut = async () => {
    await nexAuthSignOut()
    revalidatePath('/')
    redirect('/')
}

async function uploadFileToS3(file: Buffer, fileName: string) {
    const fileBuffer = file

    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: 'image/png',
    }

    const command = new PutObjectCommand(params)

    try {
        const response = await s3Client.send(command)
        console.log('file uploaded successfully:', response)
    } catch (error) {
        console.log(error)
    }
}
