import { IconBrandGithubFilled } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export const Header = () => (
  <header className="sticky top-0 border-b bg-[#fff2] backdrop-blur-md">
    <div className="mx-auto flex max-w-[600px] items-center gap-y-4 px-6 py-4 font-bold text-2xl">
      <Link to="/" className="grow transition-colors hover:text-[#4c6]">
        ChefCam.
      </Link>
      <a
        href="https://github.com/mst-mkt/chefcam"
        className="w-fit rounded-md p-2 transition-colors hover:bg-gray-200"
      >
        <IconBrandGithubFilled size={20} />
      </a>
    </div>
  </header>
)
