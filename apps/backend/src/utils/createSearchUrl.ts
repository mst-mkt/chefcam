import type { ingredients } from '../schemas/ingredientsSchema'

const createSearchRecipesUrl = (ingredients: ingredients): string => {
  const baseSearchUrl = 'https://cookpad.com/search/'
  const searchParams = ingredients.ingredients
    .map((ingredients) => encodeURIComponent(ingredients))
    .join('%20')
  return `${baseSearchUrl}${searchParams}`
}

export { createSearchRecipesUrl }
