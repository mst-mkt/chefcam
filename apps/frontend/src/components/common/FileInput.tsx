import { IconLoader2, IconPhotoPlus } from '@tabler/icons-react'
import { type ChangeEvent, type DragEvent, type FC, useCallback } from 'react'

type FileInputProps = {
  onChange: (files: File[]) => void | Promise<void>
  isLoading: boolean
}

export const FileInput: FC<FileInputProps> = ({ onChange, isLoading = false }) => {
  const handleDrop = useCallback(
    async (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      const files = e.dataTransfer?.files ? [...e.dataTransfer.files] : []
      if (files.length === 0) return
      await onChange(files)
    },
    [onChange],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
  }, [])

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? [...e.target.files] : []
      if (files.length === 0) return
      await onChange(files)
    },
    [onChange],
  )

  return (
    <label
      htmlFor="file-input"
      className="flex aspect-2 w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-2xl border-4 border-accent border-dotted px-16 py-8 transition-colors focus-within:bg-accent/20 hover:bg-accent/10 md:p-16"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {isLoading ? (
        <IconLoader2 className="h-12 w-12 animate-spin text-accent md:h-16 md:w-16" />
      ) : (
        <>
          <IconPhotoPlus className="h-12 w-12 text-accent md:h-16 md:w-16" />
          <input
            type="file"
            id="file-input"
            className="h-0 border-0 opacity-0"
            onChange={handleFileChange}
            accept="image/*"
            multiple={true}
          />
          <p className="whitespace-pre-wrap break-keep text-center">
            ファイルをドロップするか
            <wbr />
            <span className="font-bold text-accent">ここをクリック</span>
          </p>
        </>
      )}
    </label>
  )
}
