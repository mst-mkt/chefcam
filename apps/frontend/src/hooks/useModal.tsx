import { type ReactNode, useRef } from 'react'
import { Modal as ModalComponent } from '../components/common/Modal'

export const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const open = () => modalRef.current?.showModal()
  const close = () => modalRef.current?.close()

  const Modal = ({ children }: { children: ReactNode }) => (
    <ModalComponent close={close} ref={modalRef}>
      {children}
    </ModalComponent>
  )

  return { open, close, Modal }
}
