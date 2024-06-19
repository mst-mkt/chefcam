import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Footer } from '../components/ui/Footer'
import { Header } from '../components/ui/Header'

export const Route = createFileRoute('/_app')({
  component: () => <AppLayout />,
})

const AppLayout = () => (
  <div className="flex min-h-svh flex-col gap-y-12">
    <Header />
    <main className="mx-auto w-full max-w-[600px] grow">
      <Outlet />
    </main>
    <Footer />
  </div>
)
