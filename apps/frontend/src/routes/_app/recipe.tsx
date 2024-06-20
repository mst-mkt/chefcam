import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/recipe')({
  component: () => <div>Hello /_app/recipe!</div>,
})
