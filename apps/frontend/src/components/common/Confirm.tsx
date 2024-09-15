import { type Icon, IconCheck, IconX } from '@tabler/icons-react'
import { type ReactNode, forwardRef } from 'react'
import { Button } from './Button'

type ConfirmProps = {
  title: string
  children: ReactNode | string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonIcon?: Icon
  cancelButtonIcon?: Icon
  onConfirm: () => void
  onCancel: () => void
}

export const Confirm = forwardRef<HTMLDialogElement, ConfirmProps>(
  (
    {
      title,
      children,
      onConfirm,
      onCancel,
      confirmButtonText = 'confirm',
      cancelButtonText = 'cancel',
      confirmButtonIcon = IconCheck,
      cancelButtonIcon = IconX,
    },
    ref,
  ) => (
    <dialog
      ref={ref}
      className="h-fit max-h-[calc(100svh-8svmin)] w-[512px] max-w-[92svmin] flex-col gap-y-6 rounded-lg bg-background p-6 shadow-md open:flex"
    >
      <header className="flex items-center justify-between">
        <h2 className="shrink grow font-bold">{title}</h2>
        <Button icon={IconX} onClick={onCancel} className="bg-transparent" />
      </header>
      <div>{children}</div>
      <div className="flex justify-end gap-x-2">
        <Button
          icon={cancelButtonIcon}
          onClick={onCancel}
          label={cancelButtonText}
          className="focus-visible:ring-red-400"
        />
        <Button
          icon={confirmButtonIcon}
          onClick={onConfirm}
          label={confirmButtonText}
          autoFocus={true}
          className="focus-visible:ring-blue-400"
        />
      </div>
    </dialog>
  ),
)
