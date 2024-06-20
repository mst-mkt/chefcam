import { IconCircleCheck, IconCircleX, IconPlus } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../../components/common/Button'
import { FileInput } from '../../components/common/FileInput'
import type { FoodImage } from '../../types/FoodTypes'

export const Route = createFileRoute('/_app/upload')({
  component: () => <Upload />,
})

const Upload = () => {
  const [files, setFiles] = useState<FoodImage[]>([])
  const [foods, setFoods] = useState<string[]>([])
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

  // const uploadFile = async () => {
  //   const postImage = (file: File) => apiClient.upload.$post({ form: { file } })
  //   const responses = await Promise.all(files.map(postImage))

  //   for (const res of responses) {
  //     if (!res.ok) {
  //       const data = await res.json()
  //       console.error(data.error)
  //       return
  //     }
  //     const data = await res.json()
  //     const newFoods = data.foods.filter((food) => !foods.includes(food))
  //     setFoods((prev) => dropDuplicates([...prev, ...data.foods]))
  //     setSelectedFoods((prev) => dropDuplicates([...prev, ...newFoods]))
  //   }
  // }

  const toggleFoodSelect = (food: string) => {
    setSelectedFoods((prev) => {
      if (prev.includes(food)) {
        return prev.filter((f) => f !== food)
      }
      return [...prev, food]
    })
  }

  return (
    <>
      <FileInput setFiles={setFiles} files={files} />
      <Button onClick={uploadFile} disabled={files.length === 0}>
        材料を検出
      </Button>
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
      <Button onClick={() => console.log(selectedFoods)}>レシピ検索</Button>
    </>
  )
}
