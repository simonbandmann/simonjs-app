import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { auth } from '@/lib/auth'
import NavigationMenu from '@/components/NavigationMenu'

export const metadata: Metadata = {
    title: 'SimonJS',
    description: 'SimonJS - A Custom React Starter Template',
}

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await auth()
    const user = session?.user

    return (
        <html lang='de'>
            <body>
                <NavigationMenu user={user} />
                <div className='container'>{children}</div>
            </body>
        </html>
    )
}
