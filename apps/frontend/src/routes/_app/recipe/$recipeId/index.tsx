import { IconChevronLeft, IconLink } from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { twJoin } from 'tailwind-merge'
import { z } from 'zod'
import { apiClient } from '../../../../lib/apiClient'
import { preloadImages } from '../../../../utils/imagePreload'
import { SkeltonRecipe } from './.skelton-recipe'

const searchParamsSchema = z.object({
  search: z.array(z.string()).optional(),
})

const loader = async (recipeId: string) => {
  const res = await apiClient.recipes[':recipeId'].$get({ param: { recipeId } })
  const data = await res.json()
  if (!res.ok) throw new Error(res.statusText)

  const images = [
    data.recipe?.thumbnail,
    ...(data.recipe?.steps.flatMap((step) => step.images) ?? []),
  ].filter((image) => image !== undefined)
  await preloadImages(images)

  return data
}

export const Route = createFileRoute('/_app/recipe/$recipeId/')({
  validateSearch: (search) => searchParamsSchema.parse(search),
  loader: ({ params }) => loader(params.recipeId),
  component: () => <RecipeInfo />,
  pendingComponent: () => <PendingRecipe />,
  pendingMs: 0,
})

const RecipeInfo = () => {
  const { recipe } = Route.useLoaderData()
  const { search } = Route.useSearch()

  if (recipe === null) return <div>Recipe not found</div>

  return (
    <div className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-8">
        {search !== undefined && (
          <Link
            to="/recipe"
            search={{ foods: search }}
            className="flex w-fit items-center gap-x-2 font-bold text-accent transition-colors hover:text-accent-700 dark:hover:text-accent-200"
          >
            <IconChevronLeft size={28} />
            <span>検索結果に戻る</span>
          </Link>
        )}
        <div className="flex flex-col gap-4 md:flex-row">
          <img
            src={recipe.thumbnail}
            alt={recipe.title}
            className="block aspect-[16/9] w-full shrink-0 grow-0 rounded-md object-cover md:aspect-1 md:w-32"
          />
          <div className="flex shrink grow flex-col gap-y-2">
            <h1 className="truncate font-bold text-xl">{recipe.title}</h1>
            <p className="line-clamp-4">{recipe.description}</p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-y-2 rounded-md bg-background-50 p-4 text-sm">
        {recipe.ingredients.map((ingredient) =>
          'caption' in ingredient ? (
            <li key={ingredient.caption} className="py-2 font-bold">
              {ingredient.caption}
            </li>
          ) : (
            <li
              key={ingredient.ingredient}
              className="flex justify-between border-background-100 border-b pb-2"
            >
              <span>{ingredient.ingredient}</span>
              <span>{ingredient.quantity}</span>
            </li>
          ),
        )}
      </ul>
      <ol className="flex flex-col gap-y-8">
        {recipe.steps.map((step, i) => (
          <li key={step.step} className="flex gap-x-4">
            <div className="sticky top-[90px] flex aspect-1 h-[1lh] items-center justify-center rounded-full bg-accent font-bold text-white">
              {i + 1}
            </div>
            <div className="flex flex-col gap-y-2">
              <p>{step.step}</p>
              {/* biome-ignore lint/style/useExplicitLengthCheck: type of `step.images?.length` is `number | undefined` */}
              {step.images?.length !== 0 && (
                <div
                  className={twJoin(
                    'flex gap-x-2 overflow-x-scroll rounded-md',
                    'scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-transparent',
                  )}
                >
                  {step.images?.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={recipe.title}
                      className="block aspect-1 w-32 shrink-0 grow-0 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              {step.recipeLink !== undefined && (
                <Link
                  to="/recipe/$recipeId"
                  params={{ recipeId: step.recipeLink.id }}
                  className="flex items-center gap-x-2 text-accent"
                >
                  <IconLink size={20} />
                  {step.recipeLink.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
      {recipe.point !== undefined && (
        <div className="flex flex-col items-center gap-y-4">
          <h2 className="w-fit font-bold text-accent text-lg">作る際のポイント</h2>
          <p>{recipe.point}</p>
        </div>
      )}
    </div>
  )
}

const PendingRecipe = () => {
  const { search } = Route.useSearch()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="flex flex-col gap-y-16">
      <SkeltonRecipe search={search} />
    </div>
  )
}
