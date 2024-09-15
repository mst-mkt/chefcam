import type { Icon } from '@tabler/icons-react'
import { type FC, type JSX, useCallback, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Content =
  | { icon: Icon; label: string }
  | { icon: Icon; label?: string }
  | { icon?: Icon; label: string }

type ButtonProps = {
  iconPosition?: 'left' | 'right'
  size?: number
  toolTip?: string
  iconClassName?: string
} & Content &
  Omit<JSX.IntrinsicElements['button'], 'children'>

export const Button: FC<ButtonProps> = ({
  label,
  size,
  icon: Icon,
  iconPosition,
  iconClassName,
  toolTip,
  ...props
}) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = useCallback(() => setShowToolTip(true), [])
  const handleMouseLeave = useCallback(() => setShowToolTip(false), [])

  return (
    <button
      ref={buttonRef}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      className={twMerge(
        iconPosition === 'right' && 'flex-row-reverse',
        'relative flex w-fit items-center justify-center gap-x-2 rounded-md bg-background-50 p-2 transition-colors',
        'hover:bg-background-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:text-foreground-500 disabled:hover:bg-background-50',
        props.className,
      )}
    >
      {Icon !== undefined && <Icon size={size} className={iconClassName} />}
      {label !== undefined && <span>{label}</span>}
      {toolTip !== undefined && (
        <div
          className={twMerge(
            'absolute inset-x-auto top-[calc(100%+8px)] w-fit text-nowrap rounded-md bg-background-800 px-2 py-1 font-normal text-foreground-900 text-xs',
            'transition-opacity',
            showToolTip ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          {toolTip}
        </div>
      )}
    </button>
  )
}
