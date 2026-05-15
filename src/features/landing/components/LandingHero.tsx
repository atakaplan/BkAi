import { appCopy } from '../../../content/appCopy'

export function LandingHero() {
  return (
    <div className="mx-auto flex flex-col items-center gap-5 px-1 text-center sm:gap-6 md:gap-7">
      <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-black sm:text-3xl md:text-4xl lg:text-[2.375rem]">
        {appCopy.heroTitle}
      </h1>
      <p className="text-pretty text-sm leading-relaxed text-[#6B7280] sm:text-base md:text-[17px]">
        {appCopy.heroSubtitle}
      </p>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800"
          aria-hidden
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <path d="M0 0L10 6L0 12V0Z" />
          </svg>
        </span>
        {appCopy.introVideo}
      </button>
    </div>
  )
}
