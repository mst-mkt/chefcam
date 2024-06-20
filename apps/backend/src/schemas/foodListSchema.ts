import { z } from 'zod'
const foodListSchema = z.object({
  ingredients: z.array(z.string()).describe('画像に含まれている食材のリスト'),
})

type FoodList = z.infer<typeof foodListSchema>

export { foodListSchema, type FoodList }
