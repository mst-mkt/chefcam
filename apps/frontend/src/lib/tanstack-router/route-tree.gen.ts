// biome-ignore lint: this file is auto-generated by TanStack Router

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as AppImport } from './../../routes/_app'
import { Route as IndexImport } from './../../routes/index'
import { Route as AppUploadIndexImport } from './../../routes/_app/upload/index'
import { Route as AppRecipeIndexImport } from './../../routes/_app/recipe/index'
import { Route as AppRecipeRecipeIdIndexImport } from './../../routes/_app/recipe/$recipeId/index'

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppUploadIndexRoute = AppUploadIndexImport.update({
  path: '/upload/',
  getParentRoute: () => AppRoute,
} as any)

const AppRecipeIndexRoute = AppRecipeIndexImport.update({
  path: '/recipe/',
  getParentRoute: () => AppRoute,
} as any)

const AppRecipeRecipeIdIndexRoute = AppRecipeRecipeIdIndexImport.update({
  path: '/recipe/$recipeId/',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_app/recipe/': {
      id: '/_app/recipe/'
      path: '/recipe'
      fullPath: '/recipe'
      preLoaderRoute: typeof AppRecipeIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/upload/': {
      id: '/_app/upload/'
      path: '/upload'
      fullPath: '/upload'
      preLoaderRoute: typeof AppUploadIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/recipe/$recipeId/': {
      id: '/_app/recipe/$recipeId/'
      path: '/recipe/$recipeId'
      fullPath: '/recipe/$recipeId'
      preLoaderRoute: typeof AppRecipeRecipeIdIndexImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AppRoute: AppRoute.addChildren({
    AppRecipeIndexRoute,
    AppUploadIndexRoute,
    AppRecipeRecipeIdIndexRoute,
  }),
})

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/recipe/",
        "/_app/upload/",
        "/_app/recipe/$recipeId/"
      ]
    },
    "/_app/recipe/": {
      "filePath": "_app/recipe/index.tsx",
      "parent": "/_app"
    },
    "/_app/upload/": {
      "filePath": "_app/upload/index.tsx",
      "parent": "/_app"
    },
    "/_app/recipe/$recipeId/": {
      "filePath": "_app/recipe/$recipeId/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
