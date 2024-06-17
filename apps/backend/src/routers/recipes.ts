import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { recipesReqSchema } from '../schemas/recipesSchema'

const recipesRouter = new Hono()

recipesRouter.get('/', zValidator('query', recipesReqSchema), async (c) => {
  const { ingredients } = c.req.valid('query')

  return c.json({ message: `hello ${ingredients.join(', ')}` })
})

export { recipesRouter }
