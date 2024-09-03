import { IconX } from '@tabler/icons-react'
import { type Dispatch, type FC, type SetStateAction, useMemo, useState } from 'react'
import { apiClient } from '../../lib/apiClient'
import type { FoodImage } from '../../types/FoodTypes'
import { FileInput } from '../common/FileInput'

type ImagePickerProps = {
  foodImages: FoodImage[]
  setFoodImages: Dispatch<SetStateAction<FoodImage[]>>
  setSelectedFoods: Dispatch<SetStateAction<string[]>>
}

export const ImagePicker: FC<ImagePickerProps> = ({
  foodImages,
  setFoodImages,
  setSelectedFoods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const fileUrls = useMemo(
    () => foodImages.map((image) => URL.createObjectURL(image.file)),
    [foodImages],
  )

  const uploadFiles = async (files: File[]) => {
    setIsLoading(true)
    const postImage = (file: File) => apiClient.upload.$post({ form: { file } })

    const currentFiles = foodImages.map((image) => image.file)
    const newFiles = files.filter((file) => !currentFiles.includes(file))

    const newFoodImages = await Promise.all(
      newFiles.map(async (file) => {
        const res = await postImage(file)
        const data = await res.json()
        return {
          file,
          foods: 'foods' in data ? data.foods : [],
        }
      }),
    )

    setFoodImages((prev) => [...prev, ...newFoodImages])
    setSelectedFoods((prev) => [
      ...prev,
      ...newFoodImages.flatMap((image) => image.foods).filter((food) => !prev.includes(food)),
    ])

    setIsLoading(false)
  }

  const handleFileRemove = (index: number) => {
    setFoodImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <FileInput onChange={uploadFiles} isLoading={isLoading} />
      {foodImages.length !== 0 && (
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-transparent flex gap-x-2 overflow-x-scroll rounded-md">
          {fileUrls.map((url, i) => (
            <div
              className="group relative aspect-1 w-20 shrink-0 overflow-hidden rounded-md bg-accent shadow"
              key={foodImages[i]?.file.name}
            >
              <img src={url} alt="preview" className="block h-full w-full object-cover" />
              <button
                type="button"
                className="absolute top-0 right-0 cursor-pointer rounded-bl-md bg-red-400 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                onClick={() => handleFileRemove(i)}
              >
                <IconX size={16} color="#fff" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
