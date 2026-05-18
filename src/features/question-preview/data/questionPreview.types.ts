import type { QuestionDifficulty } from '../../question-create/data/metodboxQuestionsStep.mock'
import type { QuestionCreationModeId } from '../../question-create/data/modes.mock'

export type PreviewQuestionStatus = 'approved' | 'draft' | 'pending'

export type PreviewQuestionOption = {
  key: 'A' | 'B' | 'C' | 'D'
  text: string
  isCorrect: boolean
  explanation: string
}

export type PreviewQuestion = {
  id: string
  order: number
  difficulty: QuestionDifficulty
  questionTypeLabel: string
  status: PreviewQuestionStatus
  bodyText: string
  options: PreviewQuestionOption[]
}

export type QuestionPreviewSession = {
  v: 1
  mode: QuestionCreationModeId
  subjectPath: string
  questions: PreviewQuestion[]
}
