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

  const recipeList = $('#search-recipes-list')
  const recipes = recipeList.children()
  const recipeData = recipes
    .map((_, recipe) => {
      const title = $(recipe).find('h2').text()
      const url = $(recipe).find('h2>a').attr('href')
      const image = $(recipe).find('.flex-none > picture > img').attr('src')
      const ingredients = $(recipe)
        .find('[data-ingredients-highlighter-target="ingredients"]')
        .contents()
        .map((_, ingredient) => $(ingredient).text())
        .filter((_, ingredient) => ingredient !== '•')
        .get()
      const newRecipe = { title, url: `${COOKPAD_BASE_URL}${url}`, image, ingredients }
      const validatedRecipe = recipeSchema.safeParse(newRecipe)
      if (!validatedRecipe.success) {
        console.error('Invalid recipe:', validatedRecipe.error.issues)
        console.table(validatedRecipe.error.issues)
        return null
      }
      return validatedRecipe.data
    })
    .get()

  return { data: recipeData }
}

export const getRecipes = async (cookpadSearchParam: CookpadSearchParam, trialCount = 1) => {
  const html = await fetchCookpadHtml(cookpadSearchParam, trialCount)
  const { data } = await scrapeCookpadHtml(html)

  return { data, page: cookpadSearchParam.page }
}
