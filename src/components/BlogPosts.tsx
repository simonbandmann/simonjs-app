import Image from 'next/image'
import DeletePostButton from './DeletePostButton'
import { Session } from 'next-auth'
import EditPostDialog from './EditPostDialog'

export default async function BlogPosts({
    posts,
    session,
}: {
    posts: any
    session: Session | null
}) {
    return (
        <div>
            {posts.map((post: any) => {
                const image = post.attributes?.images?.data?.[0].attributes

                const editPostData = {
                    id: post.id,
                    title: post.attributes.title,
                    content: post.attributes.textSection,
                    images: post.attributes.images,
                }

                return (
                    <div key={post.id} className='post'>
                        {post.attributes.title}
                        {image && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${image.url}`}
                                alt={image.name}
                                sizes='100vw'
                                width={image.width}
                                height={image.height}
                                className='post-image-wrapper'
                            />
                        )}

                        {session ? (
                            <div className='post-actions'>
                                <DeletePostButton postId={post.id} />
                                <EditPostDialog postData={editPostData} />
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}
