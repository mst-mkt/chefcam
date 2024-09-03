import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'
import { imageToFoods } from '../imageToFoods'

const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic', 'image/heif']
const uploadReqSchema = z
  .object({
    file: z
      .instanceof(File)
      .refine((f) => allowedImageTypes.includes(f.type), { message: 'Invalid file type' }),
  })
  .strict()

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
