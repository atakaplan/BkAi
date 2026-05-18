import { useCallback, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ConfirmModal } from '@/features/components/modals/ConfirmModal'
import { appCopy } from '@/content/appCopy'
import { QuestionPreviewDetailCard } from './components/QuestionPreviewDetailCard'
import { QuestionPreviewFooter } from './components/QuestionPreviewFooter'
import { QuestionPreviewSummaryRow } from './components/QuestionPreviewSummaryRow'
import type { PreviewQuestion } from './data/questionPreview.types'
import {
  clearQuestionPreviewSession,
  loadQuestionPreviewSession,
} from './persistence/questionPreviewSession'

const t = appCopy.questionPreview

type PendingDelete =
  | { kind: 'question'; questionId: string }
  | { kind: 'option'; questionId: string; optionKey: string }

function renumberQuestions(list: PreviewQuestion[]): PreviewQuestion[] {
  return list.map((q, i) => ({ ...q, order: i + 1 }))
}

export function QuestionPreviewPage() {
  const navigate = useNavigate()
  const session = useMemo(() => loadQuestionPreviewSession(), [])

  const [questions, setQuestions] = useState<PreviewQuestion[]>(
    () => session?.questions ?? [],
  )
  const [approvedIds, setApprovedIds] = useState<Set<string>>(() => new Set())
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(session?.questions.map((q) => q.id) ?? []),
  )
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleApprove = useCallback((id: string) => {
    setApprovedIds((prev) => new Set([...prev, id]))
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'approved' as const } : q)),
    )
  }, [])

  const handleConfirmDelete = useCallback(() => {
    if (!pendingDelete) return

    if (pendingDelete.kind === 'question') {
      const id = pendingDelete.questionId
      setQuestions((prev) => renumberQuestions(prev.filter((q) => q.id !== id)))
      setApprovedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      setExpandedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    } else {
      const { questionId, optionKey } = pendingDelete
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, options: q.options.filter((o) => o.key !== optionKey) }
            : q,
        ),
      )
    }
    setPendingDelete(null)
  }, [pendingDelete])

  const deleteModalCopy = useMemo(() => {
    if (!pendingDelete) return null
    const question = questions.find((q) =>
      pendingDelete.kind === 'question'
        ? q.id === pendingDelete.questionId
        : q.id === pendingDelete.questionId,
    )
    if (!question) return null

    if (pendingDelete.kind === 'question') {
      return {
        message: t.confirmDeleteQuestionMessage(question.order),
        confirmPrompt: t.confirmPrompt,
      }
    }
    return {
      message: t.confirmDeleteOptionMessage(question.order, pendingDelete.optionKey),
      confirmPrompt: t.confirmPrompt,
    }
  }, [pendingDelete, questions])

  const allApproved =
    questions.length > 0 && questions.every((q) => approvedIds.has(q.id))

  const handleComplete = () => {
    if (!allApproved) return
    clearQuestionPreviewSession()
    navigate('/bkai', { replace: true })
  }

  if (!session || session.questions.length === 0) {
    return <Navigate to="/bkai/soru-olustur" replace />
  }

  if (questions.length === 0) {
    return <Navigate to="/bkai/soru-olustur" replace />
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{t.pageTitle}</h1>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl border border-b-0 border-[#E5E5E5] bg-[#F4F7FB] shadow-sm">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-6 sm:py-5">
          <div className="mx-auto w-full max-w-5xl">
            <Link
              to="/bkai/soru-olustur"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-zinc-900"
            >
              <Icon icon="mdi:arrow-left" className="text-lg" aria-hidden />
              {t.backToCreate}
            </Link>

            <p className="mt-3 text-sm font-medium text-zinc-800 sm:text-base">
              {session.subjectPath}
            </p>

            <ul className="mt-5 flex flex-col gap-3 sm:gap-4">
              {questions.map((question) => {
                const isApproved = approvedIds.has(question.id)
                const isExpanded = expandedIds.has(question.id)
                const showSummary = isApproved && !isExpanded

                if (showSummary) {
                  return (
                    <li key={question.id}>
                      <QuestionPreviewSummaryRow
                        question={question}
                        expanded={false}
                        onToggle={() => toggleExpanded(question.id)}
                      />
                    </li>
                  )
                }

                return (
                  <li key={question.id}>
                    <QuestionPreviewDetailCard
                      question={question}
                      expanded={isExpanded}
                      isApproved={isApproved}
                      onToggle={() => toggleExpanded(question.id)}
                      onApprove={() => handleApprove(question.id)}
                      onDeleteQuestion={() =>
                        setPendingDelete({ kind: 'question', questionId: question.id })
                      }
                      onDeleteOption={(optionKey) =>
                        setPendingDelete({
                          kind: 'option',
                          questionId: question.id,
                          optionKey,
                        })
                      }
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <QuestionPreviewFooter disabled={!allApproved} onComplete={handleComplete} />
      </div>

      <ConfirmModal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        message={deleteModalCopy?.message ?? ''}
        confirmPrompt={deleteModalCopy?.confirmPrompt}
        cancelLabel={t.confirmCancel}
        confirmLabel={t.confirmDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
