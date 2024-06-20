import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../../components/common/Button'
import { FileInput } from '../../components/common/FileInput'
import { apiClient } from '../../lib/apiClient'
import { dropDuplicates } from '../../utils/dropDuplicates'

export const Route = createFileRoute('/_app/upload')({
  component: () => <Upload />,
})

const Upload = () => {
  const [files, setFiles] = useState<File[]>([])
  const [foods, setFoods] = useState<string[]>([])

  const uploadFile = async () => {
    const postImage = (file: File) => apiClient.upload.$post({ form: { file } })
    const responses = await Promise.all(files.map(postImage))

    for (const res of responses) {
      if (!res.ok) {
        const data = await res.json()
        console.error(data.error)
        return
      }
      const data = await res.json()
      setFoods((prev) => dropDuplicates([...prev, ...data.foods]))
    }
  }

  return (
    <>
      <FileInput setFiles={setFiles} files={files} />
      <Button onClick={uploadFile}>Upload</Button>
      <ul>
        {foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </>
  )
}
