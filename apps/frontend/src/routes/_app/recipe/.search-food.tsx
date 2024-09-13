import { IconX } from '@tabler/icons-react'
import type { FC } from 'react'

type SearchFoodsProps = {
  foods: string[]
  handleRemoveFoodParam: (food: string) => void
}

export const SearchFoods: FC<SearchFoodsProps> = ({ foods, handleRemoveFoodParam }) => (
  <div className="flex flex-col gap-y-2 rounded-xl border-2 border-background-100 bg-background-50 p-4">
    <div className="flex items-center gap-x-2">
      <h3>検索する食材</h3>
      <p>
        <span className="font-bold text-accent-700">{foods.length}</span>品目
      </p>
    </div>
    <div className="flex flex-wrap gap-2">
      {foods.map((food) => (
        <button
          type="button"
          key={food}
          className="group flex w-fit items-center gap-x-1 rounded-full border border-accent-600/10 bg-accent-50/30 px-3 py-1"
          onClick={() => handleRemoveFoodParam(food)}
        >
          <span>{food}</span>
          {foods.length > 1 && (
            <IconX
              size={20}
              className="text-red-400/50 transition-colors group-hover:text-red-400"
            />
          )}
        </button>
      ))}
    </div>
  </div>
)
