import { getPosts } from '@/actions'
import AddPostDialog from '@/components/AddPostDialog'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function Page() {
    const posts = await getPosts()
    const session = await getServerSession(authOptions)

    return (
        <main>
            {session && <AddPostDialog />}
            <Suspense fallback='Loading blog articles...'>
                <ul>
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ fontWeight: 900 }}>{post.name}</div>
                            <div style={{ fontSize: '0.8rem' }}>
                                {post.content}
                            </div>
                            {post.images && (
                                <Image
                                    src={post?.images[0]}
                                    alt='alt'
                                    width={800}
                                    height={600}
                                    className=''
                                    style={{ objectFit: 'contain' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </Suspense>
        </main>
    )
}
