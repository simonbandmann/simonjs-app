import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

export const { handlers, auth, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
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
    },
})
