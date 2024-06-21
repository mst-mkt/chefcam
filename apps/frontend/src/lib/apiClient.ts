import type { HonoRoutes } from 'backend/src/index'
import { hc } from 'hono/client'
import { BACKEND_BASE_URL } from './envValue'

const requestUrl = new URL(BACKEND_BASE_URL).origin.toString()

export const apiClient = hc<HonoRoutes>(requestUrl)
