import { useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { appCopy } from '../../../content/appCopy'
import {
  METODOBOX_QUESTIONS_TOTAL,
  MOCK_METODOBOX_QUESTIONS,
  getDifficultyCountsFromChosenIds,
  type MetodboxQuestionDifficultyCounts,
} from '../data/metodboxQuestionsStep.mock'

type DifficultyKey = keyof MetodboxQuestionDifficultyCounts

type Props = {
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  chosenIds: string[]
  onToggleChosen: (id: string) => void
}

function ReadOnlyDifficultyStep({
  label,
  variant,
  value,
}: {
  label: string
  variant: DifficultyKey
  value: number
}) {
  const active = value > 0

  const ring =
    variant === 'easy'
      ? active
        ? 'ring-2 ring-emerald-500'
        : 'ring-2 ring-transparent'
      : variant === 'medium'
        ? active
          ? 'ring-2 ring-orange-400'
          : 'ring-2 ring-transparent'
        : active
          ? 'ring-2 ring-red-500'
          : 'ring-2 ring-transparent'

  const labelColor =
    variant === 'easy' ? 'text-emerald-800' : variant === 'medium' ? 'text-orange-800' : 'text-red-800'

  return (
    <div
      className={`flex flex-col gap-1.5 rounded-xl border border-[#E5E5E5] bg-white p-2.5 transition ${ring}`}
      role="group"
      aria-label={label}
    >
      <span className={`text-center text-xs font-semibold ${labelColor}`}>{label}</span>
      <div className="flex items-center justify-center gap-1">
        <span
          className="pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F4F7FB] text-slate-400 opacity-60"
          aria-hidden
        >
          <Icon icon="mdi:minus" className="text-lg" />
        </span>
        <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums text-slate-900">{value}</span>
        <span
          className="pointer-events-none flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F4F7FB] text-slate-400 opacity-60"
          aria-hidden
        >
          <Icon icon="mdi:plus" className="text-lg" />
        </span>
      </div>
    </div>
  )
}

export function MetodboxQuestionsStepPanel({
  activeIndex,
  onActiveIndexChange,
  chosenIds,
  onToggleChosen,
}: Props) {
  const t = appCopy.questionCreate.questionStep3
  const [previewTab, setPreviewTab] = useState<'soru' | 'video'>('soru')
  const [zoom, setZoom] = useState(100)

  const counts = useMemo(() => getDifficultyCountsFromChosenIds(chosenIds), [chosenIds])

  const question = MOCK_METODOBOX_QUESTIONS[activeIndex] ?? MOCK_METODOBOX_QUESTIONS[0]
  const isChosen = chosenIds.includes(question.id)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[#E5E5E5] bg-white p-3 sm:p-4">
        <p className="text-sm font-medium text-slate-800">{t.pickCountLabel}</p>
        <div className="flex flex-wrap items-end justify-center gap-3 sm:justify-start sm:gap-4">
          <ReadOnlyDifficultyStep label={t.kolay} variant="easy" value={counts.easy} />
          <ReadOnlyDifficultyStep label={t.orta} variant="medium" value={counts.medium} />
          <ReadOnlyDifficultyStep label={t.zor} variant="hard" value={counts.hard} />
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-3 md:flex-row md:items-stretch">
        <div className="flex w-full shrink-0 flex-col md:w-44 lg:w-52">
          <p className="mb-2 text-xs font-semibold text-slate-600">
            {t.listTitle} {activeIndex + 1}/{METODOBOX_QUESTIONS_TOTAL}
          </p>
          <nav
            className="max-h-[min(420px,52vh)] overflow-y-auto overscroll-y-contain rounded-xl border border-[#E5E5E5] bg-white p-1.5 md:max-h-[min(520px,58vh)]"
            aria-label="Soru listesi"
          >
            <ul className="flex flex-col gap-0.5">
              {MOCK_METODOBOX_QUESTIONS.map((q, i) => {
                const on = i === activeIndex
                const chosen = chosenIds.includes(q.id)
                return (
                  <li key={q.id}>
                    <button
                      type="button"
                      onClick={() => onActiveIndexChange(i)}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition ${
                        on ? 'bg-sky-100 text-sky-950' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="min-w-0 truncate">{q.listLabel}</span>
                      {chosen ? (
                        <span className="shrink-0 rounded-full bg-[#004a7c] px-2 py-0.5 text-[10px] font-semibold text-white">
                          {t.listSelectedBadge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col rounded-xl border border-[#E5E5E5] bg-white p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1 space-y-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {t.kazanimKodu}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{question.kazanimKodu}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{question.kazanimMetni}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">{t.dogruCevap}:</span>
                  <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-emerald-100 px-2 text-sm font-bold text-emerald-900">
                    {question.correctOption}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('soru')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                      previewTab === 'soru' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {t.tabSoru}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('video')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                      previewTab === 'video' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {t.tabCozum}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] text-slate-600 hover:bg-slate-50"
                    aria-label={t.zoomOut}
                    onClick={() => setZoom((z) => Math.max(80, z - 10))}
                  >
                    <Icon icon="mdi:magnify-minus-outline" className="text-lg" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] text-slate-600 hover:bg-slate-50"
                    aria-label={t.zoomIn}
                    onClick={() => setZoom((z) => Math.min(130, z + 10))}
                  >
                    <Icon icon="mdi:magnify-plus-outline" className="text-lg" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {previewTab === 'soru' ? (
              <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
                <div
                  className="flex min-h-[12rem] flex-col items-center justify-center rounded-lg border border-dashed border-[#E5E5E5] bg-[#F4F7FB] px-4 py-8 text-center transition-[transform] duration-200"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  <Icon icon="mdi:image-filter-hdr" className="mb-2 text-4xl text-slate-400" aria-hidden />
                  <p className="max-w-sm text-sm text-slate-600">{t.icerikPlaceholder}</p>
                  <p className="mt-3 text-xs text-slate-500">(Örnek: çarpan ağacı görseli)</p>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  Yukarıdaki çarpan ağacına göre A + B + C toplamı kaçtır?
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {question.options.map((opt) => (
                    <div
                      key={opt.key}
                      className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-center text-sm font-semibold text-slate-800"
                    >
                      <span className="text-sky-700">{opt.key})</span> {opt.text}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex min-h-[12rem] items-center justify-center rounded-lg border border-dashed border-[#E5E5E5] bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
                Çözüm videosu oynatıcısı burada yer alacak.
              </div>
            )}

            <div className="mt-auto flex justify-end border-t border-[#E5E5E5] pt-4">
              <button
                type="button"
                onClick={() => onToggleChosen(question.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c] ${
                  isChosen
                    ? 'border border-sky-200 bg-sky-50 text-[#004a7c] hover:bg-sky-100'
                    : 'border border-[#004a7c] bg-[#004a7c] text-white hover:bg-[#003d68]'
                }`}
              >
                {isChosen ? t.secimdenVazgec : t.sec}
              </button>
            </div>
          </div>
        </div>
      </div>

      {chosenIds.length === 0 ? (
        <p className="text-xs text-slate-500">İlerlemek için listeden en az bir soru seçin.</p>
      ) : null}
    </div>
  )
}
