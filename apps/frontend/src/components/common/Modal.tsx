import { IconX } from '@tabler/icons-react'
import { type ReactNode, forwardRef } from 'react'
import { twJoin } from 'tailwind-merge'
import { IconButton } from './IconButton'

type ModalProps = {
  close: () => void
  children?: ReactNode
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ close, children }, ref) => (
  <dialog
    ref={ref}
    className={twJoin(
      'h-[92svmin] w-[92svmin] rounded-lg bg-background p-12 shadow-md',
      'backdrop:bg-black/50 backdrop:backdrop-blur-md',
    )}
  >
    <IconButton icon={IconX} onClick={close} className="absolute top-4 right-4 bg-transparent" />
    {children}
  </dialog>
))
