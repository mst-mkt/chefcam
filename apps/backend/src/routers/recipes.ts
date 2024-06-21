import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { getRecipesByIngredients } from '../getRecipes'
import { ingredientsSchema } from '../schemas/ingredientsSchema'

const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', ingredientsSchema), async (c) => {
    try {
      const { ingredients } = c.req.valid('query')
      const recipes = await getRecipesByIngredients({ ingredients })
      return c.json(recipes)
    } catch (error) {
      console.error('Error in recipesRouter:', error)
      return c.json({ error: 'An unexpected error occurred while fetching recipes' }, 500)
    }
  })

export { recipesRouter }
