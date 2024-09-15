import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type RecipeCardProps = {
  id: string
  title: string
  image: string
  ingredients: string[]
  search?: string[]
}

export const RecipeCard: FC<RecipeCardProps> = ({ id, title, image, ingredients, search }) => (
  <Link
    to="/recipe/$recipeId"
    params={{ recipeId: id }}
    search={{ search }}
    key={id}
    className="block rounded-md transition-colors hover:bg-background-100"
  >
    <div className="flex h-fit items-center gap-x-2 sm:gap-x-4">
      <div className="h-32 w-28 shrink-0 overflow-hidden rounded-md shadow-md md:h-36 md:w-36">
        <img src={image} alt={title} className="block h-full w-full object-cover" />
      </div>
      <div className="flex shrink grow flex-col justify-center gap-y-2 overflow-hidden p-4 sm:gap-y-4">
        <h3 className="truncate font-bold transition-colors sm:text-lg">{title}</h3>
        <div className="line-clamp-2">
          {ingredients
            .toSorted((a) => (search?.some((s) => a.includes(s)) ? -1 : 1))
            .map((ingredient) => (
              <p
                key={ingredient}
                className={twMerge(
                  'mr-2 mb-1 inline-block rounded-full bg-background-100/10 px-2 py-1 text-xs last:mr-0',
                  search?.some((s) => ingredient.includes(s)) && 'bg-accent-50/50 font-bold',
                )}
              >
                {ingredient}
              </p>
            ))}
        </div>
      </div>
    </div>
  </Link>
)
