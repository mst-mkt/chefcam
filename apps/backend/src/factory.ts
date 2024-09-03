import type { ChatOpenAI } from '@langchain/openai'
import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'
import { aiMiddleware } from './middlewares/ai'

export type BindingsType = {
  FRONTEND_BASE_URL: string | undefined
  OPENAI_API_KEY: string | undefined
  OPENAI_BASE_URL: string | undefined
}

type VariablesType = {
  ai: ChatOpenAI
}

type HonoConfigType = {
  Bindings: BindingsType
  Variables: VariablesType
}

const honoFactory = createFactory<HonoConfigType>({
  initApp: (app) => {
    app
      .use(
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
      .use('*', aiMiddleware)
  },
})

export { honoFactory }
