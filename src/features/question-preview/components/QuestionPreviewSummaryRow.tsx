import { Icon } from '@iconify/react'
import { appCopy } from '@/content/appCopy'
import type { PreviewQuestion } from '../data/questionPreview.types'
import { DifficultyBadge } from './DifficultyBadge'

const t = appCopy.questionPreview

type Props = {
  question: PreviewQuestion
  expanded: boolean
  onToggle: () => void
}

export function QuestionPreviewSummaryRow({ question, expanded, onToggle }: Props) {
  const statusLabel =
    question.status === 'approved'
      ? t.statusApproved
      : question.status === 'draft'
        ? t.statusDraft
        : t.statusPending

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="flex w-full flex-wrap items-center gap-2 rounded-2xl border border-[#E5E5E5] bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-300 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-3.5"
    >
      <span className="shrink-0 text-sm font-semibold text-zinc-900">
        {question.order}. {t.questionLabel}
      </span>

      <span
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#E5E5E5] bg-[#F4F7FB] px-2.5 py-1 text-xs font-medium text-slate-700"
      >
        <Icon icon="mdi:pencil-outline" className="text-sm" aria-hidden />
        {t.edit}
      </span>

      <DifficultyBadge difficulty={question.difficulty} />

      <span className="min-w-0 flex-1 text-xs text-slate-600 sm:text-sm">
        {t.questionTypePrefix}: {question.questionTypeLabel}
      </span>

      <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-sky-700">
        <Icon icon="mdi:check-circle" className="text-lg" aria-hidden />
        {statusLabel}
        <Icon
          icon={expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          className="text-xl text-slate-500"
          aria-hidden
        />
      </span>
    </button>
  )
}
