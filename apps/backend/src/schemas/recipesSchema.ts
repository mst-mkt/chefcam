import { z } from 'zod'
import { ingredientsSchema } from './ingredientsSchema'

const recipeSchema = ingredientsSchema.extend({
  url: z.string().url().describe('レシピのURL'),
  image: z.string().url().describe('レシピの画像のURL'),
  title: z.string().describe('レシピのタイトル'),
})
const recipesSchema = z.array(recipeSchema)

type Recipes = z.infer<typeof recipesSchema>

export { recipeSchema, recipesSchema, type Recipes }
