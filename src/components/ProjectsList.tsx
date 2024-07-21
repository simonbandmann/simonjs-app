'use client'

import React, { useState } from 'react'
import Scene from './Scene/Scene'

function ProjectsList({ posts }: { posts: any }) {
    const [project, setProject] = useState()
    return (
        <>
            {project && <Scene project={project} />}
            {posts.map((post: any) => {
                return (
                    <div
                        key={post.id}
                        className='post'
                        onMouseEnter={() => {
                            setProject(post)
                        }}
                    >
                        {post.attributes.title}
                    </div>
                )
            })}
        </>
    )
}

export { ProjectsList }
