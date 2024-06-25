import { z } from 'zod'

const recipeSchema = z.object({
  url: z.string().url().describe('レシピのURL'),
  image: z.string().url().describe('レシピの画像のURL'),
  title: z.string().describe('レシピのタイトル'),
  ingredients: z.array(z.string()).describe('レシピの材料'),
})

const recipesSchema = z.array(recipeSchema)

type Recipes = z.infer<typeof recipesSchema>

export { recipeSchema, recipesSchema, type Recipes }
