import { createFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useMemo, useState } from 'react'
import { LinkButton } from '../../components/common/LinkButton'
import { FoodSelect } from '../../components/upload/FoodSelect'
import { ImagePicker } from '../../components/upload/ImagePicker'
import { apiClient } from '../../lib/apiClient'
import type { FoodImage } from '../../types/FoodTypes'
import { dropDuplicates } from '../../utils/dropDuplicates'

export const Route = createFileRoute('/_app/upload')({
  component: () => <Upload />,
})

const Upload = () => {
  const [foodImages, setFoodImages] = useState<FoodImage[]>([])
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const postImage = (file: File) => apiClient.upload.$post({ form: { file } })

    const files = [...(e.target.files ?? [])]
    const currentFiles = foodImages.map((image) => image.file)
    const newFiles = files.filter((file) => !currentFiles.includes(file))

    const responses = await Promise.all(newFiles.map(postImage))
    const foodData = await Promise.all(responses.map((res) => res.json()))

    const newFoodImages = foodData.map((data, i) => ({
      file: newFiles[i],
      foods: 'foods' in data ? data.foods : [],
    }))
    setFoodImages((prev) => [...prev, ...newFoodImages])

    const newFood = dropDuplicates(
      newFoodImages.flatMap((image) => image.foods).filter((food) => !selectedFoods.includes(food)),
    )
    setSelectedFoods((prev) => [...prev, ...newFood])
  }

  const handleFileRemove = (index: number) => {
    setFoodImages((prev) => prev.filter((_, i) => i !== index))
  }

  const foods = useMemo(
    () => dropDuplicates(foodImages.flatMap((image) => image.foods)),
    [foodImages],
  )

  return (
    <>
      <ImagePicker
        handleChange={handleFileChange}
        handleRemove={handleFileRemove}
        foodImages={foodImages}
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
