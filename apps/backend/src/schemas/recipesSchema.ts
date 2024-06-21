import { z } from 'zod'
import { ingredientsSchema } from './ingredientsSchema'

const recipeSchema = ingredientsSchema.extend({
  recipeImage: z.string().url().describe('レシピの画像のURL'),
  recipeTitle: z.string().describe('レシピのタイトル'),
})
const recipesSchema = z.array(recipeSchema)

type Recipes = z.infer<typeof recipesSchema>

export { recipeSchema, recipesSchema, type Recipes }
