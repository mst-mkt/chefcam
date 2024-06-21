import type { FC } from 'react'

type RecipeCardProps = {
  url: string
  title: string
  image: string
  ingredients: string[]
}

export const RecipeCard: FC<RecipeCardProps> = ({ url, title, image, ingredients }) => (
  <a href={url} key={url} className="group block rounded-md transition-colors hover:bg-[#ddd1]">
    <div className="flex gap-x-4">
      <img
        src={image}
        alt={title}
        className="block aspect-square h-[8rem] rounded-md object-cover shadow-md"
      />
      <div className="flex shrink grow flex-col gap-y-2 overflow-hidden p-4">
        <h3 className="truncate font-bold text-lg transition-colors group-hover:text-[#0a2]">
          {title}
        </h3>
        <p className="line-clamp-2 transition-colors">{ingredients.join(', ')}</p>
      </div>
    </div>
  </a>
)
