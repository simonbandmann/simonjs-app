import BlogPosts from '@/components/BlogPosts'
import { getBlogPosts } from '@/helpers/fetchers'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const Page = async () => {
    const posts = (await getBlogPosts())?.data
    const session = await getServerSession(authOptions)

    if (posts) {
        return (
            <>
                {session ? (
                    <Link href='/add' className='button button-primary'>
                        Add post
                    </Link>
                ) : null}
                <BlogPosts posts={posts} session={session} />
            </>
        )
    }
}

export default Page
