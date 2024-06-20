import { IconCircleCheck, IconCircleX, IconPlus } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useMemo, useState } from 'react'
import { Button } from '../../components/common/Button'
import { FileInput } from '../../components/common/FileInput'
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

  const toggleFoodSelect = (food: string) => {
    setSelectedFoods((prev) => {
      if (prev.includes(food)) {
        return prev.filter((f) => f !== food)
      }
      return [...prev, food]
    })
  }

  const foods = useMemo(
    () => dropDuplicates(foodImages.flatMap((image) => image.foods)),
    [foodImages],
  )

  return (
    <>
      <FileInput
        handleChange={handleFileChange}
        handleRemove={handleFileRemove}
        foodImages={foodImages}
      />
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {foods.map((food) => (
          <div
            key={food}
            className="flex cursor-pointer items-center gap-x-2 rounded-full border py-1 pr-4 pl-2"
            style={{
              borderColor: selectedFoods.includes(food) ? '#6c8' : 'gray',
              backgroundColor: selectedFoods.includes(food) ? '#6c82' : 'transparent',
            }}
            onClick={() => toggleFoodSelect(food)}
            onKeyDown={() => toggleFoodSelect(food)}
          >
            {selectedFoods.includes(food) ? (
              <IconCircleCheck size={20} color="#6c8" className="aspect-square" />
            ) : (
              <IconCircleX size={20} color="gray" className="aspect-square" />
            )}
            <span>{food}</span>
          </div>
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
      {foods.length !== 0 && <Button onClick={() => console.log(selectedFoods)}>レシピ検索</Button>}
    </>
  )
}
