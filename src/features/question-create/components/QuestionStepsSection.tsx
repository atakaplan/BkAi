import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { appCopy } from "../../../content/appCopy";
import { QrModal } from "../../components/modals";
import { useQuestionCreateDraft } from "../persistence/useQuestionCreateDraft";
import { MetodboxQuestionsStepPanel } from "./MetodboxQuestionsStepPanel";
import {
  getDifficultyCountsFromChosenIds,
  isStep3ProceedEnabled,
} from "../data/metodboxQuestionsStep.mock";
import { MetodboxTestsPanel } from "./MetodboxTestsPanel";
import { QuestionStepAccordion } from "./QuestionStepAccordion";
import { SelectedTestsPanel } from "./SelectedTestsPanel";
import { SubjectSelectionPanel } from "./SubjectSelectionPanel";
import { METODOBOX_TEST_CARDS } from "../data/metodboxTests.mock";
import {
  getSubjectSelectionSummaryLabels,
  isSubjectSelectionComplete,
  type SubjectFieldKey,
} from "../data/subjectSelection.mock";

type Props = {
  onStepsOneTwoThreeCompleteChange?: (complete: boolean) => void;
  openStep: number | null;
  onOpenStepChange: (step: number | null) => void;
};

export function QuestionStepsSection({
  onStepsOneTwoThreeCompleteChange,
  openStep,
  onOpenStepChange,
}: Props) {
  const s = appCopy.questionCreate;
  const qc = s;

  const {
    draft,
    setSubjectField,
    setTestId,
    setCompleted,
    setStep3ActiveIndex,
    setStep3ChosenIds,
  } = useQuestionCreateDraft("metodbox");

  const { subject, testId, completed, step3ChosenIds, step3ActiveIndex } =
    draft;

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrQuery, setQrQuery] = useState("");

  useEffect(() => {
    const done = Boolean(completed[1] && completed[2] && completed[3]);
    onStepsOneTwoThreeCompleteChange?.(done);
  }, [completed, onStepsOneTwoThreeCompleteChange]);

  const isStepCompleted = (n: 1 | 2 | 3) => completed[n];

  const canAccess = (n: number) => {
    if (n === 1) return true;
    if (n === 2) return completed[1];
    if (n === 3) return completed[2];
    if (n === 4) return completed[3];
    return false;
  };

  const isLocked = (n: number) => {
    if (n === 1) return false;
    if (n === 2) return !canAccess(2) && !isStepCompleted(1);
    if (n === 3) return !canAccess(3) && !isStepCompleted(2);
    if (n === 4) return !canAccess(4) && !isStepCompleted(3);
    return false;
  };

  const toggleStep = (n: number) => {
    if (isLocked(n)) return;
    onOpenStepChange(openStep === n ? null : n);
  };

  const stepBadge = (n: number) => `${n}. Adım`;

  const proceed = (n: number) => {
    if (n === 1 && !isSubjectSelectionComplete(subject)) return;
    if (n === 2 && !testId) return;
    if (n === 3 && !isStep3ProceedEnabled(step3ChosenIds)) return;
    if (n === 1) setCompleted((c) => ({ ...c, 1: true }));
    else if (n === 2) setCompleted((c) => ({ ...c, 2: true }));
    else if (n === 3) setCompleted((c) => ({ ...c, 3: true }));
    if (n === 3) {
      onOpenStepChange(4);
    } else {
      onOpenStepChange(n + 1);
    }
  };

  const proceedBtn = (n: number, enabled: boolean) => (
    <div className="flex justify-end">
      <button
        type="button"
        disabled={!enabled}
        onClick={() => proceed(n)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#004a7c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003d68] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c]"
      >
        {qc.stepProceed}
      </button>
    </div>
  );

  const onSubjectChange = (key: SubjectFieldKey, value: string) => {
    setSubjectField(key, value);
  };

  const step1SummaryChips = useMemo(
    () => getSubjectSelectionSummaryLabels(subject),
    [subject],
  );

  const step2SummaryChips = useMemo(() => {
    if (!testId) return [];
    const c = METODOBOX_TEST_CARDS.find((x) => x.id === testId);
    return c ? [c.testLabel, c.topicTitle] : [];
  }, [testId]);

  const step3SummaryChips = useMemo(() => {
    if (step3ChosenIds.length === 0) return [];
    const d = getDifficultyCountsFromChosenIds(step3ChosenIds);
    return [
      `K:${d.easy} O:${d.medium} Z:${d.hard}`,
      `${step3ChosenIds.length} soru seçildi`,
    ];
  }, [step3ChosenIds]);

  return (
    <div className="flex flex-col gap-4">
      <QuestionStepAccordion
        stepNumber={1}
        stepBadge={stepBadge(1)}
        title={s.steps.topic.title}
        isOpen={openStep === 1}
        completed={completed[1]}
        locked={isLocked(1)}
        onToggle={() => toggleStep(1)}
        completedLabel={qc.stepCompleted}
        summaryChips={step1SummaryChips}
        headerAction={
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-transparent bg-[#004a7c] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#003d68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004a7c] sm:text-sm"
          >
            <Icon
              icon="mdi:qrcode-scan"
              className="text-base shrink-0"
              aria-hidden
            />
            {s.steps.topic.actionQr}
          </button>
        }
        footer={proceedBtn(1, isSubjectSelectionComplete(subject))}
      >
        <SubjectSelectionPanel value={subject} onChange={onSubjectChange} />
      </QuestionStepAccordion>

      <QuestionStepAccordion
        stepNumber={2}
        stepBadge={stepBadge(2)}
        title={s.steps.metodboxTests.title}
        isOpen={openStep === 2}
        completed={completed[2]}
        locked={isLocked(2)}
        onToggle={() => toggleStep(2)}
        completedLabel={qc.stepCompleted}
        summaryChips={step2SummaryChips}
        footer={proceedBtn(2, testId !== null)}
      >
        <MetodboxTestsPanel
          cards={METODOBOX_TEST_CARDS}
          selectedId={testId}
          onSelect={setTestId}
        />
      </QuestionStepAccordion>

      <QuestionStepAccordion
        stepNumber={3}
        stepBadge={stepBadge(3)}
        title={s.steps.metodboxQuestions.title}
        subtitle={s.steps.metodboxQuestions.subtitle}
        isOpen={openStep === 3}
        completed={completed[3]}
        locked={isLocked(3)}
        onToggle={() => toggleStep(3)}
        completedLabel={qc.stepCompleted}
        summaryChips={step3SummaryChips}
        footer={proceedBtn(3, isStep3ProceedEnabled(step3ChosenIds))}
      >
        <MetodboxQuestionsStepPanel
          activeIndex={step3ActiveIndex}
          onActiveIndexChange={setStep3ActiveIndex}
          chosenIds={step3ChosenIds}
          onToggleChosen={(id) =>
            setStep3ChosenIds((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
            )
          }
        />
      </QuestionStepAccordion>

      <QuestionStepAccordion
        stepNumber={4}
        stepBadge={stepBadge(4)}
        title={s.steps.selectedTests.title}
        isOpen={openStep === 4}
        completed={false}
        locked={isLocked(4)}
        onToggle={() => toggleStep(4)}
        completedLabel={qc.stepCompleted}
      >
        <SelectedTestsPanel
          test={
            testId
              ? (METODOBOX_TEST_CARDS.find((c) => c.id === testId) ?? null)
              : null
          }
          selectedQuestionCount={step3ChosenIds.length}
        />
      </QuestionStepAccordion>

      <QrModal
        open={qrModalOpen}
        onClose={() => {
          setQrModalOpen(false);
          setQrQuery("");
        }}
        title={s.steps.topic.actionQr}
        value={qrQuery}
        onChange={setQrQuery}
        onSearch={() => {
          setQrModalOpen(false);
          setQrQuery("");
        }}
      />
    </div>
  );
}
