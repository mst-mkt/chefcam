import Google from '@auth/core/providers/google'
import { initAuthConfig } from '@hono/auth-js'

export const authMiddleware = initAuthConfig((c) => ({
  secret: c.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: c.env.GOOGLE_CLIENT_ID,
      clientSecret: c.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}))
