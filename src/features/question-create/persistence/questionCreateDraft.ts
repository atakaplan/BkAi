import { METODOBOX_TEST_CARDS } from '../data/metodboxTests.mock'
import { MOCK_METODOBOX_QUESTIONS } from '../data/metodboxQuestionsStep.mock'
import type { QuestionCreationModeId } from '../data/modes.mock'
import {
  EMPTY_SUBJECT_SELECTION,
  SUBJECT_SELECTION_OPTIONS,
  type SubjectFieldKey,
} from '../data/subjectSelection.mock'

export const QUESTION_CREATE_DRAFT_VERSION = 1 as const

export type QuestionCreateCompletedSteps = {
  1: boolean
  2: boolean
  3: boolean
}

export type QuestionCreateDraft = {
  v: typeof QUESTION_CREATE_DRAFT_VERSION
  subject: Record<SubjectFieldKey, string>
  testId: string | null
  completed: QuestionCreateCompletedSteps
  step3ChosenIds: string[]
  step3ActiveIndex: number
}

export const EMPTY_QUESTION_CREATE_DRAFT: QuestionCreateDraft = {
  v: QUESTION_CREATE_DRAFT_VERSION,
  subject: { ...EMPTY_SUBJECT_SELECTION },
  testId: null,
  completed: { 1: false, 2: false, 3: false },
  step3ChosenIds: [],
  step3ActiveIndex: 0,
}

const STORAGE_PREFIX = 'bkai:question-create:v1'

function storageKey(mode: QuestionCreationModeId) {
  return `${STORAGE_PREFIX}:${mode}`
}

function isSubjectFieldKey(k: string): k is SubjectFieldKey {
  return k === 'level' || k === 'lesson' || k === 'unit' || k === 'topic'
}

function isValidSubjectValue(key: SubjectFieldKey, value: unknown): value is string {
  return typeof value === 'string' && SUBJECT_SELECTION_OPTIONS[key].some((o) => o.value === value)
}

export function validateQuestionCreateDraft(raw: unknown): QuestionCreateDraft {
  const base = { ...EMPTY_QUESTION_CREATE_DRAFT, subject: { ...EMPTY_SUBJECT_SELECTION } }
  if (!raw || typeof raw !== 'object') return base

  const o = raw as Record<string, unknown>
  if (o.v !== QUESTION_CREATE_DRAFT_VERSION) return base

  const subject = { ...EMPTY_SUBJECT_SELECTION }
  if (o.subject && typeof o.subject === 'object') {
    const s = o.subject as Record<string, unknown>
    for (const key of Object.keys(s)) {
      if (isSubjectFieldKey(key) && isValidSubjectValue(key, s[key])) {
        subject[key] = s[key]
      }
    }
  }

  let testId: string | null = null
  if (typeof o.testId === 'string' && METODOBOX_TEST_CARDS.some((t) => t.id === o.testId)) {
    testId = o.testId
  }

  const completed: QuestionCreateCompletedSteps = { 1: false, 2: false, 3: false }
  if (o.completed && typeof o.completed === 'object') {
    const c = o.completed as Record<string, unknown>
    if (c['1'] === true) completed[1] = true
    if (c['2'] === true) completed[2] = true
    if (c['3'] === true) completed[3] = true
  }

  const validQuestionIds = new Set(MOCK_METODOBOX_QUESTIONS.map((q) => q.id))
  let step3ChosenIds: string[] = []
  if (Array.isArray(o.step3ChosenIds)) {
    step3ChosenIds = o.step3ChosenIds.filter((id): id is string => typeof id === 'string' && validQuestionIds.has(id))
  }

  const maxIndex = Math.max(0, MOCK_METODOBOX_QUESTIONS.length - 1)
  let step3ActiveIndex = 0
  if (typeof o.step3ActiveIndex === 'number' && Number.isFinite(o.step3ActiveIndex)) {
    step3ActiveIndex = Math.min(maxIndex, Math.max(0, Math.floor(o.step3ActiveIndex)))
  }

  return {
    v: QUESTION_CREATE_DRAFT_VERSION,
    subject,
    testId,
    completed,
    step3ChosenIds,
    step3ActiveIndex,
  }
}

export function loadQuestionCreateDraft(mode: QuestionCreationModeId): QuestionCreateDraft {
  if (typeof sessionStorage === 'undefined') return { ...EMPTY_QUESTION_CREATE_DRAFT, subject: { ...EMPTY_SUBJECT_SELECTION } }
  try {
    const raw = sessionStorage.getItem(storageKey(mode))
    if (!raw) return { ...EMPTY_QUESTION_CREATE_DRAFT, subject: { ...EMPTY_SUBJECT_SELECTION } }
    return validateQuestionCreateDraft(JSON.parse(raw))
  } catch {
    return { ...EMPTY_QUESTION_CREATE_DRAFT, subject: { ...EMPTY_SUBJECT_SELECTION } }
  }
}

export function saveQuestionCreateDraft(mode: QuestionCreationModeId, draft: QuestionCreateDraft) {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(storageKey(mode), JSON.stringify({ ...draft, v: QUESTION_CREATE_DRAFT_VERSION }))
  } catch {
    /* quota / private mode */
  }
}

export function clearQuestionCreateDraft(mode: QuestionCreationModeId) {
  if (typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.removeItem(storageKey(mode))
  } catch {
    /* ignore */
  }
}
