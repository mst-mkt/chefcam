export const preloadImages = async (images: string[]) => {
  await Promise.all(
    images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = image
        img.onload = resolve
      })
    }),
  )
}
