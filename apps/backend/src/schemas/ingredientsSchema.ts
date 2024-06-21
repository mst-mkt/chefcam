import { z } from 'zod'
const ingredientsSchema = z.object({
  ingredients: z.array(z.string()).describe('食材のリスト'),
})

type ingredients = z.infer<typeof ingredientsSchema>

export { ingredientsSchema, type ingredients }
