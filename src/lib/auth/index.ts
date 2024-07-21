import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { eq } from 'drizzle-orm'
import EmailProvider from 'next-auth/providers/email'
import type { Adapter } from 'next-auth/adapters'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
    adapter: DrizzleAdapter(db) as Adapter,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        signIn: async ({ user }) => {
            if (user?.email) {
                const dbUser = await db.query.users.findFirst({
                    where: eq(users.email, user.email),
                })
                if (dbUser?.isAdmin) return true
            }
            return false
        },
        session: async ({ session, user }) => {
            session.user.id = user.id
            return session
        },
    },
}
