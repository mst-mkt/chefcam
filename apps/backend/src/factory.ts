import { authHandler, verifyAuth } from '@hono/auth-js'
import type { LanguageModel } from 'ai'
import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'
import { aiModelMiddleware } from './middlewares/aiModel'
import { authMiddleware } from './middlewares/auth'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
  OPENAI_API_KEY: string | undefined
  OPENAI_BASE_URL: string | undefined
}

type VariablesType = {
  model: LanguageModel
}

type HonoConfigType = {
  Bindings: BindingsType
  Variables: VariablesType
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
      }),
    )

    app.use('*', aiModelMiddleware)

    app.use('*', authMiddleware)
    app.use('/auth/*', authHandler())
    app.use('*', verifyAuth())
  },
})

export { honoFactory }
