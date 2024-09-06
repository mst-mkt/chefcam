import { IconCamera, IconCameraPlus, IconX } from '@tabler/icons-react'
import type React from 'react'
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Webcam from 'react-webcam'
import { twJoin } from 'tailwind-merge'
import { IconButton } from '../../../components/common/IconButton'
import { apiClient } from '../../../lib/apiClient'
import type { FoodImage } from '../../../types/FoodTypes'
import { Modal } from './.camera-modal'

type CameraButtonProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setFoodImages: Dispatch<SetStateAction<FoodImage[]>>
  setSelectedFoods: Dispatch<SetStateAction<string[]>>
}

const CameraAccessChecking: FC = () => <p className="text-accent">カメラへのアクセスを確認中...</p>

const CameraAccessDenied: FC<{ close: () => void }> = ({ close }) => (
  <div>
    <p className="text-accent">カメラへのアクセスが許可されていません。</p>
    <button type="button" onClick={close} className="mt-4 rounded bg-accent px-4 py-2 text-white">
      閉じる
    </button>
  </div>
)

const CameraComponent: FC<{
  webcamRef: React.RefObject<Webcam>
  handleTakePhoto: () => void
  close: () => void
}> = ({ webcamRef, handleTakePhoto, close }) => (
  <>
    <div className="relative overflow-hidden rounded-md">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'environment',
          aspectRatio: 4 / 3,
        }}
      />
    </div>
    <div className="mt-4 flex items-center justify-center gap-x-8">
      <IconButton icon={IconCamera} onClick={handleTakePhoto} size={24} />
      <IconButton icon={IconX} onClick={close} size={24} />
    </div>
  </>
)

export const CameraButton: FC<CameraButtonProps> = ({
  setIsLoading,
  setFoodImages,
  setSelectedFoods,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const webcamRef = useRef<Webcam>(null)

  useEffect(() => {
    if (isCameraOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setHasPermission(true))
        .catch(() => setHasPermission(false))
    }
  }, [isCameraOpen])

  const uploadFiles = useCallback(
    async (file: File) => {
      setIsLoading(true)

      try {
        const res = await apiClient.upload.$post({ form: { file } })
        if (!res.ok) throw new Error('Upload failed')

        const { foods: newFoods } = await res.json()

        setFoodImages((prev) => [...prev, { file, foods: newFoods }])
        setSelectedFoods((prev) => [...prev, ...newFoods.filter((food) => !prev.includes(food))])
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setFoodImages, setSelectedFoods],
  )

  const handleTakePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) return

    const imageFile = await fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'screenshot.jpg', { type: 'image/jpeg' }))

    uploadFiles(imageFile)
    setIsCameraOpen(false)
  }, [uploadFiles])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsCameraOpen(true)}
        className={twJoin(
          'flex aspect-1 w-20 items-center justify-center rounded-lg border-2 border-background-200 bg-primary text-accent transition-colors',
          'hover:border-background-400 hover:bg-background-50',
          'focus-visible:border-accent focus-visible:bg-background-50 focus-visible:outline-none',
        )}
      >
        <IconCameraPlus size={24} />
      </button>
      <Modal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} title="カメラ">
        {hasPermission === null ? (
          <CameraAccessChecking />
        ) : hasPermission ? (
          <CameraComponent
            webcamRef={webcamRef}
            handleTakePhoto={handleTakePhoto}
            close={() => setIsCameraOpen(false)}
          />
        ) : (
          <CameraAccessDenied close={() => setIsCameraOpen(false)} />
        )}
      </Modal>
    </>
  )
}
