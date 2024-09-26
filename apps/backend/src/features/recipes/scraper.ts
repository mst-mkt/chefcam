import { load } from 'cheerio'
import { z } from 'zod'
import { createRecipesUrl } from './createUrl'
import { getRecipeIdFromUrl } from './info/recipeId'

const recipeSchema = z.object({
  id: z.string().describe('レシピのURL'),
  image: z.string().url().describe('レシピの画像のURL'),
  title: z.string().describe('レシピのタイトル'),
  ingredients: z.array(z.string()).describe('レシピの材料'),
})

const fetchCookpadHtml = async (
  ingredients: string[],
  page: number,
  trialCount = 1,
): Promise<string> => {
  const url = createRecipesUrl(ingredients, page)
  const res = await fetch(url)

  if (!res.ok) {
    if (trialCount < 3) {
      const threeIngredients = ingredients.slice(0, 2 * (3 - trialCount))
      const res = await fetchCookpadHtml(threeIngredients, page, trialCount + 1)
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
  const recipes = recipeList.children().filter((_, elm) => 'id' in elm.attribs)
  const recipeData = recipes
    .map((_, recipe) => {
      const title = $(recipe).find('h2').text().replace(/\n/g, '').trim()
      const url = $(recipe).find('h2>a').attr('href') ?? ''
      const image = $(recipe).find('.flex-none > picture > img').attr('src')
      const ingredients = $(recipe)
        .find('[data-ingredients-highlighter-target="ingredients"]')
        .text()
        .split(',\n')
        .map((ingredient) => ingredient.trim())
      const newRecipe = { title, id: getRecipeIdFromUrl(url), image, ingredients }
      const validatedRecipe = recipeSchema.safeParse(newRecipe)
      if (!validatedRecipe.success) {
        console.error('Invalid recipe:', validatedRecipe.error.issues)
        return null
      }
      return validatedRecipe.data
    })
    .get()

  return { data: recipeData }
}

export const getRecipes = async (ingredients: string[], page: number, trialCount = 1) => {
  const html = await fetchCookpadHtml(ingredients, page, trialCount)
  const { data } = await scrapeCookpadHtml(html)

  return { data, page }
}
