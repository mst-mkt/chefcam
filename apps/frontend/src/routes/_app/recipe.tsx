import { IconLoader2 } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
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
          <a
            href={recipe.url}
            key={recipe.url}
            className="group block rounded-md transition-colors hover:bg-[#ddd1]"
          >
            <div className="flex gap-x-4">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="block aspect-square h-[8rem] rounded-md object-cover shadow-md"
              />
              <div className="flex shrink grow flex-col gap-y-2 overflow-hidden p-4">
                <h3 className="truncate font-bold text-lg transition-colors group-hover:text-[#0a2]">
                  {recipe.title}
                </h3>
                <p className="line-clamp-2 transition-colors">{recipe.ingredients.join(', ')}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  )
}
