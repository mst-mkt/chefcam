import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/select')({
  component: () => <div>Hello /_app/select!</div>
})