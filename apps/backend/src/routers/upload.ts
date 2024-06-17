import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { AppBindings } from '..'
import { imageToFoods } from '../imageToFoods'
import { uploadReqSchema } from '../schemas/uploadSchema'

const uploadRouter = new Hono<{ Bindings: AppBindings }>()

const uploadRoute = uploadRouter.post('/', zValidator('json', uploadReqSchema), async (c) => {
  try {
    const { file } = c.req.valid('json')
    if (!file) {
      return c.json(
        {
          error: 'No file found',
        },
        400,
      )
    }
    const foods = await imageToFoods(file, c.env)
    return c.json(
      {
        foods: foods,
      },
      200,
    )
  } catch (e) {
    return c.json(
      {
        error: e,
      },
      500,
    )
  }
})

export type UploadRouteType = typeof uploadRoute
export { uploadRouter }
