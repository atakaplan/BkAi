import type { QuestionPreviewSession } from '../data/questionPreview.types'

export const QUESTION_PREVIEW_SESSION_VERSION = 1 as const
const STORAGE_KEY = 'bkai:question-preview:v1'

function isPreviewQuestion(raw: unknown): raw is QuestionPreviewSession['questions'][number] {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.order === 'number' &&
    typeof o.bodyText === 'string' &&
    Array.isArray(o.options)
  )
}

export function validateQuestionPreviewSession(raw: unknown): QuestionPreviewSession | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.v !== QUESTION_PREVIEW_SESSION_VERSION) return null
  if (typeof o.subjectPath !== 'string') return null
  if (typeof o.mode !== 'string') return null
  if (!Array.isArray(o.questions) || !o.questions.every(isPreviewQuestion)) return null
  return {
    v: QUESTION_PREVIEW_SESSION_VERSION,
    mode: o.mode as QuestionPreviewSession['mode'],
    subjectPath: o.subjectPath,
    questions: o.questions as QuestionPreviewSession['questions'],
  }
}

export function saveQuestionPreviewSession(session: QuestionPreviewSession) {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    /* quota */
  }
}

export function loadQuestionPreviewSession(): QuestionPreviewSession | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return validateQuestionPreviewSession(JSON.parse(raw))
  } catch {
    return null
  }
}

export function clearQuestionPreviewSession() {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
