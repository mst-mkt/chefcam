import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const recipeSearchSchema = z.object({
  foods: z.array(z.string()).catch([]),
})

export const Route = createFileRoute('/_app/recipe')({
  validateSearch: (search) => recipeSearchSchema.parse(search),
  component: () => <Recipe />,
})

const Recipe = () => {
  const { foods } = Route.useSearch()

  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
    </div>
  )
}
