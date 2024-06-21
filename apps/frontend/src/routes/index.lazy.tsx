import { createLazyFileRoute } from '@tanstack/react-router'
import type { HonoRoutes } from 'backend/src/index'
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
const $getRecipes = honoRoutes.recipes.$get

const Home = () => {
  const [file, setFile] = useState<File | null>(null)
  const [ingredients, setingredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<
    {
      ingredients: string[]
      recipeImage: string
      recipeTitle: string
    }[]
  >([])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const getRecipes = async () => {
    const res = await $getRecipes({
      query: { ingredients },
    })
    if (res.ok) {
      const data = await res.json()
      setRecipes(data)
    } else {
      const data = await res.json()
      console.error(data)
    }
  }

  const uploadFile = async () => {
    if (!file) return
    const res = await $imagePost({
      form: { file },
    })
    if (res.ok) {
      const data = await res.json()
      setingredients(data.foods)
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
        {ingredients.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>

      <button type="button" onClick={getRecipes}>
        Get recipes
      </button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipeTitle}>
            <img src={recipe.recipeImage} alt={recipe.recipeTitle} />
            <h2>{recipe.recipeTitle}</h2>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
