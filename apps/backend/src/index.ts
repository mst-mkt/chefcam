import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

const app = new Hono()

app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173', // frontendのURL
  }),
)

const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic', 'image/heif']

const imageSchema = z
  .object({
    file: z.instanceof(File).refine(
      (f) => {
        return allowedImageTypes.includes(f.type)
      },
      {
        message: 'Invalid file type',
      },
    ),
  })
  .strict()

const imageUploadRoute = app.post('/upload/image', zValidator('form', imageSchema), async (c) => {
  try {
    const { file } = c.req.valid('form')
    if (!file) {
      return c.json('No file found', 400)
    }
    // ここで画像に対する処理を書く？
    return c.json('File uploaded', 200)
  } catch (e) {
    if (e instanceof Error) {
      return c.json(e.message, 500)
    }
  }
})

export type ImageUploadRouteType = typeof imageUploadRoute
export default app
