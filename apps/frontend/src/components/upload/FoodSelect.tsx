import { IconCircleCheck, IconCircleX, IconPlus } from '@tabler/icons-react'
import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react'

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
  const color = useMemo(() => (selected ? '#6c8' : 'gray'), [selected])
  const backgroundColor = useMemo(() => (selected ? '#6c82' : 'transparent'), [selected])

  return (
    <div
      className="flex cursor-pointer items-center gap-x-2 rounded-full border py-1 pr-4 pl-2"
      style={{
        borderColor: color,
        backgroundColor,
      }}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <Icon size={20} color={color} />
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
      {foods.length !== 0 && (
        <button
          className="box-content flex h-[1lh] w-[1lh] items-center justify-center rounded-full border border-[#6c8] bg-[#6c8] px-1 py-1"
          type="button"
        >
          <IconPlus size={20} color="#fff" className="aspect-square" />
        </button>
      )}
    </div>
  )
}
