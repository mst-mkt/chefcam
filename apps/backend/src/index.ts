import { honoFactory } from './factory'
import { recipesRouter } from './routers/recipes'
import { uploadRouter } from './routers/upload'

const app = honoFactory.createApp()

const routes = app.route('/upload', uploadRouter).route('/recipes', recipesRouter)

export type HonoRoutes = typeof routes

// biome-ignore lint/style/noDefaultExport: this file is the entry point of the app
export default app
