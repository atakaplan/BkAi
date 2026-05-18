import { Icon } from '@iconify/react'
import { appImages } from '@/assets/images'
import { appCopy } from '@/content/appCopy'
import type { PreviewQuestion } from '../data/questionPreview.types'
import { DifficultyBadge } from './DifficultyBadge'

const t = appCopy.questionPreview

type Props = {
  question: PreviewQuestion
  expanded: boolean
  isApproved: boolean
  onToggle: () => void
  onApprove: () => void
  onDeleteQuestion: () => void
  onDeleteOption: (optionKey: string) => void
}

export function QuestionPreviewDetailCard({
  question,
  expanded,
  isApproved,
  onToggle,
  onApprove,
  onDeleteQuestion,
  onDeleteOption,
}: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E5E5] px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="text-sm font-semibold text-zinc-900">
          {question.order}. {t.questionLabel}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200/80 transition hover:bg-amber-100"
        >
          {t.viewMetodboxSource}
        </button>
        <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 ring-1 ring-sky-200/80">
          {t.aiGenerated}
        </span>
        <DifficultyBadge difficulty={question.difficulty} />
        {isApproved ? (
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-sky-700">
            <Icon icon="mdi:check-circle" className="text-lg" aria-hidden />
            {t.statusApproved}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-[#F4F7FB] hover:text-slate-800 ${isApproved ? '' : 'ml-auto'}`}
          aria-expanded={expanded}
          aria-label={expanded ? t.collapse : t.expand}
        >
          <Icon icon={expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} className="text-xl" />
        </button>
      </div>

      {expanded ? (
        <>
          <div className="border-b border-[#E5E5E5] bg-[#F4F7FB]/60 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex gap-3">
              <p className="min-w-0 flex-1 text-sm leading-relaxed text-zinc-800 sm:text-[15px]">
                {question.bodyText}
              </p>
              <button
                type="button"
                onClick={onDeleteQuestion}
                className="shrink-0 text-slate-400 transition hover:text-red-500"
                aria-label={t.deleteQuestion}
              >
                <Icon icon="mdi:trash-can-outline" className="text-xl" />
              </button>
            </div>
          </div>

          <ul className="space-y-3 px-4 py-4 sm:px-5 sm:py-5">
            {question.options.map((opt) => (
              <li
                key={opt.key}
                className="rounded-xl border border-[#E5E5E5] bg-white p-3 sm:p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      opt.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                    }`}
                    aria-hidden
                  >
                    <Icon
                      icon={opt.isCorrect ? 'mdi:check' : 'mdi:close'}
                      className="text-base"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900">
                      <span className="font-semibold">{opt.key})</span> {opt.text}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium sm:text-sm ${
                        opt.isCorrect ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {opt.isCorrect ? t.correctAnswer : t.wrongAnswer}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {opt.explanation}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteOption(opt.key)}
                    className="shrink-0 text-slate-400 transition hover:text-red-500"
                    aria-label={t.deleteOption}
                  >
                    <Icon icon="mdi:trash-can-outline" className="text-xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 border-t border-[#E5E5E5] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 rounded-xl bg-[#F4F7FB] px-3 py-2.5">
              <img src={appImages.logoMark} alt="" className="h-7 w-auto shrink-0" />
              <div className="flex flex-wrap gap-2">
                {t.aiTools.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-sky-800 shadow-sm ring-1 ring-sky-100 transition hover:bg-sky-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={onDeleteQuestion}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 sm:text-sm"
              >
                {t.delete}
              </button>
              <button
                type="button"
                className="rounded-lg bg-slate-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-600 sm:text-sm"
              >
                {t.saveDraft}
              </button>
              {!isApproved ? (
                <button
                  type="button"
                  onClick={onApprove}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:text-sm"
                >
                  {t.approve}
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </article>
  )
}
