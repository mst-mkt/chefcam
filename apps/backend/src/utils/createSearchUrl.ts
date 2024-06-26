import { COOKPAD_BASE_SEARCH_URL } from '../constants/cookpad'
import type { CookpadSearchParam } from '../schemas/cookpadSearchParamSchema'

const createSearchRecipesUrl = ({ ingredients, page, recipe_hits }: CookpadSearchParam): string => {
  const url = new URL(COOKPAD_BASE_SEARCH_URL)

  const ingredientsParam = ingredients
    .map((ingredient) => encodeURIComponent(ingredient))
    .join('%20')

  url.pathname += url.pathname.endsWith('/') ? '' : '/'
  url.pathname += ingredientsParam

  url.searchParams.append('page', page.toString())
  if (recipe_hits !== undefined) {
    url.searchParams.append('recipe_hits', recipe_hits.toString())
  }

  return url.toString()
}

export { createSearchRecipesUrl }
