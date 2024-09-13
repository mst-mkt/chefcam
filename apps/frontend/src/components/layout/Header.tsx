import { signIn, signOut, useSession } from '@hono/auth-js/react'
import { IconBrightness, IconDoorEnter, IconDoorExit } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { PROJECT_NAME } from '../../constants/projects'
import { useTheme } from '../../hooks/useTheme'
import { IconButton } from '../common/IconButton'

export const Header = () => {
  const { toggleTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-background-100 border-b bg-backgroung/16 backdrop-blur-md">
      <div className="mx-auto flex max-w-max-content items-center justify-between gap-y-4 px-6 py-4 font-bold text-2xl">
        <Link to="/" className="transition-colors hover:text-accent-400">
          {PROJECT_NAME}
        </Link>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-fit rounded-md p-2 transition-colors hover:bg-background-100 focus:outline-none"
          >
            <IconBrightness size={20} />
          </button>
          <IconButton
            icon={session === null ? IconDoorEnter : IconDoorExit}
            onClick={() => (session === null ? signIn('google') : signOut({ redirect: false }))}
            className="bg-transparent"
          />
        </div>
      </div>
    </header>
  )
}
