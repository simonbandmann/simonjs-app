/* eslint-disable react/no-unknown-property */
import useMouse from '@/hooks/useMouse'
import { useFrame, useThree } from '@react-three/fiber'
import { useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import React, { useRef } from 'react'
import { fragment, vertex } from './shaders'
import { useTexture } from '@react-three/drei'

export default function Model({ image }: { image: any }) {
    const mouse = useMouse()
    const smoothMouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    }

    const texture = useTexture(image)
    const uniforms = useRef({
        uTexture: { value: texture },
    })

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

    useFrame(() => {
        const { x, y } = mouse
        smoothMouse.x.set(lerp(smoothMouse.x.get(), x.get(), 0.1))
        smoothMouse.y.set(lerp(smoothMouse.y.get(), y.get(), 0.1))
    })

    const {
        viewport: { width, height },
    } = useThree()
    const minWidth = (width / 2) * -1
    const maxWidth = width / 2
    const minHeight = height / 2
    const maxHeight = (height / 2) * -1
    const x = useTransform(
        smoothMouse.x,
        [0, window.innerWidth],
        [minWidth, maxWidth],
    )
    const y = useTransform(
        smoothMouse.y,
        [0, window.innerHeight],
        [minHeight, maxHeight],
    )

    return (
        <motion.mesh position-x={x} position-y={y}>
            <planeGeometry args={[2, 3, 15, 15]} />
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                wireframe={true}
                uniforms={uniforms.current}
            />
        </motion.mesh>
    )
}
