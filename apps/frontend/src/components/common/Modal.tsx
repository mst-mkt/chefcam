import { IconX } from '@tabler/icons-react'
import { type ReactNode, forwardRef } from 'react'
import { twJoin } from 'tailwind-merge'
import { Button } from './Button'

type ModalProps = {
  close: () => void
  title?: string
  displayContent?: boolean
  children?: ReactNode
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ close, title, children, displayContent = true }, ref) => (
    <dialog
      ref={ref}
      className={twJoin(
        'h-fit max-h-[calc(100svh-8svmin)] w-[92svmin] flex-col gap-y-4 rounded-lg bg-background p-4 shadow-md open:flex',
        'backdrop:bg-black/50 backdrop:backdrop-blur-md',
      )}
    >
      {displayContent && (
        <>
          <header className="flex items-center justify-between">
            <h2 className="shrink grow font-bold">{title}</h2>
            {/* biome-ignore lint/a11y/noPositiveTabindex: don't focus close button at fist time */}
            <Button icon={IconX} onClick={close} className="bg-transparent" tabIndex={1} />
          </header>
          {children}
        </>
      )}
    </dialog>
  ),
)
