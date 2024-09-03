import { IconBrandGithubFilled } from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IllustBreakfast } from '../components/illust/Breakfast'
import { PROJECT_NAME, PROJECT_REPOSITORY_URL } from '../constants/projects'

export const Route = createFileRoute('/')({
  component: () => <Home />,
})

const Home = () => (
  <>
    <div className="flex h-svh flex-col items-center justify-center text-center">
      <div className="animate-fadeIn text-center">
        <h1 className="animate-slideInDown font-bold text-6xl text-foreground">{PROJECT_NAME}</h1>
        <p className="mt-4 animate-fadeIn text-foreground-200 text-lg ">
          毎日レシピに悩む、あなたへ
        </p>
      </div>
      <IllustBreakfast
        height={400}
        width={450}
        className="max-h-[90vw] max-w-[90vw] animate-fadeIn"
      />
      <Link
        to="/upload"
        className="mb-5 transform animate-fadeIn rounded-full bg-accent px-8 py-3 text-lg text-white shadow-lg transition hover:translate-y-1 hover:bg-accent-600"
      >
        始める
      </Link>
    </div>
    <a
      href={PROJECT_REPOSITORY_URL}
      className="absolute right-4 bottom-4 w-fit rounded-md p-2 transition-colors hover:bg-background-100"
    >
      <IconBrandGithubFilled size={20} className="text-foreground" />
    </a>
  </>
)
