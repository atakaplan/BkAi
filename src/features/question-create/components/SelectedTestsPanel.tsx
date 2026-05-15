import { Icon } from '@iconify/react'
import { appCopy } from '../../../content/appCopy'
import type { MetodboxTestCardDef } from '../data/metodboxTests.mock'

type Props = {
  test: MetodboxTestCardDef | null
  selectedQuestionCount: number
}

export function SelectedTestsPanel({ test, selectedQuestionCount }: Props) {
  const t = appCopy.questionCreate.questionStep4

  if (!test) {
    return (
      <div className="rounded-xl border border-dashed border-[#E5E5E5] bg-[#F4F7FB] px-4 py-10 text-center text-sm text-slate-600">
        {t.emptyHint}
      </div>
    )
  }

  const total = test.questionCount
  const countLine = `${selectedQuestionCount}/${total} ${t.selectedCountSuffix}`

  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-[9.5rem] w-full overflow-hidden rounded-2xl border border-[#E5E5E5] shadow-sm">
        {/* Sol — ders / rozetler */}
        <div className="relative flex w-[46%] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-indigo-100 px-3 py-3 sm:w-[42%] sm:px-4 sm:py-4">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-50"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.45) 1px, transparent 0)',
              backgroundSize: '10px 10px',
            }}
            aria-hidden
          />
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-white/95 text-[10px] font-bold text-red-600 shadow-sm">
            M
          </span>
          <div className="flex flex-1 flex-col items-center justify-center pt-6 text-center">
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{test.subject}</span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
              <Icon icon="mdi:pencil-outline" className="text-sm text-slate-600" aria-hidden />
              {test.questionCount} Soru
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
              <Icon icon="mdi:book-open-page-variant-outline" className="text-sm text-slate-600" aria-hidden />
              {test.materialLabel}
            </span>
          </div>
        </div>

        {/* Sağ — test detayı + seçim özeti */}
        <div className="flex min-w-0 flex-1 flex-col justify-between bg-[#004a7c] px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 text-base font-semibold leading-snug text-white sm:text-lg">{test.topicTitle}</h3>
            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#004a7c] shadow-sm">
              {test.testLabel}
            </span>
          </div>
          <div className="mt-4 flex justify-center sm:justify-end">
            <div className="w-full max-w-[16rem] rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#004a7c] shadow-md sm:max-w-none sm:px-5">
              {countLine}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
