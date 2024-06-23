import { COOKPAD_BASE_SEARCH_URL } from '../constants/cookpad'
import type { ingredients } from '../schemas/ingredientsSchema'

const createSearchRecipesUrl = (ingredients: ingredients): string => {
  const searchParams = ingredients.ingredients
    .map((ingredient) => encodeURIComponent(ingredient))
    .join('%20')

  return `${COOKPAD_BASE_SEARCH_URL}${searchParams}`
}

export { createSearchRecipesUrl }
