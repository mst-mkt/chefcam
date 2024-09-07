import { IconCamera, IconX } from '@tabler/icons-react'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'
import type React from 'react'
import Webcam from 'react-webcam'
import { IconButton } from '../../../components/common/IconButton'

interface CameraViewProps {
  uploadFiles: (file: File) => Promise<void>
  close: () => void
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

export const CameraView: FC<CameraViewProps> = ({ uploadFiles, close }) => {
  const webcamRef = useRef<Webcam>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false))
  }, [])

  const handleTakePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) return

    const imageFile = await fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'screenshot.jpg', { type: 'image/jpeg' }))

    uploadFiles(imageFile)
    close()
  }, [uploadFiles, close])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-4">
        {hasPermission === null ? (
          <CameraAccessChecking />
        ) : hasPermission ? (
          <CameraComponent webcamRef={webcamRef} handleTakePhoto={handleTakePhoto} close={close} />
        ) : (
          <CameraAccessDenied close={close} />
        )}
      </div>
    </div>
  )
}
