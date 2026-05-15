import { QuestionStepsSection } from '../QuestionStepsSection'
import type { QuestionCreateWorkspaceProps } from './questionCreateWorkspaceProps'

export function MetodboxQuestionCreateWorkspace({ onPrimaryActionReadyChange }: QuestionCreateWorkspaceProps) {
  return <QuestionStepsSection onStepsOneTwoThreeCompleteChange={onPrimaryActionReadyChange} />
}
