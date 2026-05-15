import { Link } from 'react-router-dom'
import { appCopy } from '../../content/appCopy'

export function AppHeader() {
  return (
    <header className="app-shell-header fixed inset-x-0 top-0 z-1000 flex items-center bg-white">
      <div className="mx-auto flex h-full w-full items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          to="/bkai"
          className="flex min-w-0 items-center gap-2 rounded-md outline-offset-2 focus-visible:outline-2 focus-visible:outline-slate-400"
        >
          <img src="/assets/logo-full.svg" alt="" className="shrink-0" />
        </Link>
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <a
            href="https://www.metodbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-orange-100 bg-[#FFF7ED] px-3 py-1.5 text-xs font-semibold text-orange-800 shadow-sm transition hover:bg-[#FFEDD5] sm:px-4 sm:py-2 sm:text-sm"
            title="Metodbox"
          >
            {appCopy.backToMetodbox}
          </a>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700 sm:h-10 sm:w-10 sm:text-sm"
            aria-label="Kullanıcı"
          >
            {appCopy.userInitials}
          </div>
        </div>
      </div>
    </header>
  )
}
