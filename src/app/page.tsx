import AddPostDialog from '@/components/AddPostDialog'
import BlogPosts from '@/components/BlogPosts'
import { getBlogPosts } from '@/helpers/fetchers'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const Page = async () => {
    const posts = (await getBlogPosts())?.data
    const session = await getServerSession(authOptions)

    if (posts) {
        return (
            <>
                {session ? <AddPostDialog /> : null}
                <BlogPosts posts={posts} session={session} />
            </>
        )
    }
}

export default Page
