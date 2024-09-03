import { Link, type LinkProps } from '@tanstack/react-router'
import type { FC } from 'react'

export const LinkButton: FC<LinkProps> = ({ children, ...props }) => (
  <Link
    {...props}
    className="flex w-full items-center justify-center rounded bg-accent-500 px-4 py-2 font-bold text-white shadow transition-colors hover:bg-accent-700 disabled:bg-accent-300"
  >
    {children}
  </Link>
)
