import type { FC, ReactNode } from 'react'

type ButtonProps = {
  onClick: () => void
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button
    type="button"
    className="block w-full rounded bg-[#6c8] px-4 py-2 font-bold text-white shadow transition-colors hover:bg-[#5b7]"
    onClick={onClick}
  >
    {children}
  </button>
)
