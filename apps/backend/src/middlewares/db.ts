import { drizzle } from 'drizzle-orm/d1'
import { createMiddleware } from 'hono/factory'

export const dbMiddleware = createMiddleware(async (c, next) => {
  const dbClient = drizzle(c.env.DB)

  c.set('db', dbClient)

  await next()
})
