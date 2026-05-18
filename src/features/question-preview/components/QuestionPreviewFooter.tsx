import { appCopy } from '@/content/appCopy'

type Props = {
  disabled?: boolean
  onComplete?: () => void
}

export function QuestionPreviewFooter({ disabled = false, onComplete }: Props) {
  return (
    <div className="flex justify-end border-t border-[#E5E5E5] bg-white px-4 py-3 sm:px-6 sm:py-4">
      <button
        type="button"
        disabled={disabled}
        onClick={onComplete}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#004a7c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003d68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-[#004a7c]"
      >
        {appCopy.questionPreview.complete}
        <span aria-hidden>→</span>
      </button>
    </div>
  )
}
