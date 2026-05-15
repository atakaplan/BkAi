import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { appCopy } from '../../../content/appCopy'
import BackButtonIcon from '../../components/BackButton'

export type QuestionCreateWorkspaceNavId = (typeof appCopy.questionCreate.workspaceNav)[number]['id']

type Props = {
  activeId: QuestionCreateWorkspaceNavId
}

export function QuestionCreateMainNav({ activeId }: Props) {
  const items = appCopy.questionCreate.workspaceNav

  return (
    <div className="qc-nav-track flex min-w-0 items-end gap-2 border-b border-[#E5E5E5] px-2 pb-0 pl-4 pt-2 sm:gap-3 sm:px-3 sm:pl-5 sm:pt-2.5">
      <Link
        to="/bkai"
        className="mb-px flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5E5E5] bg-white text-zinc-800 shadow-sm transition hover:bg-zinc-50/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:h-11 sm:w-11"
        aria-label="Geri"
      >
        <BackButtonIcon />
      </Link>
      <nav
        className="flex min-w-0 flex-1 items-end gap-0.5 overflow-x-auto pb-px pl-2 [-ms-overflow-style:none] scrollbar-none sm:gap-1 sm:pl-3 [&::-webkit-scrollbar]:hidden"
        aria-label="Özellikler"
      >
        {items.map((item) => {
          const isActive = item.id === activeId
          const isSoru = item.id === 'soru'

          if (isSoru) {
            return (
              <span
                key={item.id}
                className={
                  isActive
                    ? 'qc-folder-tab -mb-px inline-flex shrink-0 items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-900 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:px-4 sm:py-2.5 sm:text-sm'
                    : 'mb-1 inline-flex shrink-0 cursor-default items-center gap-2 rounded-t-lg px-3 py-2 text-xs font-medium text-zinc-500 sm:px-4 sm:py-2.5 sm:text-sm'
                }
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  icon={item.icon}
                  className={`text-lg shrink-0 sm:text-xl ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}
                  aria-hidden
                />
                {item.label}
              </span>
            )
          }

          return (
            <button
              key={item.id}
              type="button"
              disabled
              title={appCopy.comingSoon}
              className="mb-1 inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-t-lg px-2.5 py-2 text-left text-xs font-medium text-zinc-500 sm:px-3 sm:text-sm"
            >
              <Icon icon={item.icon} className="text-lg shrink-0 text-zinc-400 sm:text-xl" aria-hidden />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
