import type { HonoRoutes } from '@backend-types/index'
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

const honoRoutes = hc<HonoRoutes>(requestUrl)
const $imagePost = honoRoutes.upload.$post

const Home = () => {
  const [file, setFile] = useState<File | null>(null)
  const [foods, setFoods] = useState<string[]>([])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const uploadFile = async () => {
    if (!file) return
    const res = await $imagePost({
      form: { file },
    })
    if (res.ok) {
      const data = await res.json()
      setFoods(data.foods)
    } else {
      const data = await res.json()
      console.error(data.error)
    }
  }
  return (
    <div>
      <h1>Home</h1>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={uploadFile}>
        Upload image
      </button>
      <ul>
        {foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </div>
  )
}
