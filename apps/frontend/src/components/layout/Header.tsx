import { IconBrandGithubFilled } from '@tabler/icons-react'

export const Header = () => (
  <header className="sticky top-0 border-b bg-[#fff2] p-4 backdrop-blur-md">
    <div className="mx-auto flex max-w-[600px] items-center gap-y-4 font-bold text-2xl ">
      <h1 className="grow">ChefCam.</h1>
      <a
        href="https://github.com/mst-mkt/chefcam"
        className="w-fit rounded-md p-2 transition-colors hover:bg-gray-200"
      >
        <IconBrandGithubFilled size={20} />
      </a>
    </div>
  </header>
)
