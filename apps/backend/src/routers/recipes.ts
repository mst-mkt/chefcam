import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'
import { getRecipes } from '../features/recipes/scraper'
import { recipeRouter } from './recipes/[recipeId]'

const numericString = z.string().regex(/^\d+$/, { message: 'This field must be a number' })
const cookpadSearchParamSchema = z.object({
  ingredients: z
    .union([z.array(z.string().min(1)).min(1), z.string().min(1)])
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .describe('検索する食材'),
  page: numericString
    .optional()
    .default('1')
    .describe('ページ番号')
    .transform((v) => Number.parseInt(v)),
})

const recipesRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', cookpadSearchParamSchema), async (c) => {
    const { ingredients, page } = c.req.valid('query')

    try {
      const recipes = await getRecipes(ingredients, page)
      return c.json(recipes)
    } catch (error) {
      return c.json({ error }, 500)
    }
  })
  .route('/', recipeRouter)

export { recipesRouter }
