import type { ImageUploadRouteType } from '@backend-types/index'
import { createLazyFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { type ChangeEvent, useState } from 'react'

export const Route = createLazyFileRoute('/')({
  component: () => <Home />,
})

const uploadClient = hc<ImageUploadRouteType>('http://localhost:8787') // backendのURL
const $imagePost = uploadClient.upload.image.$post

const Home = () => {
  const [message, setMessage] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const uploadFile = async () => {
    if (!file) return
    try {
      const res = await $imagePost({
        form: { file },
      })
      const data = await res.text()
      setMessage(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={uploadFile}>
        Upload image
      </button>
      <p>{message}</p>
    </div>
  )
}
