import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../features/layout/AppShell'
import { LazyLandingPage, LazyQuestionCreatePage } from './lazyRoutePages'

export const appRouter = createBrowserRouter([
  {
    path: '/bkai',
    element: <AppShell />,
    children: [
      { index: true, element: <LazyLandingPage /> },
      { path: 'soru-olustur', element: <LazyQuestionCreatePage /> },
    ],
  },
  { path: '/', element: <Navigate to="/bkai" replace /> },
  { path: '/soru-olustur', element: <Navigate to="/bkai/soru-olustur" replace /> },
])
