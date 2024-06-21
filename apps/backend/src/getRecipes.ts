import axios from 'axios'
import cheerio from 'cheerio'
import type { FoodList } from './schemas/foodListSchema'
import { type Recipes, recipesSchema } from './schemas/recipesSchema'
import { createSearchRecipesUrl } from './utils/createSearchUrl'

const fetchRecipes = async (url: string): Promise<Recipes> => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const recipes: Recipes = []
    $('.recipe-list .recipe-preview').each((index, element) => {
      try {
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

        // バリデーション
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

export { fetchRecipes }

const getRecipesByIngredients = async (ingredients: FoodList): Promise<Recipes> => {
  const searchUrl = createSearchRecipesUrl(ingredients)
  return await fetchRecipes(searchUrl)
}

export { getRecipesByIngredients }
