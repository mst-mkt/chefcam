import { z } from 'zod'

const numericString = z.string().regex(/^\d+$/, { message: 'This field must be a number' })

const cookpadSearchParamSchema = z.object({
  ingredients: z
    .array(numericString)
    .min(1)
    .or(numericString.transform((v) => [v]))
    .describe('検索する食材'),
  page: z
    .string()
    .min(1)
    .optional()
    .default('1')
    .describe('ページ番号')
    .transform((v) => Number.parseInt(v)),
  recipe_hits: z
    .string()
    .min(1)
    .optional()
    .describe('レシピの表示数')
    .transform((v) => (v === undefined ? undefined : Number.parseInt(v))),
})

type CookpadSearchParam = z.infer<typeof cookpadSearchParamSchema>

export { cookpadSearchParamSchema, type CookpadSearchParam }
