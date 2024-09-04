import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import { Modal as ModalComponent } from '../components/common/Modal'

export const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const open = useCallback(() => modalRef.current?.showModal(), [])
  const close = useCallback(() => modalRef.current?.close(), [])

  const isOpen = useMemo(() => modalRef.current?.open, [])

  useEffect(() => {
    if (isOpen) close()
  }, [isOpen, close])

  const Modal: FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
    <ModalComponent close={close} ref={modalRef} title={title} displayContent={isOpen}>
      {children}
    </ModalComponent>
  )

  return { open, close, Modal, isOpen }
}
