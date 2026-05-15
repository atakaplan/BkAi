import { Icon } from '@iconify/react'
import type { MetodboxTestCardDef } from '../data/metodboxTests.mock'

type Props = {
  cards: MetodboxTestCardDef[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function MetodboxTestsPanel({ cards, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((card) => {
        const on = selectedId === card.id
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className={`flex min-h-[7.5rem] w-full overflow-hidden rounded-xl border text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c] ${
              on ? 'border-[#004a7c] ring-2 ring-[#004a7c]/25' : 'border-[#E5E5E5] hover:border-[#c8c8c8]'
            }`}
          >
            <div className="relative flex w-[42%] shrink-0 flex-col justify-between bg-gradient-to-br from-sky-100 via-sky-50 to-indigo-50 px-2.5 py-2.5 sm:px-3 sm:py-3">
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded bg-white/90 text-[9px] font-bold text-red-600 shadow-sm">
                M
              </span>
              <span className="pr-6 text-xs font-bold text-slate-900 sm:text-sm">{card.subject}</span>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm">
                  <Icon icon="mdi:pencil-outline" className="text-xs" aria-hidden />
                  {card.questionCount} Soru
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm">
                  <Icon icon="mdi:book-outline" className="text-xs" aria-hidden />
                  {card.materialLabel}
                </span>
              </div>
            </div>
            <div
              className={`flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-2.5 py-2 sm:px-3 ${
                on ? 'bg-[#004a7c] text-white' : 'bg-white text-slate-900'
              }`}
            >
              <span className={`text-[10px] font-semibold uppercase tracking-wide ${on ? 'text-sky-100' : 'text-sky-700'}`}>
                {card.testLabel}
              </span>
              <span className="text-xs font-semibold leading-snug sm:text-sm">{card.topicTitle}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
