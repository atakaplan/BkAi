import { lazy } from "react";

export const LazyLandingPage = lazy(async () => {
  const m = await import("../features/landing/LandingPage");
  return { default: m.LandingPage };
});

export const LazyQuestionCreatePage = lazy(async () => {
  const m = await import("../features/question-create/QuestionCreatePage");
  return { default: m.QuestionCreatePage };
});

export const LazyQuestionPreviewPage = lazy(async () => {
  const m = await import('../features/question-preview/QuestionPreviewPage')
  return { default: m.QuestionPreviewPage }
})

export const LazyIntroVideoPage = lazy(async () => {
  const m = await import("../features/intro-video/IntroVideoPage");
  return { default: m.IntroVideoPage };
});

export const LazyNotFoundPage = lazy(async () => {
  const m = await import("../features/not-found/NotFoundPage");
  return { default: m.NotFoundPage };
});
