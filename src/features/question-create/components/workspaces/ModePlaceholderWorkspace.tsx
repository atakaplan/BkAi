import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { QUESTION_CREATION_MODES, type QuestionCreationModeId } from '../../data/modes.mock'
import { appCopy } from '../../../../content/appCopy'
import type { QuestionCreateWorkspaceProps } from './questionCreateWorkspaceProps'

type ModeId = Exclude<QuestionCreationModeId, 'metodbox'>

type Props = Pick<QuestionCreateWorkspaceProps, 'onPrimaryActionReadyChange'> & {
  modeId: ModeId
}

export function ModePlaceholderWorkspace({ modeId, onPrimaryActionReadyChange }: Props) {
  const modeDef = QUESTION_CREATION_MODES.find((m) => m.id === modeId)
  const copy = appCopy.questionCreate.modes[modeId]
  const hint = appCopy.questionCreate.modeWorkspaces.placeholderNote

  useEffect(() => {
    onPrimaryActionReadyChange?.(false)
  }, [onPrimaryActionReadyChange])

  return (
    <div className="flex min-h-[min(360px,48vh)] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E5E5] bg-[#F4F7FB] px-4 py-12 text-center sm:px-8">
      {modeDef ? (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/80">
          <Icon icon={modeDef.icon} className="text-3xl" aria-hidden />
        </span>
      ) : null}
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">{copy.title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">{copy.description}</p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-900 ring-1 ring-amber-200/80">
        <Icon icon="mdi:progress-clock" className="text-base" aria-hidden />
        {appCopy.comingSoon}
      </p>
      <p className="mt-4 max-w-sm text-xs text-slate-500">{hint}</p>
    </div>
  )
}
