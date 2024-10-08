import { IconLoader2 } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { z } from 'zod'
import { LinkButton } from '../../../components/common/LinkButton'
import { apiClient } from '../../../lib/apiClient'
import { preloadImages } from '../../../utils/imagePreload'
import { RecipeCard } from './.recipe-card'
import { SearchFoods } from './.search-food'
import { SkeltonCard } from './.skelton-card'

const recipeSearchSchema = z.object({
  foods: z.array(z.string()).catch([]),
})

export const Route = createFileRoute('/_app/recipe/')({
  validateSearch: (search) => recipeSearchSchema.parse(search),
  loaderDeps: ({ search: { foods } }) => ({ foods }),
  loader: async ({ deps: { foods } }) => {
    const res = await apiClient.recipes.$get({ query: { ingredients: foods } })
    const data = await res.json()
    if (!res.ok) throw new Error(`Error: failed to fetch recipe-search data (${res.url})`)

    const images = data.data.map((recipe) => recipe.image)
    await preloadImages(images)

    return data
  },
  component: () => <Recipe />,
  pendingComponent: () => <PendingRecipe />,
  errorComponent: () => <ErrorComponent />,
  pendingMs: 0,
})

const Recipe = () => {
  const navigate = Route.useNavigate()
  const { foods } = Route.useSearch()
  const { data, page } = Route.useLoaderData()
  const [recipes, setRecipes] = useState(data)
  const [currentPage, setCurrentPage] = useState(page)
  const [isLoading, setIsLoading] = useState(false)

  const loadMoreRecipes = async () => {
    if (isLoading) return
    setIsLoading(true)
    const nextPage = currentPage + 1
    const res = await apiClient.recipes.$get({
      query: { ingredients: foods, page: nextPage.toString() },
    })

    if (!res.ok) {
      setIsLoading(false)
      return
    }
    const nextData = await res.json()
    setRecipes([...recipes, ...nextData.data])
    setCurrentPage(nextData.page)
    setIsLoading(false)
  }

  const handleRemoveFoodParam = useCallback(
    (food: string) => {
      if (foods.length <= 1) return
      const newFoods = foods.filter((f) => f !== food)
      navigate({ to: '/recipe', search: { foods: newFoods } })
    },
    [foods, navigate],
  )

  return (
    <>
      <hgroup>
        <h2 className="font-bold text-3xl">レシピ一覧</h2>
        <p className="font-bold text-accent text-lg">Recipe</p>
      </hgroup>
      <SearchFoods foods={foods} handleRemoveFoodParam={handleRemoveFoodParam} />
      <div className="flex flex-col gap-y-8">
        {recipes.map((recipe) => (
          <RecipeCard {...recipe} key={recipe.id} search={foods} />
        ))}
      </div>
      {recipes.length > 0 && (
        <button
          type="button"
          className="flex items-center justify-center rounded-md bg-accent px-4 py-2 font-bold text-white transition-opacity disabled:opacity-50"
          onClick={loadMoreRecipes}
          disabled={isLoading}
        >
          {isLoading ? (
            <IconLoader2 size={20} color="white" className="animate-spin" />
          ) : (
            'もっと見る'
          )}
        </button>
      )}
    </>
  )
}

const PendingRecipe = () => {
  const { foods } = Route.useSearch()
  const navigate = Route.useNavigate()

  const handleRemoveFoodParam = useCallback(
    (food: string) => {
      if (foods.length <= 1) return
      const newFoods = foods.filter((f) => f !== food)
      navigate({ to: '/recipe', search: { foods: newFoods } })
    },
    [foods, navigate],
  )

  return (
    <>
      <hgroup>
        <h2 className="font-bold text-3xl">レシピ一覧</h2>
        <p className="font-bold text-accent text-lg">Recipe</p>
      </hgroup>
      <SearchFoods foods={foods} handleRemoveFoodParam={handleRemoveFoodParam} />
      <div className="flex flex-col gap-y-8">
        {[...new Array(5)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
          <SkeltonCard key={i} />
        ))}
      </div>
    </>
  )
}

const ErrorComponent = () => (
  <>
    <p>レシピが見つかりませんでした。</p>
    <LinkButton to="/upload">戻る</LinkButton>
  </>
)
