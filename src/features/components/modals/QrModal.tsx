import { useId, type ReactNode } from 'react'
import { ModalFrame } from './ModalFrame'

export type QrModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  helperText?: ReactNode
  searchLabel?: string
  isSearching?: boolean
  panelClassName?: string
}

export function QrModal({
  open,
  onClose,
  title = 'Karekod ile ara',
  placeholder = 'Karekod…',
  value,
  onChange,
  onSearch,
  helperText = 'Kare kodunu arama alanına yazarak bulabilirsin.',
  searchLabel = 'Ara',
  isSearching = false,
  panelClassName = 'max-w-lg',
}: QrModalProps) {
  const titleId = useId()

  return (
    <ModalFrame open={open} onClose={onClose} panelClassName={panelClassName} titleId={titleId}>
      <div className="px-5 pb-6 pt-10 sm:px-8 sm:pt-12">
        <h2 id={titleId} className="pr-10 text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h2>
        <div className="mt-6 flex items-stretch gap-2 rounded-full border border-[#E5E5E5] bg-[#F4F7FB] p-1.5 pl-4 shadow-inner sm:pl-5">
          <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSearch()
              }
            }}
            placeholder={placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
            autoComplete="off"
            aria-label={typeof title === 'string' ? title : 'Karekod ara'}
          />
          <button
            type="button"
            onClick={onSearch}
            disabled={isSearching}
            className="shrink-0 cursor-pointer rounded-full bg-[#004a7c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003d68] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c] sm:px-6"
          >
            {searchLabel}
          </button>
        </div>
        {helperText ? (
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{helperText}</p>
        ) : null}
      </div>
    </ModalFrame>
  )
}
