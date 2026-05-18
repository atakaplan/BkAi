import { appCopy } from '@/content/appCopy'
import type { QuestionDifficulty } from '../../question-create/data/metodboxQuestionsStep.mock'

const t = appCopy.questionCreate.questionStep3

const STYLES: Record<QuestionDifficulty, string> = {
  easy: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
  medium: 'bg-orange-50 text-orange-700 ring-orange-200/80',
  hard: 'bg-red-50 text-red-700 ring-red-200/80',
}

const LABELS: Record<QuestionDifficulty, string> = {
  easy: t.kolay,
  medium: t.orta,
  hard: t.zor,
}

type Props = {
  difficulty: QuestionDifficulty
  className?: string
}

export function DifficultyBadge({ difficulty, className = '' }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[difficulty]} ${className}`}
    >
      {LABELS[difficulty]}
    </span>
  )
}
