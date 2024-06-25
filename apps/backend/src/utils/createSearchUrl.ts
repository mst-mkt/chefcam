import { COOKPAD_BASE_SEARCH_URL } from '../constants/cookpad'
import type { CookpadSearchParam } from '../schemas/cookpadSearchParamSchema'

const createSearchRecipesUrl = (cookpadSearchParam: CookpadSearchParam): string => {
  const searchParams = cookpadSearchParam.ingredients
    .map((ingredient) => encodeURIComponent(ingredient))
    .join('%20')

  return `${COOKPAD_BASE_SEARCH_URL}${searchParams}`
}

export { createSearchRecipesUrl }
