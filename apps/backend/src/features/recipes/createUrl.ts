import { COOKPAD_BASE_SEARCH_URL } from '../../constants/cookpad'

const createRecipesUrl = (ingredients: string[], page: number): string => {
  const ingredientsParam = encodeURIComponent(ingredients.join('%20'))

  const url = new URL(COOKPAD_BASE_SEARCH_URL + ingredientsParam)
  url.searchParams.set('page', page.toString())

  return url.toString()
}

export { createRecipesUrl }
