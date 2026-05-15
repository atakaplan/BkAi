import { appCopy } from '../../../content/appCopy'

type Props = {
  disabled?: boolean
  onContinue?: () => void
}

export function QuestionCreateFooterActions({ disabled = false, onContinue }: Props) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        disabled={disabled}
        onClick={onContinue}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-sky-600"
      >
        {appCopy.questionCreate.continue}
        <span aria-hidden>→</span>
      </button>
    </div>
  )
}
