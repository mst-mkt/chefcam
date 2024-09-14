import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({
  path: './.dev.vars',
})

const remoteConfig = {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations/',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? '',
    token: process.env.CLOUDFLARE_API_TOKEN ?? '',
    databaseId: process.env.D1_DATABASE_ID ?? '',
  },
} satisfies Config

const localConfig = {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations/',
  dialect: 'sqlite',
  dbCredentials: {
    url: './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/035cee5d9d4111e5318a84d863dfb624ed8cb5bd2da46860deb321a831411ff2.sqlite',
  },
} satisfies Config

export default process.env.NODE_ENV === 'production' ? remoteConfig : localConfig
