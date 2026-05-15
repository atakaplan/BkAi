import { useId, type ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { ModalFrame } from './ModalFrame'

export type ConfirmModalProps = {
  open: boolean
  onClose: () => void
  /** Örn. "Soru 1 silmek üzeresiniz." */
  message: ReactNode
  /** Örn. "Emin misiniz?" */
  confirmPrompt?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onConfirm: () => void | Promise<void>
  /** `onConfirm` bittikten sonra `onClose` çağrılsın mı */
  closeOnConfirm?: boolean
  confirmDisabled?: boolean
}

export function ConfirmModal({
  open,
  onClose,
  message,
  confirmPrompt = 'Emin misiniz?',
  cancelLabel = 'Vazgeç',
  confirmLabel = 'Sil',
  onConfirm,
  closeOnConfirm = true,
  confirmDisabled = false,
}: ConfirmModalProps) {
  const titleId = useId()

  return (
    <ModalFrame open={open} onClose={onClose} panelClassName="max-w-md" titleId={titleId}>
      <div className="px-6 pb-6 pt-10 text-center sm:px-8 sm:pt-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Icon icon="mdi:alert-circle-outline" className="text-4xl" aria-hidden />
        </div>
        <h2 id={titleId} className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">
          {message}
        </h2>
        {confirmPrompt ? (
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{confirmPrompt}</p>
        ) : null}
        <div className="my-6 border-t border-slate-100" />
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 sm:flex-initial sm:min-w-32"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={confirmDisabled}
            onClick={async () => {
              await onConfirm()
              if (closeOnConfirm) onClose()
            }}
            className="min-h-11 flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 sm:flex-initial sm:min-w-32"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalFrame>
  )
}
