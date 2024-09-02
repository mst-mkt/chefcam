import { IconBrightness } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { PROJECT_NAME } from '../../constants/projects'
import { useTheme } from '../../hooks/useTheme'

export const Header = () => {
  const { toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 border-background-100 border-b bg-backgroung/16 backdrop-blur-md">
      <div className="mx-auto flex max-w-max-content items-center justify-between gap-y-4 px-6 py-4 font-bold text-2xl">
        <Link to="/" className="transition-colors hover:text-accent-400">
          {PROJECT_NAME}
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="w-fit rounded-md p-2 transition-colors hover:bg-background-200 focus:outline-none"
        >
          <IconBrightness size={20} />
        </button>
      </div>
    </header>
  )
}
