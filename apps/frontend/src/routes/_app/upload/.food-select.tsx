import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react'
import { twJoin } from 'tailwind-merge'

type FoodSelectProps = {
  foods: string[]
  selectedFoods: string[]
  setSelectedFoods: Dispatch<SetStateAction<string[]>>
}

const Food = ({
  food,
  selected,
  onClick,
}: { food: string; selected: boolean; onClick: () => void }) => {
  const Icon = useMemo(() => (selected ? IconCircleCheck : IconCircleX), [selected])

  return (
    <div
      className={twJoin(
        'flex cursor-pointer items-center gap-x-2 rounded-full border py-1 pr-4 pl-2 transition-colors',
        selected && 'border-accent bg-accent/10',
        !selected && 'border-foreground-500',
      )}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <Icon size={20} className={selected ? 'text-accent' : 'text-foreground-500'} />
      <span>{food}</span>
    </div>
  )
}

export const FoodSelect: FC<FoodSelectProps> = ({ foods, selectedFoods, setSelectedFoods }) => {
  const toggleFoodSelect = (food: string) => {
    setSelectedFoods((prev) => {
      if (prev.includes(food)) {
        return prev.filter((f) => f !== food)
      }
      return [...prev, food]
    })
  }

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-2">
      {foods.map((food) => (
        <Food
          key={food}
          food={food}
          selected={selectedFoods.includes(food)}
          onClick={() => toggleFoodSelect(food)}
        />
      ))}
    </div>
  )
}
