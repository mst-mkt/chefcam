import type { FC } from 'react'

type RecipeCardProps = {
  url: string
  title: string
  image: string
  ingredients: string[]
}

export const RecipeCard: FC<RecipeCardProps> = ({ url, title, image, ingredients }) => (
  <a href={url} key={url} className="group block rounded-md transition-colors hover:bg-[#ddd1]">
    <div className="flex h-fit gap-x-2 sm:gap-x-4">
      <img
        src={image}
        alt={title}
        className="block aspect-square h-20 rounded-md object-cover shadow-md sm:h-[8rem]"
      />
      <div className="flex shrink grow flex-col justify-center gap-y-2 overflow-hidden px-4">
        <h3 className="truncate font-bold transition-colors group-hover:text-[#0a2] sm:text-lg">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm transition-colors sm:text-base">
          {ingredients.join(', ')}
        </p>
      </div>
    </div>
  </a>
)
