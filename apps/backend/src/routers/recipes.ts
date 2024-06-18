import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { recipesReqSchema } from '../schemas/recipesSchema'

const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', recipesReqSchema), async (c) => {
    const { ingredients } = c.req.valid('query')

    return c.json({ message: `hello ${ingredients.join(', ')}` })
  })

export { recipesRouter }
