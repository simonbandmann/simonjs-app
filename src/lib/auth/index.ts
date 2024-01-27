import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '../db'

export const { handlers, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Email({
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
})
