import type { QuestionCreateSubTabId } from "../components/QuestionCreateSubTabs";
import {
  QUESTION_CREATION_MODES,
  type QuestionCreationModeId,
} from "../data/modes.mock";

const MODE_IDS = new Set(QUESTION_CREATION_MODES.map((m) => m.id));
const TAB_IDS = new Set<QuestionCreateSubTabId>(["create", "list"]);

export function parseMode(raw: string | null): QuestionCreationModeId | null {
  if (raw && MODE_IDS.has(raw as QuestionCreationModeId))
    return raw as QuestionCreationModeId;
  return null;
}

export function parseTab(raw: string | null): QuestionCreateSubTabId | null {
  if (raw && TAB_IDS.has(raw as QuestionCreateSubTabId))
    return raw as QuestionCreateSubTabId;
  return null;
}

/** URL: 0 = tüm adımlar kapalı, 1–4 = açık adım, yok = varsayılan 1 */
export function parseOpenStep(raw: string | null): number | null {
  if (raw === null || raw === "") return 1;
  if (raw === "0") return null;
  const n = Number(raw);
  if (Number.isInteger(n) && n >= 1 && n <= 4) return n;
  return 1;
}

export function openStepToParam(step: number | null): string {
  if (step === null) return "0";
  return String(step);
}

export type QuestionCreateUrlPatch = {
  mode?: QuestionCreationModeId;
  tab?: QuestionCreateSubTabId;
  step?: number | null;
};

export function applyQuestionCreateUrlPatch(
  current: URLSearchParams,
  patch: QuestionCreateUrlPatch,
): URLSearchParams {
  const next = new URLSearchParams(current);

  if (patch.mode !== undefined) next.set("mode", patch.mode);
  if (patch.tab !== undefined) next.set("tab", patch.tab);
  if (patch.step !== undefined) next.set("step", openStepToParam(patch.step));

  return next;
}
