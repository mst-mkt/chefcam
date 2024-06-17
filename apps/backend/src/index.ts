import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { uploadRouter } from './routers/upload'

type Bindings = {
  FRONTEND_BASE_URL: string | undefined
}

const app = new Hono<{ Bindings: Bindings }>()

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

export default app
