import { IconBrandGithubFilled } from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { IllustBreakfast } from '../components/illust/Breakfast'

export const Route = createFileRoute('/')({
  component: () => <Home />,
})

const Home = () => (
  <>
    <div className="flex h-screen flex-col items-center justify-center text-center text-black">
      <div className="animate-fadeIn text-center">
        <h1 className="animate-slideInDown font-bold text-6xl text-gray-900">ChefCam.</h1>
        <p className="mt-4 animate-fadeIn text-gray-700 text-lg ">毎日レシピに悩む、あなたへ</p>
      </div>
      <IllustBreakfast
        height={400}
        width={450}
        className="max-h-[90vw] max-w-[90vw] animate-fadeIn"
      />
      <Link
        to="/upload"
        className="hover:-translate-y-1 py- mb-5 transform animate-fadeIn rounded-full bg-[#6c8] px-8 py-3 text-lg text-white shadow-lg transition hover:bg-[#5b7] "
      >
        始める
      </Link>
    </div>
    <a
      href="https://github.com/mst-mkt/monthly-vol7"
      className="absolute right-4 bottom-4 w-fit rounded-md p-2 transition-colors hover:bg-gray-200"
    >
      <IconBrandGithubFilled size={20} />
    </a>
  </>
)
