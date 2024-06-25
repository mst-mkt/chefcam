import { z } from 'zod'

const cookpadSearchParamSchema = z.object({
  ingredients: z.array(z.string()).describe('検索する食材'),
  page: z.number().int().positive().default(1).describe('ページ数'),
  recipe_hits: z.number().int().positive().optional().describe('レシピの表示数'),
})

type CookpadSearchParam = z.infer<typeof cookpadSearchParamSchema>

export { cookpadSearchParamSchema, type CookpadSearchParam }
