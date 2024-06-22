import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { fetchRecipes } from '../getRecipes'
import { ingredientsSchema } from '../schemas/ingredientsSchema'

const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', ingredientsSchema), async (c) => {
    const { ingredients } = c.req.valid('query')
    try {
      const recipes = await fetchRecipes({ ingredients })
      return c.json(recipes)
    } catch (error) {
      return c.json({ error }, 500)
    }
  })

export { recipesRouter }
