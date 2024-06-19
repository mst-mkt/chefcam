import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: () => <AppLayout />,
})

const AppLayout = () => (
  <div>
    <header>header</header>
    <main>
      <Outlet />
    </main>
    <footer>footer</footer>
  </div>
)
