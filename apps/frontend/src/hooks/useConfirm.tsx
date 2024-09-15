import type { Icon } from '@tabler/icons-react'
import { type FC, type ReactNode, useCallback, useRef } from 'react'
import { Confirm as ConfirmComponent } from '../components/common/Confirm'

type useConfirmArgs = {
  onConfirm: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

type ConfirmDialogProps = {
  title?: string
  children: ReactNode | string
  cancelButtonText?: string
  confirmButtonText?: string
  cancelButtonIcon?: Icon
  confirmButtonIcon?: Icon
}

export const useConfirm = ({ onConfirm, onCancel }: useConfirmArgs) => {
  const confirmRef = useRef<HTMLDialogElement>(null)

  const open = useCallback(() => confirmRef.current?.showModal(), [])
  const close = useCallback(() => {
    confirmRef.current?.close()
    onCancel?.()
  }, [onCancel])
  const confirm = useCallback(() => {
    onConfirm()
    confirmRef.current?.close()
  }, [onConfirm])

  const ConfirmDialog: FC<ConfirmDialogProps> = ({
    title = '',
    children,
    cancelButtonText,
    confirmButtonText,
    cancelButtonIcon,
    confirmButtonIcon,
  }) => (
    <ConfirmComponent
      ref={confirmRef}
      title={title ?? ''}
      cancelButtonText={cancelButtonText}
      confirmButtonText={confirmButtonText}
      onConfirm={confirm}
      onCancel={close}
      cancelButtonIcon={cancelButtonIcon}
      confirmButtonIcon={confirmButtonIcon}
    >
      {children}
    </ConfirmComponent>
  )

  return { confirm: open, close, ConfirmDialog }
}
