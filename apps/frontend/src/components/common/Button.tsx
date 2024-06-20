import type { ButtonHTMLAttributes, FC } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ onClick, children, ...props }) => (
  <button
    {...props}
    type="button"
    className="block w-full rounded bg-[#6c8] px-4 py-2 font-bold text-white shadow transition-colors disabled:bg-[#8b9] hover:bg-[#5b7]"
    onClick={onClick}
  >
    {children}
  </button>
)
