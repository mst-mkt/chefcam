import { ChatOpenAI } from '@langchain/openai'
import { createMiddleware } from 'hono/factory'

export const aiMiddleware = createMiddleware(async (c, next) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = c.env
  if (OPENAI_API_KEY === undefined) {
    throw new Error('OPENAI_API_KEY is not defined')
  }
  if (OPENAI_BASE_URL === undefined) {
    throw new Error('OPENAI_REQUEST_BASE_URL is not defined')
  }
  const requestUrl = new URL(OPENAI_BASE_URL).toString()

  const ai = new ChatOpenAI({
    model: 'gpt-4o',
    apiKey: OPENAI_API_KEY,
    configuration: {
      baseURL: requestUrl,
    },
    temperature: 0,
  })

  c.set('ai', ai)

  await next()
})
