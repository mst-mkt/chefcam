import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export const Route = createFileRoute('/_app')({
  component: () => <AppLayout />,
})

const AppLayout = () => (
  <div className="flex min-h-svh flex-col gap-y-12">
    <Header />
    <main className="mx-auto flex w-full max-w-[600px] grow flex-col gap-y-8">
      <Outlet />
    </main>
    <Footer />
  </div>
)
