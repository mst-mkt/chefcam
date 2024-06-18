import { z } from 'zod'

const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic', 'image/heif']

const uploadReqSchema = z
  .object({
    file: z
      .instanceof(File)
      .refine((f) => allowedImageTypes.includes(f.type), { message: 'Invalid file type' }),
  })
  .strict()

export { uploadReqSchema }
