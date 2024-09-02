import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      generatedRouteTree: './src/lib/tanstack-router/route-tree.gen.ts',
      routesDirectory: 'src/routes',
      routeFileIgnorePrefix: '.',
      semicolons: false,
      quoteStyle: 'single',
    }),
  ],
})
