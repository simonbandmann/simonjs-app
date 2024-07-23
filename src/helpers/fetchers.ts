const getBlogPosts = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/api/posts?populate=*&sort=createdAt:desc`,
            {
                cache: 'no-store',
            },
        )
        const data = await res.json()
        return data
    } catch {
        return new Error('Failed to get data')
    }
}

export { getBlogPosts }
