import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'

export type ModalFrameProps = {
  open: boolean
  onClose: () => void
  /** İçerik paneli — `role="dialog"` burada */
  children: ReactNode
  /** Tailwind max-width sınıfı, örn. `max-w-md` */
  panelClassName?: string
  /** `aria-labelledby` — panel içindeki görünür başlık öğesiyle aynı `id` */
  titleId: string
  /** Backdrop tıklanınca kapanma */
  closeOnBackdrop?: boolean
}

export function ModalFrame({
  open,
  onClose,
  children,
  panelClassName = 'max-w-md',
  titleId,
  closeOnBackdrop = true,
}: ModalFrameProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      const root = panelRef.current
      if (!root) return
      const focusable = root.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      focusable?.focus()
    }, 0)
    return () => clearTimeout(t)
  }, [open])

  if (!open) return null

  const node = (
    <div
      className="fixed inset-0 z-1100 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
        aria-label="Pencereyi kapat"
        onClick={() => {
          if (closeOnBackdrop) onClose()
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full ${panelClassName} rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/10`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          aria-label="Kapat"
        >
          <Icon icon="mdi:close" className="text-xl" aria-hidden />
        </button>
        {children}
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
