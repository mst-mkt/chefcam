import { SessionProvider, authConfigManager } from '@hono/auth-js/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { BACKEND_BASE_URL } from './lib/envValue'
import { routeTree } from './lib/tanstack-router/route-tree.gen'

const router = createRouter({
  routeTree: routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

authConfigManager.setConfig({
  baseUrl: BACKEND_BASE_URL,
  basePath: '/auth',
  credentials: 'include',
})

const App = () => {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}

export default App
