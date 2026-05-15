import { useCallback, useEffect, useRef, useState } from "react";
import type { QuestionCreationModeId } from "../data/modes.mock";
import type { SubjectFieldKey } from "../data/subjectSelection.mock";
import {
  EMPTY_QUESTION_CREATE_DRAFT,
  loadQuestionCreateDraft,
  saveQuestionCreateDraft,
  type QuestionCreateCompletedSteps,
  type QuestionCreateDraft,
} from "./questionCreateDraft";

const SAVE_DEBOUNCE_MS = 300;

export function useQuestionCreateDraft(mode: QuestionCreationModeId) {
  const [draft, setDraft] = useState<QuestionCreateDraft>(() =>
    loadQuestionCreateDraft(mode),
  );
  const modeRef = useRef(mode);

  useEffect(() => {
    if (modeRef.current !== mode) {
      modeRef.current = mode;
      setDraft(loadQuestionCreateDraft(mode));
    }
  }, [mode]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      saveQuestionCreateDraft(mode, draft);
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [mode, draft]);

  const setSubjectField = useCallback((key: SubjectFieldKey, value: string) => {
    setDraft((prev) => ({
      ...prev,
      subject: { ...prev.subject, [key]: value },
    }));
  }, []);

  const setTestId = useCallback((testId: string | null) => {
    setDraft((prev) => ({ ...prev, testId }));
  }, []);

  const setCompleted = useCallback(
    (
      updater: (
        c: QuestionCreateCompletedSteps,
      ) => QuestionCreateCompletedSteps,
    ) => {
      setDraft((prev) => ({ ...prev, completed: updater(prev.completed) }));
    },
    [],
  );

  const setStep3ActiveIndex = useCallback((step3ActiveIndex: number) => {
    setDraft((prev) => ({ ...prev, step3ActiveIndex }));
  }, []);

  const setStep3ChosenIds = useCallback(
    (updater: string[] | ((prev: string[]) => string[])) => {
      setDraft((prev) => ({
        ...prev,
        step3ChosenIds:
          typeof updater === "function"
            ? updater(prev.step3ChosenIds)
            : updater,
      }));
    },
    [],
  );

  const resetDraft = useCallback(() => {
    const empty = {
      ...EMPTY_QUESTION_CREATE_DRAFT,
      subject: { ...EMPTY_QUESTION_CREATE_DRAFT.subject },
    };
    setDraft(empty);
    saveQuestionCreateDraft(mode, empty);
  }, [mode]);

  return {
    draft,
    setSubjectField,
    setTestId,
    setCompleted,
    setStep3ActiveIndex,
    setStep3ChosenIds,
    resetDraft,
  };
}
