import { IconCamera, IconCameraPlus, IconRotate, IconX } from '@tabler/icons-react'
import { type Dispatch, type FC, type SetStateAction, useCallback, useRef } from 'react'
import { Camera, type CameraType } from 'react-camera-pro'
import { twJoin } from 'tailwind-merge'
import { IconButton } from '../../../components/common/IconButton'
import { useModal } from '../../../hooks/useModal'
import { apiClient } from '../../../lib/apiClient'
import type { FoodImage } from '../../../types/FoodTypes'
import { imageDataToFile } from '../../../utils/imageDataToFile'

type CameraButtonProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setFoodImages: Dispatch<SetStateAction<FoodImage[]>>
  setSelectedFoods: Dispatch<SetStateAction<string[]>>
}

export const CameraButton: FC<CameraButtonProps> = ({
  setIsLoading,
  setFoodImages,
  setSelectedFoods,
}) => {
  const { Modal, open, close } = useModal()
  const cameraRef = useRef<CameraType>(null)

  const handlerClick = useCallback(async () => {
    await navigator.mediaDevices.getUserMedia({ video: true })
    open()
  }, [open])

  const uploadFiles = useCallback(
    async (file: File) => {
      setIsLoading(true)
      const res = await apiClient.upload.$post({ form: { file } })
      if (!res.ok) return setIsLoading(false)

      const { foods: newFoods } = await res.json()

      setFoodImages((prev) => [...prev, { file, foods: newFoods }])
      setSelectedFoods((prev) => [...prev, ...newFoods.filter((food) => !prev.includes(food))])

      setIsLoading(false)
      close()
    },
    [close, setIsLoading, setFoodImages, setSelectedFoods],
  )

  const handleTakePhoto = useCallback(async () => {
    const imageData = cameraRef.current?.takePhoto('imgData')
    if (typeof imageData === 'string' || imageData === undefined) return

    const imageFile = imageDataToFile(imageData)
    uploadFiles(imageFile)
  }, [uploadFiles])

  return (
    <>
      <button
        type="button"
        onClick={handlerClick}
        className={twJoin(
          'flex aspect-1 w-20 items-center justify-center rounded-lg border-2 border-background-200 bg-primary text-accent transition-colors',
          'hover:border-background-400 hover:bg-background-50',
          'focus-visible:border-accent focus-visible:bg-background-50 focus-visible:outline-none',
        )}
      >
        <IconCameraPlus size={24} />
      </button>
      <Modal title="カメラ">
        <div className="relative overflow-hidden rounded-md">
          <Camera ref={cameraRef} errorMessages={{}} aspectRatio={4 / 3} />
        </div>
        <div className="flex items-center justify-center gap-x-8">
          <IconButton icon={IconCamera} onClick={handleTakePhoto} size={24} className="order-2" />
          <IconButton
            icon={IconRotate}
            onClick={() => cameraRef.current?.switchCamera()}
            size={24}
            className="order-1"
          />
          <IconButton icon={IconX} onClick={() => close()} size={24} className="order-3" />
        </div>
      </Modal>
    </>
  )
}
