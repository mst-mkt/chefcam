import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { z } from 'zod'

const app = new Hono()

app.use('/*', (c, next) => {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const { FRONTEND_BASE_URL } = env<{ FRONTEND_BASE_URL: string | undefined }>(c)
  if (!FRONTEND_BASE_URL) {
    throw new Error('FRONTEND_BASE_URL is not defined')
  }
  const arrowUrl = new URL(FRONTEND_BASE_URL).origin.toString()

  return cors({
    origin: arrowUrl,
  })(c, next)
})

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
