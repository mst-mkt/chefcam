import { COOKPAD_BASE_SEARCH_URL } from '../constants/cookpad'

const createSearchRecipesUrl = (ingredients: string[], page: number): string => {
  const url = new URL(COOKPAD_BASE_SEARCH_URL)

  const ingredientsParam = ingredients
    .map((ingredient) => encodeURIComponent(ingredient))
    .join('%20')

  url.pathname += url.pathname.endsWith('/') ? '' : '/'
  url.pathname += ingredientsParam

  url.searchParams.append('page', page.toString())

  return url.toString()
}

export { createSearchRecipesUrl }
