import { z } from 'zod'
export const recipeSchema = z.object({
  recipeImage: z.string(),
  recipeTitle: z.string(),
  ingredients: z.array(z.string()),
})

export type Recipe = z.infer<typeof recipeSchema>
export type Recipes = Recipe[]

export const recipesSchema = z.array(recipeSchema)
