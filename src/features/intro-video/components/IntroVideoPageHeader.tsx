import { useState } from 'react'
import { appImages } from '@/assets/images'
import { appCopy } from '@/content/appCopy'

const t = appCopy.introVideoPage

type NavId = 'bkai' | 'auxiliary'

const navBtnBase =
  'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c]'

function navBtnClass(selected: boolean) {
  return selected
    ? `${navBtnBase} bg-[#E8EAED] text-zinc-900 hover:bg-[#dfe1e5]`
    : `${navBtnBase} bg-transparent text-zinc-700 hover:bg-[#F4F7FB] hover:text-zinc-900 cursor-pointer`
}

export function IntroVideoPageHeader() {
  const [activeNav, setActiveNav] = useState<NavId>('bkai')

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-4 py-1.5 shadow-sm ring-1 ring-[#E5E5E5] sm:px-5 sm:py-2">
      <div className="flex shrink-0 flex-col items-center gap-1">
        <img
          src={appImages.logoCompact}
          alt=""
          className="h-11 w-auto object-contain sm:h-12"
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-900 sm:text-xs">
          {t.teacher}
        </span>
      </div>

      <nav
        className="flex flex-wrap items-center justify-end gap-2 sm:gap-3"
        aria-label={t.navAriaLabel}
      >
        <button
          type="button"
          className={navBtnClass(activeNav === 'bkai')}
          aria-pressed={activeNav === 'bkai'}
          onClick={() => setActiveNav('bkai')}
        >
          {t.introVideoBkaiTools}
        </button>
        <button
          type="button"
          className={navBtnClass(activeNav === 'auxiliary')}
          aria-pressed={activeNav === 'auxiliary'}
          onClick={() => setActiveNav('auxiliary')}
        >
          {t.introVideoAuxiliaryTools}
        </button>
      </nav>
    </header>
  )
}
