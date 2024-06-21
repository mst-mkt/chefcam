import { IconLoader2 } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { RecipeCard } from '../../components/recipe/RecipeCard'
import { apiClient } from '../../lib/apiClient'

const recipeSearchSchema = z.object({
  foods: z.array(z.string()).catch([]),
})

export const Route = createFileRoute('/_app/recipe')({
  validateSearch: (search) => recipeSearchSchema.parse(search),
  loaderDeps: ({ search: { foods } }) => ({ foods }),
  loader: async ({ deps: { foods } }) => {
    const res = await apiClient.recipes.$get({ query: { ingredients: foods } })
    const data = await res.json()
    return data
  },
  component: () => <Recipe />,
  pendingComponent: () => <Pending />,
})

const Pending = () => (
  <div className="flex flex-col items-center gap-y-4 py-8">
    <IconLoader2 size={64} color="#486" className="animate-spin" />
    <p>レシピを検索中</p>
  </div>
)

const Recipe = () => {
  const recipes = Route.useLoaderData()

  return (
    <>
      <hgroup>
        <h2 className="font-bold text-3xl">レシピ一覧</h2>
        <p className="font-bold text-[#4c6] text-lg">Recipe</p>
      </hgroup>
      <div className="flex flex-col gap-y-8">
        {recipes.map((recipe) => (
          <RecipeCard {...recipe} key={recipe.url} />
        ))}
      </div>
    </>
  )
}
