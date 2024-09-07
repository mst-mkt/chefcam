import { createOpenAI } from '@ai-sdk/openai'
import { createMiddleware } from 'hono/factory'

export const aiModelMiddleware = createMiddleware(async (c, next) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = c.env
  if (OPENAI_API_KEY === undefined) {
    throw new Error('OPENAI_API_KEY is not defined')
  }
  if (OPENAI_BASE_URL === undefined) {
    throw new Error('OPENAI_REQUEST_BASE_URL is not defined')
  }
  const requestUrl = new URL(OPENAI_BASE_URL).toString()

  const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: requestUrl,
  })

  const model = openai('gpt-4o-mini')

  c.set('model', model)

  await next()
})
