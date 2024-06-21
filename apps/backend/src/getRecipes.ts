import { load } from 'cheerio'
import type { ingredients } from './schemas/ingredientsSchema'
import { type Recipes, recipesSchema } from './schemas/recipesSchema'
import { createSearchRecipesUrl } from './utils/createSearchUrl'

const fetchRecipes = async (url: string): Promise<Recipes> => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch the recipes: ${res.statusText}`)
    const data = await res.text()
    const $ = load(data)
    const recipes: Recipes = []
    $('.recipe-list .recipe-preview').each((index, element) => {
      try {
        //要素を指定して抽出
        const recipeImage = $(element).find('.recipe-image img').attr('src') || ''
        const recipeTitle = $(element).find('.recipe-title').text().trim()
        const ingredients = $(element)
          .find('.ingredients')
          .text()
          .trim()
          .split('、')
          .map((ingredient) => ingredient.trim())
          .filter((ingredient) => !ingredient.includes('\n...'))
        const newRecipe = { recipeImage, recipeTitle, ingredients }

        // 配列挿入前にバリデーション
        const validatedRecipe = recipesSchema.parse([newRecipe])[0]
        recipes.push(validatedRecipe)
      } catch (parseError) {
        console.error(`Error parsing recipe at index ${index}:`, parseError)
      }
    })
    return recipes
  } catch (error) {
    console.error('Error fetching the recipes:', error)
    return []
  }
}

const getRecipesByIngredients = async (ingredients: ingredients): Promise<Recipes> => {
  const searchUrl = createSearchRecipesUrl(ingredients)
  return await fetchRecipes(searchUrl)
}

export { getRecipesByIngredients }
