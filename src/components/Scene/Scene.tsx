'use client'

import { Canvas } from '@react-three/fiber'
import Model from './Model'

export default function Scene({ project }: { project: any }) {
    const imageUrl = `${process.env.NEXT_PUBLIC_CMS_BASE_URL}${project?.attributes?.images?.data[0]?.attributes?.url}`
    return (
        <div className='scene-wrapper'>
            <Canvas>
                <Model image={imageUrl} />
            </Canvas>
        </div>
    )
}
