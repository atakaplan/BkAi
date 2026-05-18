import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { QuestionCreationModeId } from "./data/modes.mock";
import { AppGlobalLoading } from "../components/AppGlobalLoading";
import { QuestionCreateMainNav } from "./components/QuestionCreateMainNav";
import {
  QuestionCreateSubTabs,
  type QuestionCreateSubTabId,
} from "./components/QuestionCreateSubTabs";
import { QuestionModeSidebar } from "./components/QuestionModeSidebar";
import { QuestionCreateModeWorkspace } from "./components/workspaces/QuestionCreateModeWorkspace";
import { QuestionCreateFooterActions } from "./components/QuestionCreateFooterActions";
import { QuestionListPanel } from "./components/QuestionListPanel";
import { buildQuestionPreviewFromDraft } from "../question-preview/utils/buildQuestionPreviewFromDraft";
import { saveQuestionPreviewSession } from "../question-preview/persistence/questionPreviewSession";
import {
  clearQuestionCreateDraft,
  loadQuestionCreateDraft,
} from "./persistence/questionCreateDraft";
import {
  applyQuestionCreateUrlPatch,
  parseMode,
  parseOpenStep,
  parseTab,
} from "./persistence/questionCreateUrlState";
import { appCopy } from "../../content/appCopy";

const POST_CREATE_NAV_DELAY_MS = 1800;

export function QuestionCreatePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const postCreateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [primaryActionReady, setPrimaryActionReady] = useState(false);
  const [postCreateLoading, setPostCreateLoading] = useState(false);

  const mode = useMemo(
    () => parseMode(searchParams.get("mode")) ?? "metodbox",
    [searchParams],
  );
  const subTab = useMemo(
    () => parseTab(searchParams.get("tab")) ?? "create",
    [searchParams],
  );
  const openStep = useMemo(
    () => parseOpenStep(searchParams.get("step")),
    [searchParams],
  );

  const patchUrl = useCallback(
    (patch: Parameters<typeof applyQuestionCreateUrlPatch>[1]) => {
      setSearchParams((prev) => applyQuestionCreateUrlPatch(prev, patch), {
        replace: true,
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    const needsMode = !parseMode(searchParams.get("mode"));
    const needsTab = !parseTab(searchParams.get("tab"));
    const needsStep = subTab === "create" && !searchParams.has("step");
    if (!needsMode && !needsTab && !needsStep) return;
    patchUrl({
      ...(needsMode ? { mode: "metodbox" } : {}),
      ...(needsTab ? { tab: "create" } : {}),
      ...(needsStep ? { step: 1 } : {}),
    });
  }, [searchParams, subTab, patchUrl]);

  useEffect(() => {
    return () => {
      if (postCreateTimerRef.current) {
        clearTimeout(postCreateTimerRef.current);
        postCreateTimerRef.current = null;
      }
    };
  }, []);

  const handleModeSelect = (id: QuestionCreationModeId) => {
    patchUrl({ mode: id });
  };

  const handleSubTabChange = (tab: QuestionCreateSubTabId) => {
    patchUrl({
      tab,
      ...(tab === "create" ? { step: openStep ?? 1 } : {}),
    });
  };

  const handleOpenStepChange = (step: number | null) => {
    patchUrl({ step });
  };

  const handleContinue = () => {
    if (postCreateLoading) return;
    const draft = loadQuestionCreateDraft(mode);
    const preview = buildQuestionPreviewFromDraft(draft, mode);
    if (!preview) return;

    saveQuestionPreviewSession(preview);
    setPostCreateLoading(true);
    postCreateTimerRef.current = setTimeout(() => {
      postCreateTimerRef.current = null;
      clearQuestionCreateDraft(mode);
      navigate("/bkai/soru-onizle", { replace: true });
    }, POST_CREATE_NAV_DELAY_MS);
  };

  if (postCreateLoading) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <h1 className="sr-only">{appCopy.questionCreate.pageTitle}</h1>
        <div className="flex min-h-[50vh] min-w-0 flex-1 flex-col overflow-hidden border border-[#E5E5E5] bg-white shadow-sm rounded-t-3xl">
          <AppGlobalLoading
            title={appCopy.questionCreate.creatingRedirectTitle}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="sr-only">{appCopy.questionCreate.pageTitle}</h1>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden border border-b-0 border-[#E5E5E5] bg-white shadow-sm rounded-t-3xl">
        <div className="shrink-0">
          <QuestionCreateMainNav activeId="soru" />
          <QuestionCreateSubTabs
            active={subTab}
            onChange={handleSubTabChange}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F4F7FB] md:flex-row">
          <QuestionModeSidebar
            selected={mode}
            onSelect={handleModeSelect}
            onOpenCreatedList={() => handleSubTabChange("list")}
          />
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
            {subTab === "create" ? (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-4 scrollbar-gutter-stable sm:px-5 sm:py-5 md:px-6 md:py-6">
                  <QuestionCreateModeWorkspace
                    key={mode}
                    mode={mode}
                    openStep={openStep}
                    onOpenStepChange={handleOpenStepChange}
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
  );
}
