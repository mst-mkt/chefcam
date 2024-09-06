import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../../factory'
import { scrapeRecipePage } from '../../features/recipes/info/scraper'

const pathParamSchema = z.object({
  recipeId: z.string().min(1),
})

export const recipeRouter = honoFactory
  .createApp()
  .get('/:recipeId', zValidator('param', pathParamSchema), async (c) => {
    const { recipeId } = c.req.valid('param')

    const res = await fetch(`https://cookpad.com/jp/recipes/${recipeId}`)
    const html = await res.text()

    const recipe = await scrapeRecipePage(html)

    return c.json({ recipe })
  })
