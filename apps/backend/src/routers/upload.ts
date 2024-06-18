import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { imageToFoods } from '../imageToFoods'
import { uploadReqSchema } from '../schemas/uploadSchema'

const uploadRouter = honoFactory
  .createApp()
  .post('/', zValidator('form', uploadReqSchema), async (c) => {
    try {
      const { file } = c.req.valid('form')
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

export { uploadRouter }
