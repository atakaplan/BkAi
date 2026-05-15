import { useId, type ReactNode } from 'react'
import { ModalFrame } from './ModalFrame'

export type QuestionModalOption = {
  id: string
  label: ReactNode
}

export type QuestionModalProps = {
  open: boolean
  onClose: () => void
  title: ReactNode
  subtitle?: ReactNode
  /** Diyagram, görsel, soru gövdesi vb. */
  children: ReactNode
  options?: QuestionModalOption[]
  onSelectOption?: (id: string) => void
  optionsLayout?: 'row' | 'column'
  panelClassName?: string
}

export function QuestionModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  options,
  onSelectOption,
  optionsLayout = 'row',
  panelClassName = 'max-w-2xl',
}: QuestionModalProps) {
  const titleId = useId()

  return (
    <ModalFrame open={open} onClose={onClose} panelClassName={panelClassName} titleId={titleId}>
      <div className="px-5 pb-6 pt-10 sm:px-8 sm:pt-12">
        <header className="pr-10">
          <h2 id={titleId} className="text-lg font-semibold text-sky-600 sm:text-xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm font-medium text-sky-500 sm:text-base">{subtitle}</p>
          ) : null}
        </header>
        <div className="mt-6 text-slate-800">{children}</div>
        {options?.length ? (
          <div
            className={
              optionsLayout === 'row'
                ? 'mt-6 flex flex-wrap gap-2 sm:gap-3'
                : 'mt-6 flex flex-col gap-2'
            }
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOption?.(opt.id)}
                className="min-h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-800 transition hover:border-sky-200 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:min-h-11 sm:px-4 sm:text-base"
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </ModalFrame>
  )
}
