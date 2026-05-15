import { useCallback, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { appCopy } from '@/content/appCopy'

const MOCK_PROGRESS = 0.38

export function IntroVideoPlayer() {
  const t = appCopy.introVideoPage
  const [playing, setPlaying] = useState(false)

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p)
  }, [])

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#0c0f14] shadow-[0_24px_64px_rgba(15,23,42,0.35)] ring-1 ring-white/10 sm:rounded-3xl">
      <Link
        to="/bkai"
        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
        aria-label={t.close}
      >
        <Icon icon="mdi:close" className="text-2xl" aria-hidden />
      </Link>

      <div className="relative aspect-video w-full bg-[#06080c]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-b from-[#0a0d12] via-[#121820] to-[#0a0d12] px-6 text-center sm:gap-4">
          <div
            className="grid grid-cols-3 gap-1 opacity-90"
            style={{ width: 48, height: 48 }}
            aria-hidden
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="rounded-sm bg-white/90" />
            ))}
          </div>
          <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">{t.posterLine1}</p>
          <p className="max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            {t.posterLine2}
            <br />
            {t.posterLine3}
          </p>
          <p className="text-xs text-white/50">{t.soonHint}</p>
        </div>

        {!playing ? (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition hover:bg-black/30"
            aria-label={appCopy.introVideo}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm sm:h-20 sm:w-20">
              <Icon icon="mdi:play" className="text-4xl sm:text-5xl" aria-hidden />
            </span>
          </button>
        ) : null}
      </div>

      <div className="border-t border-white/10 bg-[#0c0f14] px-3 py-3 sm:px-4 sm:py-3.5">
        <div className="mb-2 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10"
            aria-label={playing ? 'Duraklat' : 'Oynat'}
          >
            <Icon icon={playing ? 'mdi:pause' : 'mdi:play'} className="text-xl" aria-hidden />
          </button>
          <button
            type="button"
            disabled
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/40 sm:flex"
            aria-hidden
          >
            <Icon icon="mdi:skip-previous" className="text-xl" />
          </button>
          <button
            type="button"
            disabled
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/40 sm:flex"
            aria-hidden
          >
            <Icon icon="mdi:skip-next" className="text-xl" />
          </button>
          <p className="min-w-0 flex-1 truncate text-xs font-medium text-white/90 sm:text-sm">
            {appCopy.introVideo}
          </p>
          <span className="shrink-0 text-[11px] tabular-nums text-white/70 sm:text-xs">{t.durationMock}</span>
          <button type="button" disabled className="flex h-9 w-9 items-center justify-center text-white/40" aria-hidden>
            <Icon icon="mdi:volume-high" className="text-xl" />
          </button>
          <button
            type="button"
            disabled
            className="hidden h-9 w-9 items-center justify-center text-white/40 sm:flex"
            aria-hidden
          >
            <Icon icon="mdi:closed-caption-outline" className="text-xl" />
          </button>
          <button
            type="button"
            disabled
            className="hidden h-9 w-9 items-center justify-center text-white/40 sm:flex"
            aria-hidden
          >
            <Icon icon="mdi:fullscreen" className="text-xl" />
          </button>
          <button type="button" disabled className="flex h-9 w-9 items-center justify-center text-white/40" aria-hidden>
            <Icon icon="mdi:dots-vertical" className="text-xl" />
          </button>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-white/15"
          role="progressbar"
          aria-valuenow={Math.round(MOCK_PROGRESS * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-white/90" style={{ width: `${MOCK_PROGRESS * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
