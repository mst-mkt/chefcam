import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { recipesRouter } from './routers/recipes'
import { uploadRouter } from './routers/upload'

export type AppBindings = {
  FRONTEND_BASE_URL: string | undefined
  OPENAI_API_KEY: string | undefined
  OPENAI_BASE_URL: string | undefined
}

const app = new Hono<{ Bindings: AppBindings }>()

app.use(
  '*',
  cors({
    allowMethods: ['GET', 'POST'],
    origin: (_, c) => {
      const { FRONTEND_BASE_URL } = c.env
      if (FRONTEND_BASE_URL === undefined) {
        throw new Error('FRONTEND_BASE_URL is not set')
      }

      return FRONTEND_BASE_URL
    },
  }),
)

app.route('/upload', uploadRouter)
app.route('/recipes', recipesRouter)

export default app
