import { authHandler } from '@hono/auth-js'
import type { LanguageModel } from 'ai'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'
import { aiModelMiddleware } from './middlewares/aiModel'
import { authMiddleware } from './middlewares/auth'
import { dbMiddleware } from './middlewares/db'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
  OPENAI_API_KEY: string | undefined
  OPENAI_BASE_URL: string | undefined
  // biome-ignore lint/correctness/noUndeclaredVariables: D1Database is declared in @cloudflare/workers-types
  DB: D1Database
}

declare module 'hono' {
  interface ContextVariableMap {
    model: LanguageModel
    db: DrizzleD1Database
  }
}

type HonoConfigType = {
  Bindings: BindingsType
}

const honoFactory = createFactory<HonoConfigType>({
  initApp: (app) => {
    app.use(
      cors({
        allowMethods: ['GET', 'POST'],
        origin: (_, c) => {
          const { FRONTEND_BASE_URL } = c.env
          if (FRONTEND_BASE_URL === undefined) {
            throw new Error('FRONTEND_BASE_URL is not set')
          }

          return FRONTEND_BASE_URL
        },
        credentials: true,
      }),
    )

    app.use('*', aiModelMiddleware)
    app.use('*', dbMiddleware)

    app.use('*', authMiddleware)
    app.use('/auth/*', authHandler())
  },
})

export { honoFactory }
