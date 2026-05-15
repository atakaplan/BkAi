import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { QuestionCreationModeId } from './data/modes.mock'
import { AppGlobalLoading } from '../components/AppGlobalLoading'
import { QuestionCreateMainNav } from './components/QuestionCreateMainNav'
import { QuestionCreateSubTabs, type QuestionCreateSubTabId } from './components/QuestionCreateSubTabs'
import { QuestionModeSidebar } from './components/QuestionModeSidebar'
import { QuestionCreateModeWorkspace } from './components/workspaces/QuestionCreateModeWorkspace'
import { QuestionCreateFooterActions } from './components/QuestionCreateFooterActions'
import { QuestionListPanel } from './components/QuestionListPanel'
import { appCopy } from '../../content/appCopy'

const POST_CREATE_NAV_DELAY_MS = 1800

export function QuestionCreatePage() {
  const navigate = useNavigate()
  const postCreateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [subTab, setSubTab] = useState<QuestionCreateSubTabId>('create')
  const [mode, setMode] = useState<QuestionCreationModeId>('metodbox')
  const [primaryActionReady, setPrimaryActionReady] = useState(false)
  const [postCreateLoading, setPostCreateLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (postCreateTimerRef.current) {
        clearTimeout(postCreateTimerRef.current)
        postCreateTimerRef.current = null
      }
    }
  }, [])

  const handleContinue = () => {
    if (postCreateLoading) return
    setPostCreateLoading(true)
    postCreateTimerRef.current = setTimeout(() => {
      postCreateTimerRef.current = null
      navigate('/bkai', { replace: true })
    }, POST_CREATE_NAV_DELAY_MS)
  }

  if (postCreateLoading) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <h1 className="sr-only">{appCopy.questionCreate.pageTitle}</h1>
        <div className="flex min-h-[50vh] min-w-0 flex-1 flex-col overflow-hidden border border-[#E5E5E5] bg-white shadow-sm rounded-t-3xl">
          <AppGlobalLoading title={appCopy.questionCreate.creatingRedirectTitle} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{appCopy.questionCreate.pageTitle}</h1>
      {/* Tek yuvarlak kabuk: overflow-hidden köşeleri korur; içeride ayrı scroll bölgeleri */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden border border-b-0 border-[#E5E5E5] bg-white shadow-sm rounded-t-3xl">
        <div className="shrink-0">
          <QuestionCreateMainNav activeId="soru" />
          <QuestionCreateSubTabs active={subTab} onChange={setSubTab} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F4F7FB] md:flex-row">
          <QuestionModeSidebar
            selected={mode}
            onSelect={setMode}
            onOpenCreatedList={() => setSubTab('list')}
          />
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
            {subTab === 'create' ? (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 scrollbar-gutter-stable sm:px-5 sm:py-5 md:px-6 md:py-6">
                  <QuestionCreateModeWorkspace
                    key={mode}
                    mode={mode}
                    onPrimaryActionReadyChange={setPrimaryActionReady}
                  />
                </div>
                <div className="shrink-0 bg-white px-4 py-3 sm:px-5 md:px-6">
                  <QuestionCreateFooterActions
                    disabled={!primaryActionReady}
                    onContinue={handleContinue}
                  />
                </div>
              </>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-5 md:px-6 md:py-6">
                <QuestionListPanel />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
