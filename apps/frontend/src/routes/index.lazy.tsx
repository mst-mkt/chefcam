import type { ImageUploadRouteType } from '@backend-types/index'
import { createLazyFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { type ChangeEvent, useState } from 'react'

export const Route = createLazyFileRoute('/')({
  component: () => <Home />,
})

const BACKEND_BASE_URL: string | undefined = import.meta.env.VITE_BACKEND_BASE_URL
if (!BACKEND_BASE_URL) {
  throw new Error('BACKEND_BASE_URL is not defined')
}
const requestUrl = new URL(BACKEND_BASE_URL).origin.toString()

const uploadClient = hc<ImageUploadRouteType>(requestUrl)
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
