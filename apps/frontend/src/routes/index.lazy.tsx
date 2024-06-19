import { createLazyFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useState } from 'react'
import { apiClient } from '../lib/apiClient'

export const Route = createLazyFileRoute('/')({
  component: () => <Home />,
})

const $imagePost = apiClient.upload.$post

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
