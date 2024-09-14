import fs from 'node:fs'
import dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config({
  path: './.dev.vars',
})

const localDbUrl = (() => {
  const dir = './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/'
  const files = fs.readdirSync(dir)
  const dbFile = files.find((file) => file.endsWith('.sqlite'))

  if (dbFile === undefined) throw new Error('Database file not found')

  return `${dir}${dbFile}`
})()

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
    url: localDbUrl,
  },
} satisfies Config

export default process.env.NODE_ENV === 'production' ? remoteConfig : localConfig
