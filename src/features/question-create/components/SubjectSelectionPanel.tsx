import { appCopy } from '../../../content/appCopy'
import {
  SUBJECT_SELECTION_OPTIONS,
  type SubjectFieldKey,
} from '../data/subjectSelection.mock'

type Props = {
  value: Record<SubjectFieldKey, string>
  onChange: (key: SubjectFieldKey, value: string) => void
}

export function SubjectSelectionPanel({ value, onChange }: Props) {
  const f = appCopy.questionCreate.fields
  const ph = appCopy.questionCreate.selectPlaceholder
  const fields: { key: SubjectFieldKey; label: string }[] = [
    { key: 'level', label: f.level },
    { key: 'lesson', label: f.lesson },
    { key: 'unit', label: f.unit },
    { key: 'topic', label: f.topic },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {fields.map(({ key, label }) => (
        <label key={key} className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-700">{label}</span>
          <div className="relative">
            <select
              value={value[key]}
              onChange={(e) => onChange(key, e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 pr-10 text-slate-800 outline-none transition hover:border-[#d0d0d0] focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            >
              <option value="" disabled>
                {ph}
              </option>
              {SUBJECT_SELECTION_OPTIONS[key].map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </label>
      ))}
    </div>
  )
}
