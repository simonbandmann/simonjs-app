import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'SimonJS',
    description: 'SimonJS - A Custom React Starter Template',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='de'>
            <body>
                {children}
            </body>
        </html>
    )
}
