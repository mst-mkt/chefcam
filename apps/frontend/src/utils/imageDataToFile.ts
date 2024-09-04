export const imageDataToFile = (imageData: ImageData, fileName?: string): File => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (context === null) {
    throw new Error('Could not get 2d context from canvas')
  }

  canvas.width = imageData.width
  canvas.height = imageData.height
  context.putImageData(imageData, 0, 0)

  const dataUrl = canvas.toDataURL('image/png')
  const byteString = atob(dataUrl.split(',')[1] ?? '')
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new File([uint8Array], fileName ?? 'image.png', { type: 'image/png' })
}
