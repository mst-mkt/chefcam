import { z } from 'zod'
import { foodListSchema } from './foodListSchema'

const recipeSchema = foodListSchema.extend({
  recipeImage: z.string().url().describe('レシピの画像のURL'),
  recipeTitle: z.string().describe('レシピのタイトル'),
})
const recipesSchema = z.array(recipeSchema)
type Recipes = z.infer<typeof recipesSchema>

export { recipesSchema, type Recipes }
