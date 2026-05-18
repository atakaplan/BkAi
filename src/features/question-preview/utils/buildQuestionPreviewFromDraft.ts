import {
  MOCK_METODOBOX_QUESTIONS,
  type MockMetodboxQuestion,
} from '../../question-create/data/metodboxQuestionsStep.mock'
import type { QuestionCreationModeId } from '../../question-create/data/modes.mock'
import type { QuestionCreateDraft } from '../../question-create/persistence/questionCreateDraft'
import { getSubjectSelectionSummaryLabels } from '../../question-create/data/subjectSelection.mock'
import type { PreviewQuestion, PreviewQuestionOption, QuestionPreviewSession } from '../data/questionPreview.types'

const QUESTION_BODIES = [
  "96 sayısının 20'den büyük kaç tane doğal sayı böleni vardır?",
  'Aşağıdakilerden hangisi 84 sayısının asal çarpanlarından biri değildir?',
  '24 ve 36 sayılarının en büyük ortak böleni (EBOB) kaçtır?',
  '18 ve 30 sayılarının en küçük ortak katı (EKOK) kaçtır?',
  'Aşağıdaki sayılardan hangisi 12 ile tam bölünür?',
  '252 sayısının asal çarpanlarına ayrılmış hali aşağıdakilerden hangisidir?',
] as const

const CORRECT_EXPLANATION =
  'Doğru cevap seçeneği, kazanım kapsamında verilen işlem ve çarpan-kat kavramlarına uygun olarak belirlenmiştir.'
const WRONG_EXPLANATION =
  'Bu seçenek, soruda verilen sayısal ilişki veya çarpan-kat tanımı ile örtüşmediği için yanlıştır.'

function toPreviewOptions(q: MockMetodboxQuestion): PreviewQuestionOption[] {
  return q.options.map((opt) => ({
    key: opt.key,
    text: opt.text,
    isCorrect: opt.key === q.correctOption,
    explanation: opt.key === q.correctOption ? CORRECT_EXPLANATION : WRONG_EXPLANATION,
  }))
}

function toPreviewQuestion(q: MockMetodboxQuestion, order: number): PreviewQuestion {
  return {
    id: q.id,
    order,
    difficulty: q.difficulty,
    questionTypeLabel: 'Çoktan Seçmeli',
    status: 'approved',
    bodyText: QUESTION_BODIES[(order - 1) % QUESTION_BODIES.length],
    options: toPreviewOptions(q),
  }
}

export function buildQuestionPreviewFromDraft(
  draft: QuestionCreateDraft,
  mode: QuestionCreationModeId,
): QuestionPreviewSession | null {
  const questions = draft.step3ChosenIds
    .map((id) => MOCK_METODOBOX_QUESTIONS.find((q) => q.id === id))
    .filter((q): q is MockMetodboxQuestion => Boolean(q))
    .map((q, i) => toPreviewQuestion(q, i + 1))

  if (questions.length === 0) return null

  const subjectPath = getSubjectSelectionSummaryLabels(draft.subject).join(' / ')

  return {
    v: 1,
    mode,
    subjectPath: subjectPath || '—',
    questions,
  }
}
