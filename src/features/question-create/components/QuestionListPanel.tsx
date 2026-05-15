import { appCopy } from '../../../content/appCopy'

export function QuestionListPanel() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-[#F4F7FB]/50 p-8 text-center">
      <p className="text-sm text-slate-600">{appCopy.questionCreate.listPlaceholder}</p>
    </div>
  )
}
