import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import NavigationMenu from '@/components/NavigationMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
    title: 'SimonJS',
    description: 'SimonJS - A Custom React Starter Template',
}

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await getServerSession(authOptions)
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
