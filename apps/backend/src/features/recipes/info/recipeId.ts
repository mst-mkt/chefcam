import { COOKPAD_BASE_URL } from '../../../constants/cookpad'

export const getRecipeIdFromUrl = (url: string) => {
  const pathname = new URL(`${COOKPAD_BASE_URL}${url}`).pathname
  const recipeId = pathname.replace('/jp/recipes/', '').split('-')[0]

  return recipeId
}
