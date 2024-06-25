import { zValidator } from '@hono/zod-validator'
import { honoFactory } from '../factory'
import { imageToFoods } from '../imageToFoods'
import { uploadReqSchema } from '../schemas/uploadSchema'

const uploadRouter = honoFactory
  .createApp()
  .post('/', zValidator('form', uploadReqSchema), async (c) => {
    const { file } = c.req.valid('form')

    if (file !== null && !(file instanceof File)) {
      return c.json({ error: 'No file found' }, 400)
    }

    try {
      const foods = await imageToFoods(file, c.env)
      return c.json({ foods }, 200)
    } catch (error) {
      return c.json({ error }, 500)
    }
  })

export { uploadRouter }
