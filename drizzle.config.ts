import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    dialect: 'sqlite',
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
})
