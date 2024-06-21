import { load } from 'cheerio'
import type { ingredients } from './schemas/ingredientsSchema'
import { type Recipes, recipeSchema } from './schemas/recipesSchema'
import { createSearchRecipesUrl } from './utils/createSearchUrl'

const fetchRecipes = async (url: string): Promise<Recipes> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch the recipes: ${res.statusText}`)
  const data = await res.text()

  const $ = load(data)
  const recipes = $('.recipe-list .recipe-preview')
    .map((index, element) => {
      const image = $(element).find('.recipe-image img').attr('src')
      const title = $(element).find('.recipe-title').text().trim()
      const ingredients = $(element)
        .find('.ingredients')
        .text()
        .trim()
        .split('、')
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => !ingredient.includes('\n...'))
      const newRecipe = { image, title, ingredients }

      const validatedRecipe = recipeSchema.safeParse(newRecipe)
      if (!validatedRecipe.success) {
        console.error(`Invalid recipe at index ${index}:`, validatedRecipe.error)
        return null
      }
      return validatedRecipe.data
    })
    .get()
    .filter((recipe) => recipe !== null)

  return recipes
}

const getRecipesByIngredients = async (ingredients: ingredients): Promise<Recipes> => {
  const searchUrl = createSearchRecipesUrl(ingredients)
  return await fetchRecipes(searchUrl)
}

export { getRecipesByIngredients }
