import type { Config } from 'drizzle-kit'

export default {
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations/',
  dialect: 'sqlite',
  driver: 'd1-http',
} satisfies Config
