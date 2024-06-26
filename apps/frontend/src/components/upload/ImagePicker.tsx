import { IconLoader2, IconPhotoPlus, IconX } from '@tabler/icons-react'
import {
  type ChangeEvent,
  type Dispatch,
  type DragEvent,
  type FC,
  type SetStateAction,
  useMemo,
  useState,
} from 'react'
import { apiClient } from '../../lib/apiClient'
import type { FoodImage } from '../../types/FoodTypes'

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

    const responses = await Promise.all(newFiles.map(postImage))
    const foodData = await Promise.all(responses.map((res) => res.json()))

    const newFoodImages = foodData.map((data, i) => ({
      file: newFiles[i],
      foods: 'foods' in data ? data.foods : [],
    }))
    setFoodImages((prev) => [...prev, ...newFoodImages])
    setSelectedFoods((prev) => [
      ...prev,
      ...newFoodImages.flatMap((image) => image.foods).filter((food) => !prev.includes(food)),
    ])

    setIsLoading(false)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? [...e.target.files] : []
    if (files.length === 0) return
    await uploadFiles(files)
  }

  const handleDrop = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const files = e.dataTransfer?.files ? [...e.dataTransfer.files] : []
    if (files.length === 0) return
    await uploadFiles(files)
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }

  const handleFileRemove = (index: number) => {
    setFoodImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-y-4">
      <label
        className="flex aspect-[2] w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-2xl border-4 border-[#6c8] border-dotted p-16 transition-colors focus-within:bg-[#6c82] hover:bg-[#6c82]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {isLoading ? (
          <IconLoader2 size={64} color="#486" className="animate-spin" />
        ) : (
          <>
            <IconPhotoPlus size={64} color="#486" />
            <input
              type="file"
              className="h-0 border-0 opacity-0"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <p className="whitespace-pre-wrap break-keep text-center">
              ファイルをドロップするか
              <wbr />
              <span className="font-bold text-[#486]">ここをクリック</span>
            </p>
          </>
        )}
      </label>
      {foodImages.length !== 0 && (
        <div className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-transparent flex gap-x-2 overflow-x-scroll rounded-md">
          {fileUrls.map((url, i) => (
            <div
              className="group relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-green-50 shadow"
              key={foodImages[i].file.name}
            >
              <img src={url} alt="preview" className="block h-full w-full object-cover" />
              <button
                type="button"
                className="absolute top-0 right-0 cursor-pointer rounded-bl-md bg-[#f00] p-1 text-white opacity-0 transition-opacity hover:bg-[#d00] group-hover:opacity-100"
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
