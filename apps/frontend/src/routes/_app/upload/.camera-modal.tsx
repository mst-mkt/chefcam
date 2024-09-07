import type React from 'react'
import type { FC } from 'react'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-4">
        <h2 className="mb-4 font-bold text-black text-xl">{title}</h2>
        {children}
      </div>
    </div>
  )
}
