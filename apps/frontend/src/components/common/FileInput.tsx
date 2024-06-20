import { IconPhotoPlus, IconX } from '@tabler/icons-react'
import { type ChangeEvent, type FC, useMemo } from 'react'
import type { FoodImage } from '../../types/FoodTypes'

type FileInputProps = {
  foodImages: FoodImage[]
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleRemove: (index: number) => void
}

export const FileInput: FC<FileInputProps> = ({ foodImages, handleChange, handleRemove }) => {
  const fileUrls = useMemo(
    () => foodImages.map((image) => URL.createObjectURL(image.file)),
    [foodImages],
  )

  return (
    <div className="flex flex-col gap-y-4">
      <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-2xl border-4 border-[#6c8] border-dotted p-16 transition-colors focus-within:bg-[#6c82] hover:bg-[#6c82]">
        <IconPhotoPlus size={64} color="#486" />
        <input
          type="file"
          className="h-0 border-0 opacity-0"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
        <p>
          ファイルをドロップするか、<span className="font-bold text-[#486]">ここをクリック</span>
        </p>
      </label>
      <div className="flex gap-x-2 overflow-x-scroll rounded-md">
        {fileUrls.map((url, i) => (
          <div
            className="group relative aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-green-50 shadow"
            key={foodImages[i].file.name}
          >
            <img src={url} alt="preview" className="block h-full w-full object-cover" />
            <button
              type="button"
              className="absolute top-0 right-0 cursor-pointer rounded-bl-md bg-[#f00] p-1 text-white opacity-0 transition-opacity hover:bg-[#d00] group-hover:opacity-100"
              onClick={() => handleRemove(i)}
            >
              <IconX size={16} color="#fff" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}