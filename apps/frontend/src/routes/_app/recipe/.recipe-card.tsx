import { Link } from '@tanstack/react-router'
import type { FC } from 'react'

type RecipeCardProps = {
  id: string
  title: string
  image: string
  ingredients: string[]
}

export const RecipeCard: FC<RecipeCardProps> = ({ id, title, image, ingredients }) => (
  <Link
    to="/recipe/$recipeId"
    params={{ recipeId: id }}
    search={{ searchResult: location.href }}
    key={id}
    className="group block rounded-md transition-colors hover:bg-background-100"
  >
    <div className="flex h-fit gap-x-2 sm:gap-x-4">
      <img
        src={image}
        alt={title}
        className="block aspect-1 h-20 rounded-md object-cover shadow-md sm:h-[8rem]"
      />
      <div className="flex shrink grow flex-col justify-center gap-y-2 overflow-hidden px-4">
        <h3 className="truncate font-bold transition-colors group-hover:text-accent sm:text-lg">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm transition-colors sm:text-base">
          {ingredients.join(', ')}
        </p>
      </div>
    </div>
  </Link>
)
