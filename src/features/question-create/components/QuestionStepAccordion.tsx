import { Icon } from '@iconify/react'
import { type ReactNode } from 'react'

export type QuestionStepAccordionProps = {
  stepNumber: number
  stepBadge: string
  title: string
  subtitle?: string
  isOpen: boolean
  completed: boolean
  /** Önceki adım bitmeden bu adım açılamaz */
  locked: boolean
  onToggle: () => void
  completedLabel: string
  /** Tamamlanıp kapalıyken başlık satırında gösterilecek özet etiketleri */
  summaryChips?: string[]
  headerAction?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}

export function QuestionStepAccordion({
  stepNumber,
  stepBadge,
  title,
  subtitle,
  isOpen,
  completed,
  locked,
  onToggle,
  completedLabel,
  summaryChips,
  headerAction,
  children,
  footer,
}: QuestionStepAccordionProps) {
  const collapseBlocked = locked && !completed
  const titleMuted = !isOpen && !completed && stepNumber > 1
  const showCompletedSummaryBar = Boolean(completed && !isOpen && summaryChips !== undefined)

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#E5E5E5] shadow-sm ${
        showCompletedSummaryBar ? 'bg-[#F4F7FB]' : 'bg-white'
      } ${collapseBlocked ? 'opacity-75' : ''}`}
    >
      {showCompletedSummaryBar ? (
        <div className="flex flex-wrap items-center gap-2 gap-y-2 px-3 py-3 sm:px-4 sm:py-3.5">
          <button
            type="button"
            disabled={collapseBlocked}
            className="flex min-w-0 flex-1 flex-wrap items-center gap-2 gap-y-2 text-left disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <span className="shrink-0 rounded-lg bg-sky-200/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-950 sm:text-xs">
              {stepBadge}
            </span>
            <span className="shrink-0 text-sm font-semibold text-slate-900 sm:text-base">{title}</span>
            {summaryChips?.map((chip, i) => (
              <span
                key={`${i}-${chip}`}
                className="inline-flex shrink-0 items-center rounded-full border border-[#E5E5E5] bg-white px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm"
              >
                {chip}
              </span>
            ))}
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
              <Icon icon="mdi:check-circle-outline" className="text-lg shrink-0" aria-hidden />
              {completedLabel}
            </span>
            <button
              type="button"
              disabled={collapseBlocked}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onToggle}
              aria-label={isOpen ? 'Adımı kapat' : 'Adımı aç'}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="transition"
                aria-hidden
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-stretch gap-2 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
          <button
            type="button"
            disabled={collapseBlocked}
            className="flex min-w-0 flex-1 items-start gap-2 text-left disabled:cursor-not-allowed disabled:opacity-60 sm:items-center sm:gap-3"
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <span className="mt-0.5 shrink-0 rounded-full bg-sky-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-900 sm:text-xs">
              {stepBadge}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-sm font-semibold sm:text-base ${titleMuted ? 'text-slate-500' : 'text-slate-900'}`}
                >
                  {title}
                </span>
                {completed && !summaryChips ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                    {completedLabel}
                  </span>
                ) : null}
              </span>
              {subtitle ? (
                <span className="mt-0.5 block text-xs font-normal leading-snug text-slate-500 sm:text-sm">
                  {subtitle}
                </span>
              ) : null}
            </span>
          </button>
          {isOpen && headerAction ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {headerAction}
            </div>
          ) : null}
          <button
            type="button"
            disabled={collapseBlocked}
            className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onToggle}
            aria-label={isOpen ? 'Adımı kapat' : 'Adımı aç'}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      {isOpen && children ? (
        <>
          <div className="border-t border-[#E5E5E5] bg-[#F4F7FB] px-3 py-4 sm:px-4">{children}</div>
          {footer ? (
            <div className="border-t border-[#E5E5E5] bg-white px-3 py-3 sm:px-4 sm:py-4">{footer}</div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
