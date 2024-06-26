import { z } from 'zod'

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
  recipe_hits: numericString
    .optional()
    .describe('レシピの表示数')
    .transform((v) => (v === undefined ? undefined : Number.parseInt(v))),
})

type CookpadSearchParam = z.infer<typeof cookpadSearchParamSchema>

export { cookpadSearchParamSchema, type CookpadSearchParam }
