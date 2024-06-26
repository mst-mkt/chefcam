import { z } from 'zod'

const ingredientsSchema = z.object({
  data: z.array(z.string()).describe('食材のリスト'),
})

export { ingredientsSchema }
