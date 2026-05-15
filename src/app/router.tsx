import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../features/layout/AppShell'
import { LazyLandingPage, LazyNotFoundPage, LazyQuestionCreatePage } from './lazyRoutePages'

/** Vite `base` ile uyumlu (`/BkAi` prod, dev’de yok). */
function routerBasename() {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export const appRouter = createBrowserRouter(
  [
    {
      path: '/bkai',
      element: <AppShell />,
      children: [
        { index: true, element: <LazyLandingPage /> },
        { path: 'soru-olustur', element: <LazyQuestionCreatePage /> },
        { path: '*', element: <LazyNotFoundPage /> },
      ],
    },
    { path: '/', element: <Navigate to="/bkai" replace /> },
    { path: '/soru-olustur', element: <Navigate to="/bkai/soru-olustur" replace /> },
    {
      path: '*',
      element: <AppShell />,
      children: [{ index: true, element: <LazyNotFoundPage /> }],
    },
  ],
  { basename: routerBasename() },
)
