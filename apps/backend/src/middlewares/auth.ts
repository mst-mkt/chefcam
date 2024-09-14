import Google from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { initAuthConfig } from '@hono/auth-js'

export const authMiddleware = initAuthConfig((c) => ({
  basePath: '/auth',
  secret: c.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: c.env.GOOGLE_CLIENT_ID,
      clientSecret: c.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect: ({ url }) => url,
  },
  adapter: DrizzleAdapter(c.var.db),
}))
