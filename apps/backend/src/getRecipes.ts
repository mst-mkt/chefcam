import { load } from 'cheerio'
import { COOKPAD_BASE_URL } from './constants/cookpad'
import type { CookpadSearchParam } from './schemas/cookpadSearchParamSchema'
import { type Recipes, recipeSchema } from './schemas/recipesSchema'
import { createSearchRecipesUrl } from './utils/createSearchUrl'

const getRecipes = async (
  cookpadSearchParam: CookpadSearchParam,
  trialCount = 1,
): Promise<Recipes> => {
  const url = createSearchRecipesUrl(cookpadSearchParam)
  const res = await fetch(url)
  if (!res.ok) {
    if (trialCount < 3) {
      const threeIngredients = cookpadSearchParam.ingredients.slice(0, 2 * (3 - trialCount))
      return getRecipes({ ...cookpadSearchParam, ingredients: threeIngredients }, trialCount + 1)
    }
    throw new Error(`Failed to fetch the recipes: ${res.statusText}`)
  }
  const data = await res.text()

  const $ = load(data)
  const recipes = $('.recipe-list .recipe-preview')
    .map((index, element) => {
      const image = $(element).find('.recipe-image img').attr('src')
      const title = $(element).find('.recipe-title').text().trim()
      const url = $(element).find('.recipe-title').attr('href')
      const fullUrl = url !== undefined ? new URL(url, COOKPAD_BASE_URL).href : undefined
      const ingredients = $(element)
        .find('.ingredients')
        .text()
        .trim()
        .split('、')
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => !ingredient.includes('\n...'))
      const newRecipe = { url: fullUrl, image, title, ingredients }

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

export { getRecipes }
