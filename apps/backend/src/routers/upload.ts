import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { uploadReqSchema } from '../schemas/uploadSchema'

const uploadRouter = new Hono()

uploadRouter.post('/', zValidator('param', uploadReqSchema), async (c) => {
  const { file } = c.req.valid('param')

  return c.json({ message: 'File uploaded', image: file }, 200)
})

export { uploadRouter }
