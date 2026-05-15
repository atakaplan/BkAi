import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "../features/layout/AppShell";
import {
  LazyIntroVideoPage,
  LazyLandingPage,
  LazyNotFoundPage,
  LazyQuestionCreatePage,
} from "./lazyRoutePages";

/** Vite `base` ile uyumlu (`/BkAi` prod, dev’de yok). */
function routerBasename() {
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return undefined;
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export const appRouter = createBrowserRouter(
  [
    {
      element: <AppShell />,
      children: [
        {
          path: "bkai",
          children: [
            { index: true, element: <LazyLandingPage /> },
            { path: "tanitim-videosu", element: <LazyIntroVideoPage /> },
            { path: "soru-olustur", element: <LazyQuestionCreatePage /> },
            { path: "*", element: <LazyNotFoundPage /> },
          ],
        },
        { index: true, element: <Navigate to="/bkai" replace /> },
        {
          path: "soru-olustur",
          element: <Navigate to="/bkai/soru-olustur" replace />,
        },
        /** /bkai212 gibi /bkai altında olmayan tüm yollar */
        { path: "*", element: <LazyNotFoundPage /> },
      ],
    },
  ],
  { basename: routerBasename() },
);
