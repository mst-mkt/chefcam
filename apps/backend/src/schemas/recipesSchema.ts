import { z } from 'zod'

const recipesReqSchema = z
  .object({
    ingredients: z.array(z.string()),
  })
  .strict()

export { recipesReqSchema }
