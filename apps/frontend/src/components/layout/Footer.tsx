import { PROJECT_NAME } from '../../constants/projects'

export const Footer = () => (
  <footer className="mx-auto flex w-full max-w-[600px] items-center gap-x-4 px-6 py-4">
    <p className="font-bold text-lg">{PROJECT_NAME}</p>
    <div className="h-[1px] grow bg-gray-400 " />
  </footer>
)
