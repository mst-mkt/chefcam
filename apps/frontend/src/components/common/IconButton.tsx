import type { Icon } from '@tabler/icons-react'
import type { FC, JSX } from 'react'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = {
  icon: Icon
  label?: string
  iconPosition?: 'left' | 'right'
  size?: number
  iconClassName?: string
} & Omit<JSX.IntrinsicElements['button'], 'children'>

export const IconButton: FC<IconButtonProps> = ({
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
    <Icon size={size ?? 20} className={iconClassName} />
    {label}
  </button>
)
