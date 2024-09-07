import { IconAlertCircle } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { LinkButton } from '../../../components/common/LinkButton'
import type { FoodImage } from '../../../types/FoodTypes'
import { dropDuplicates } from '../../../utils/dropDuplicates'
import { FoodSelect } from './.food-select'
import { ImagePicker } from './.image-picker'

export const Route = createFileRoute('/_app/upload/')({
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
      <hgroup>
        <h2 className="font-bold text-3xl">画像アップロード</h2>
        <p className="font-bold text-accent text-lg">Upload</p>
      </hgroup>
      <p>冷蔵庫や食材の写真をアップロードしてください。</p>
      <ImagePicker
        foodImages={foodImages}
        setFoodImages={setFoodImages}
        setSelectedFoods={setSelectedFoods}
      />
      <FoodSelect foods={foods} selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />
      {selectedFoods.length >= 5 && foods.length > 0 && (
        <div className="flex gap-x-2">
          <IconAlertCircle size={25} className="text-red-400" />
          <p>5個以上の食材を選択するとレシピに含まれない食材がある場合があります</p>
        </div>
      )}
      {foods.length !== 0 && (
        <LinkButton to="/recipe" search={{ foods: selectedFoods }}>
          レシピを検索
        </LinkButton>
      )}
    </>
  )
}
