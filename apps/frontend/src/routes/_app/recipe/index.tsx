import { IconLoader2 } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { LinkButton } from '../../../components/common/LinkButton'
import { apiClient } from '../../../lib/apiClient'
import { RecipeCard } from './.recipe-card'
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
    if (!res.ok) throw new Error()

    return data
  },
  component: () => <Recipe />,
  pendingComponent: () => <PendingRecipe />,
  errorComponent: () => <ErrorComponent />,
})

const Recipe = () => {
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

  return (
    <>
      <hgroup>
        <h2 className="font-bold text-3xl">レシピ一覧</h2>
        <p className="font-bold text-accent text-lg">Recipe</p>
      </hgroup>
      <div className="flex flex-col gap-y-8">
        {recipes.map((recipe) => (
          <RecipeCard {...recipe} key={recipe.id} />
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

const PendingRecipe = () => (
  <>
    <hgroup>
      <h2 className="font-bold text-3xl">レシピ一覧</h2>
      <p className="font-bold text-accent text-lg">Recipe</p>
    </hgroup>
    <div className="flex flex-col gap-y-8">
      {[...Array(5)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
        <SkeltonCard key={i} />
      ))}
    </div>
  </>
)

const ErrorComponent = () => (
  <>
    <p>レシピが見つかりませんでした。</p>
    <LinkButton to="/upload">戻る</LinkButton>
  </>
)
