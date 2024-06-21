import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { LinkButton } from '../../components/common/LinkButton'
import { FoodSelect } from '../../components/upload/FoodSelect'
import { ImagePicker } from '../../components/upload/ImagePicker'
import type { FoodImage } from '../../types/FoodTypes'
import { dropDuplicates } from '../../utils/dropDuplicates'

export const Route = createFileRoute('/_app/upload')({
  component: () => <Upload />,
})

const Upload = () => {
  const [foodImages, setFoodImages] = useState<FoodImage[]>([])
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

  const foods = useMemo(
    () => dropDuplicates(foodImages.flatMap((image) => image.foods)),
    [foodImages],
  )

  return (
    <>
      <ImagePicker
        foodImages={foodImages}
        setFoodImages={setFoodImages}
        setSelectedFoods={setSelectedFoods}
      />
      <FoodSelect foods={foods} selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />
      {foods.length !== 0 && (
        <LinkButton to="/recipe" search={{ foods: selectedFoods }}>
          レシピを検索
        </LinkButton>
      )}
    </>
  )
}
