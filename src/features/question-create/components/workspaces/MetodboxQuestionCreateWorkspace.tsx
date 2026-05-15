import { QuestionStepsSection } from "../QuestionStepsSection";
import type { QuestionCreateWorkspaceProps } from "./questionCreateWorkspaceProps";

export function MetodboxQuestionCreateWorkspace({
  onPrimaryActionReadyChange,
  openStep,
  onOpenStepChange,
}: QuestionCreateWorkspaceProps) {
  return (
    <QuestionStepsSection
      onStepsOneTwoThreeCompleteChange={onPrimaryActionReadyChange}
      openStep={openStep}
      onOpenStepChange={onOpenStepChange}
    />
  );
}
