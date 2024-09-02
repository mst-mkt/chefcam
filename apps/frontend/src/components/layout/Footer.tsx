import {
  type Icon,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandX,
  IconLink,
} from '@tabler/icons-react'
import { PROJECT_AUTHOR, PROJECT_LINKS, PROJECT_NAME } from '../../constants/projects'

type UrlInfo = {
  icon: Icon
  label: string
  url: string
}

const getLinkIcon = (url: string): UrlInfo => {
  if (url.startsWith('https://github.com')) {
    return { icon: IconBrandGithub, label: 'GitHub', url }
  }
  if (url.startsWith('https://twitter.com')) {
    return { icon: IconBrandTwitter, label: 'Twitter', url }
  }
  if (url.startsWith('https://x.com')) {
    return { icon: IconBrandX, label: 'X', url }
  }
  return { icon: IconLink, label: url, url }
}

export const Footer = () => (
  <footer className="mx-auto flex w-full max-w-max-content flex-col gap-y-2 px-6 py-4">
    <div className="flex w-full items-center gap-x-4">
      <p className="font-bold text-lg">{PROJECT_NAME}</p>
      <div className="h-[1px] grow bg-foreground" />
    </div>
    <ul>
      <li>
        {PROJECT_LINKS.map(getLinkIcon).map((url) => (
          <a
            key={url.label}
            href={url.url}
            className="flex items-center gap-x-1 transition-colors hover:text-accent"
          >
            <url.icon size={16} /> {url.label}
          </a>
        ))}
      </li>
    </ul>
    <p className="text-foreground-300 text-sm">
      &copy; {new Date().getFullYear()} {PROJECT_AUTHOR.join(', ')}
    </p>
  </footer>
)
