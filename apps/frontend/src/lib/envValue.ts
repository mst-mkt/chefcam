import { z } from 'zod'

const backendBaseUrlSchema = z.string().url()

export const BACKEND_BASE_URL = backendBaseUrlSchema.parse(import.meta.env.VITE_BACKEND_BASE_URL)
