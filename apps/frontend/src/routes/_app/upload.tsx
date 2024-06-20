import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../../components/common/Button'
import { FileInput } from '../../components/common/FileInput'
import { apiClient } from '../../lib/apiClient'

export const Route = createFileRoute('/_app/upload')({
  component: () => <Upload />,
})

const Upload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [foods, setFoods] = useState<string[]>([])

  const uploadFile = async () => {
    if (file === null) return
    const res = await apiClient.upload.$post({ form: { file } })

    if (res.ok) {
      const data = await res.json()
      setFoods(data.foods)
    } else {
      const data = await res.json()
      console.error(data.error)
    }
  }

  return (
    <>
      <FileInput onChange={setFile} file={file} />
      <Button onClick={uploadFile}>Upload</Button>
      <ul>
        {foods.map((food, i) => (
          <li key={[food, i].join('-')}>{food}</li>
        ))}
      </ul>
    </>
  )
}
