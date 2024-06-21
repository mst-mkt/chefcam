import type { FoodList } from '../schemas/foodListSchema'

const createSearchRecipesUrl = (foodList: FoodList): string => {
  const baseSearchUrl = 'https://cookpad.com/search/'
  const searchParams = foodList.ingredients.map((food) => encodeURIComponent(food)).join('%20')
  return `${baseSearchUrl}${searchParams}`
}

export { createSearchRecipesUrl }
