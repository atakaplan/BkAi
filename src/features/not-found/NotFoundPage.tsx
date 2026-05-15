import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { appCopy } from '@/content/appCopy'

export function NotFoundPage() {
  const t = appCopy.notFound

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F7FB] text-[#004a7c] ring-1 ring-[#E5E5E5] sm:h-20 sm:w-20"
          aria-hidden
        >
          <Icon icon="mdi:map-marker-question-outline" className="text-4xl sm:text-5xl" />
        </span>
        <p className="text-6xl font-bold tabular-nums tracking-tight text-[#004a7c] sm:text-7xl">{t.code}</p>
        <h1 className="mt-3 text-xl font-semibold text-zinc-900 sm:text-2xl">{t.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">{t.description}</p>
        <Link
          to="/bkai"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#004a7c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003d68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c]"
        >
          <Icon icon="mdi:home-outline" className="text-lg" aria-hidden />
          {t.backHome}
        </Link>
      </div>
    </div>
  )
}
