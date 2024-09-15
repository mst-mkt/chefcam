import type { Icon } from '@tabler/icons-react'
import type { FC, JSX } from 'react'
import { twMerge } from 'tailwind-merge'

type Content =
  | { icon: Icon; label: string }
  | { icon: Icon; label?: string }
  | { icon?: Icon; label: string }

type ButtonProps = {
  iconPosition?: 'left' | 'right'
  size?: number
  iconClassName?: string
} & Content &
  Omit<JSX.IntrinsicElements['button'], 'children'>

export const Button: FC<ButtonProps> = ({
  label,
  size,
  icon: Icon,
  iconPosition,
  iconClassName,
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={twMerge(
      iconPosition === 'right' && 'flex-row-reverse',
      'flex w-fit items-center justify-center gap-x-2 rounded-md bg-background-50 p-2 transition-colors',
      'hover:bg-background-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:text-foreground-500 disabled:hover:bg-background-50',
      props.className,
    )}
  >
    {Icon && <Icon size={size} className={iconClassName} />}
    {label && <span>{label}</span>}
  </button>
)
