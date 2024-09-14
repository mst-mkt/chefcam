import type { Config } from 'drizzle-kit'

const remoteConfig = {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations/',
  dialect: 'sqlite',
  driver: 'd1-http',
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
