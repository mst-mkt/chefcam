import { IconPhotoPlus, IconX } from '@tabler/icons-react'
import { type ChangeEvent, type FC, useMemo } from 'react'

type FileInputProps = {
  file: File | null
  onChange: (files: File | null) => void
  allowedTypes?: string[]
}

export const FileInput: FC<FileInputProps> = ({ file, onChange, allowedTypes }) => {
  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return
    }

    const selectedFile = event.target.files[0]

    if (allowedTypes && !allowedTypes.includes(selectedFile.type)) {
      alert('許可されていないファイル形式です')
      return
    }

    onChange(selectedFile)
  }

  const handleRemove = () => {
    if (file === null || fileUrl === null) {
      return
    }

    onChange(null)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-2xl border-4 border-[#6c8] border-dotted p-16 transition-colors focus-within:bg-[#6c82] hover:bg-[#6c82]">
        <IconPhotoPlus size={64} color="#486" />
        <input type="file" className="h-0 border-0 opacity-0" onChange={handleChange} />
        <p>
          ファイルをドロップするか、<span className="font-bold text-[#486]">ここをクリック</span>
        </p>
      </label>
      {fileUrl !== null && (
        <div className="group relative aspect-square w-20 overflow-hidden rounded-md bg-green-50 shadow">
          <img src={fileUrl} alt="preview" className="block h-full w-full object-cover" />
          <button
            type="button"
            className="absolute top-0 right-0 cursor-pointer rounded-bl-md bg-[#f00] p-1 text-white opacity-0 transition-opacity hover:bg-[#d00] group-hover:opacity-100"
            onClick={handleRemove}
          >
            <IconX size={16} color="#fff" />
          </button>
        </div>
      )}
    </div>
  )
}
