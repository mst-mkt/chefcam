import { signIn, signOut, useSession } from '@hono/auth-js/react'
import { IconBrightness, IconLogin, IconLogout, IconPoint } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { PROJECT_NAME } from '../../constants/projects'
import { useConfirm } from '../../hooks/useConfirm'
import { useTheme } from '../../hooks/useTheme'
import { IconButton } from '../common/IconButton'

export const Header = () => {
  const { toggleTheme } = useTheme()
  const { data: session } = useSession()

  const { confirm: loginConfirm, ConfirmDialog: LoginDialog } = useConfirm({
    onConfirm: async () => {
      await signIn('google')
    },
  })
  const { confirm: logoutConfirm, ConfirmDialog: LogoutDialog } = useConfirm({
    onConfirm: async () => {
      await signOut({ redirect: false })
    },
  })

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
            icon={session === null ? IconLogin : IconLogout}
            onClick={() => (session === null ? loginConfirm() : logoutConfirm())}
            className="bg-transparent"
          />
        </div>
      </div>
      <LoginDialog title="ログイン" confirmButtonText="Login" confirmButtonIcon={IconLogin}>
        <div className="flex flex-col gap-y-4">
          <p>Googleアカウントでログインすることができます。</p>
          <p>ログインすると以下の機能が利用できるようになります。</p>
          <ul className="flex flex-col gap-y-2">
            <li className="flex items-center gap-x-2">
              <IconPoint size={20} className="text-accent" />
              レシピのお気に入り機能
            </li>
            <li className="flex items-center gap-x-2">
              <IconPoint size={20} className="text-accent" />
              アップロードした画像の保存
            </li>
          </ul>
        </div>
      </LoginDialog>
      <LogoutDialog title="ログアウト" confirmButtonText="Logout" confirmButtonIcon={IconLogout}>
        ログアウトしますか？
      </LogoutDialog>
    </header>
  )
}
