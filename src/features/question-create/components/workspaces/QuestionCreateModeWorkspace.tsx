import type { QuestionCreationModeId } from '../../data/modes.mock'
import type { QuestionCreateWorkspaceProps } from './questionCreateWorkspaceProps'
import { MetodboxQuestionCreateWorkspace } from './MetodboxQuestionCreateWorkspace'
import { ModePlaceholderWorkspace } from './ModePlaceholderWorkspace'

type Props = QuestionCreateWorkspaceProps & {
  mode: QuestionCreationModeId
}

/**
 * Sol sidebar’daki soru üretim moduna göre ana içerik.
 * Yeni mod: burada `case` + ayrı workspace bileşeni ekleyin.
 */
export function QuestionCreateModeWorkspace({ mode, onPrimaryActionReadyChange }: Props) {
  switch (mode) {
    case 'metodbox':
      return <MetodboxQuestionCreateWorkspace onPrimaryActionReadyChange={onPrimaryActionReadyChange} />
    case 'tymm':
      return <ModePlaceholderWorkspace modeId="tymm" onPrimaryActionReadyChange={onPrimaryActionReadyChange} />
    case 'ai':
      return <ModePlaceholderWorkspace modeId="ai" onPrimaryActionReadyChange={onPrimaryActionReadyChange} />
  }
}
