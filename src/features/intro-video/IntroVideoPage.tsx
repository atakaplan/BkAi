import { useEffect, useRef, useState } from 'react'
import { AppGlobalLoading } from '../components/AppGlobalLoading'
import { appCopy } from '@/content/appCopy'
import { IntroVideoPageHeader } from './components/IntroVideoPageHeader'
import { IntroVideoPlayer } from './components/IntroVideoPlayer'

const PAGE_OPEN_LOADING_MS = 1800

export function IntroVideoPage() {
  const [pageLoading, setPageLoading] = useState(true)
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    loadTimerRef.current = setTimeout(() => {
      loadTimerRef.current = null
      setPageLoading(false)
    }, PAGE_OPEN_LOADING_MS)

    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current)
        loadTimerRef.current = null
      }
    }
  }, [])

  if (pageLoading) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <h1 className="sr-only">{appCopy.introVideo}</h1>
        <AppGlobalLoading />
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 px-4 py-3 sm:px-6 sm:py-4 md:py-5">
      <IntroVideoPageHeader />
      <IntroVideoPlayer />
    </div>
  )
}
