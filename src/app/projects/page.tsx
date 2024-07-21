import { ProjectsList } from '@/components/ProjectsList'
import { getBlogPosts } from '@/helpers/fetchers'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page() {
    const posts = (await getBlogPosts())?.data
    const session = await getServerSession(authOptions)
    if (!session) return null
    return <ProjectsList posts={posts} />
}
