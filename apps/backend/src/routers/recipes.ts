import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { recipeSchema } from '../schemas/recipesSchema'
const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', recipeSchema), async (c) => {
    const { ingredients } = c.req.valid('query')

    return c.json({ message: `hello ${ingredients.join(', ')}` })
  })

export { recipesRouter }
