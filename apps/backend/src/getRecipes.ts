import { load } from 'cheerio'
import { COOKPAD_BASE_URL } from './constants/cookpad'
import type { CookpadSearchParam } from './schemas/cookpadSearchParamSchema'
import { recipeSchema } from './schemas/recipesSchema'
import { createSearchRecipesUrl } from './utils/createSearchUrl'

const fetchCookpadHtml = async (
  cookpadSearchParam: CookpadSearchParam,
  trialCount = 1,
): Promise<string> => {
  const url = createSearchRecipesUrl(cookpadSearchParam)
  const res = await fetch(url)

  if (!res.ok) {
    if (trialCount < 3) {
      const threeIngredients = cookpadSearchParam.ingredients.slice(0, 2 * (3 - trialCount))
      const newCookpadSearchParam = { ...cookpadSearchParam, ingredients: threeIngredients }
      const res = await fetchCookpadHtml(newCookpadSearchParam, trialCount + 1)
      return res
    }

    throw new Error(`Failed to fetch the recipes: ${res.statusText}`)
  }

  const html = await res.text()
  return html
}

const scrapeCookpadHtml = async (html: string) => {
  const $ = load(html)
  const recipeHits = Number.parseInt(
    $('.recipes_section .search_title > .count')
      .text()
      .replace(/[^0-9]/g, ''),
  )

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

  return { data: recipes, recipeHits }
}

export const getRecipes = async (cookpadSearchParam: CookpadSearchParam, trialCount = 1) => {
  const html = await fetchCookpadHtml(cookpadSearchParam, trialCount)
  const { data, recipeHits } = await scrapeCookpadHtml(html)

  return { data, page: cookpadSearchParam.page, recipeHits }
}
